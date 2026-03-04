import { useState, useRef, useCallback } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string>; // returns base64 WAV
  error: string | null;
}

/**
 * Convert a Blob (webm/opus etc.) to 16-bit PCM WAV base64 using Web Audio API.
 * Azure Speech REST API requires WAV/PCM — webm/opus is not reliably supported.
 */
async function blobToWavBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  await audioCtx.close();

  // Down-mix to mono, 16 kHz, 16-bit PCM
  const targetSampleRate = 16000;
  const offlineCtx = new OfflineAudioContext(1, Math.ceil(audioBuffer.duration * targetSampleRate), targetSampleRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);
  const rendered = await offlineCtx.startRendering();

  const pcmData = rendered.getChannelData(0);
  const wavBuffer = encodeWav(pcmData, targetSampleRate);

  // Convert to base64
  const bytes = new Uint8Array(wavBuffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function encodeWav(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true);  // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // PCM samples (clamp to int16 range)
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  return buffer;
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const resolveRef = useRef<((base64: string) => void) | null>(null);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Prefer webm/opus, fallback to whatever is available
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
        // Stop all tracks to release the mic
        stream.getTracks().forEach(t => t.stop());

        const blob = new Blob(chunksRef.current, { type: mimeType });

        try {
          // Convert to WAV (PCM 16-bit, 16kHz mono) for Azure STT
          const base64Wav = await blobToWavBase64(blob);
          resolveRef.current?.(base64Wav);
        } catch (convErr) {
          console.error('[useAudioRecorder] WAV conversion failed, sending raw:', convErr);
          // Fallback: send raw base64 (may not work with Azure)
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1] || result;
            resolveRef.current?.(base64);
            resolveRef.current = null;
          };
          reader.readAsDataURL(blob);
          return;
        }
        resolveRef.current = null;
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250); // collect chunks every 250ms
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

  const stopRecording = useCallback((): Promise<string> => {
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
