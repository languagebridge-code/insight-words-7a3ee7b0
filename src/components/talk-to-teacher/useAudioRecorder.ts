import { useState, useRef, useCallback } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<{ base64: string; mimeType: string }>;
  error: string | null;
}

/**
 * Encode raw PCM float samples → 16-bit mono WAV at the given sample rate.
 */
function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const numSamples = samples.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); // bits
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return buffer;
}

function downsample(buffer: Float32Array, sourceSR: number, targetSR: number): Float32Array {
  if (sourceSR === targetSR) return buffer;
  const ratio = sourceSR / targetSR;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);

  for (let i = 0; i < newLength; i++) {
    const idx = i * ratio;
    const low = Math.floor(idx);
    const high = Math.min(low + 1, buffer.length - 1);
    const frac = idx - low;
    result[i] = buffer[low] * (1 - frac) + buffer[high] * frac;
  }

  return result;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const resolveRef = useRef<((result: { base64: string; mimeType: string }) => void) | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000,
        },
      });

      // Prefer ogg/opus first (very stable for Azure), then webm/opus.
      const mimeType = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
        ? 'audio/ogg;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });

        try {
          if (blob.size < 512) throw new Error('Recorded audio is too small');

          const arrayBuffer = await blob.arrayBuffer();
          const AudioContextClass =
            window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

          if (!AudioContextClass) throw new Error('AudioContext unavailable for WAV conversion');

          const decodeCtx = new AudioContextClass();
          const decoded = await decodeCtx.decodeAudioData(arrayBuffer.slice(0));
          await decodeCtx.close();

          const mono = decoded.numberOfChannels > 1
            ? (() => {
                const left = decoded.getChannelData(0);
                const right = decoded.getChannelData(1);
                const mixed = new Float32Array(decoded.length);
                for (let i = 0; i < decoded.length; i++) mixed[i] = (left[i] + right[i]) * 0.5;
                return mixed;
              })()
            : decoded.getChannelData(0);

          const resampled = downsample(mono, decoded.sampleRate, 16000);
          const wavBuffer = encodeWav(resampled, 16000);
          const base64 = arrayBufferToBase64(wavBuffer);

          resolveRef.current?.({ base64, mimeType: 'audio/wav' });
          resolveRef.current = null;
        } catch (convErr) {
          console.warn('[AudioRecorder] WAV conversion failed, using raw audio fallback', convErr);
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1] || result;
            resolveRef.current?.({ base64, mimeType });
            resolveRef.current = null;
          };
          reader.readAsDataURL(blob);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);
      setIsRecording(true);
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setError('🎤 Microphone access required. Please enable in browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('⚠️ Could not access microphone. Try a different device.');
      } else {
        setError(`⚠️ Microphone error: ${err.message}`);
      }
      throw err;
    }
  }, []);

  const stopRecording = useCallback((): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.requestData();
        }
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    });
  }, []);

  return { isRecording, startRecording, stopRecording, error };
}

