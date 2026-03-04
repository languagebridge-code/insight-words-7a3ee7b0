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
  view.setUint32(16, 16, true);           // chunk size
  view.setUint16(20, 1, true);            // PCM
  view.setUint16(22, 1, true);            // mono
  view.setUint32(24, sampleRate, true);   // sample rate
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true);            // block align
  view.setUint16(34, 16, true);           // bits per sample
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return buffer;
}

/**
 * Downsample from sourceSR → targetSR using simple linear interpolation.
 */
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

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
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
        },
      });

      streamRef.current = stream;

      // Use whatever mimeType the browser supports for capture
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType });

        try {
          // Decode browser audio → resample to 16 kHz mono → WAV
          const arrayBuffer = await blob.arrayBuffer();
          const audioCtx = new OfflineAudioContext(1, 1, 16000);
          const decoded = await audioCtx.decodeAudioData(arrayBuffer);
          const channelData = decoded.getChannelData(0);
          const resampled = downsample(channelData, decoded.sampleRate, 16000);
          const wavBuffer = encodeWav(resampled, 16000);

          // Convert WAV ArrayBuffer → base64
          const bytes = new Uint8Array(wavBuffer);
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64 = btoa(binary);

          resolveRef.current?.({ base64, mimeType: 'audio/wav' });
          resolveRef.current = null;
        } catch (convErr) {
          console.warn('[AudioRecorder] WAV conversion failed, sending raw audio', convErr);
          // Fallback: send raw audio
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
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    });
  }, []);

  return { isRecording, startRecording, stopRecording, error };
}
