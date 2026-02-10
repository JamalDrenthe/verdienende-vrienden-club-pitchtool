import React, { useState, useRef, useCallback, useEffect } from 'react';

type Step = 'instruction' | 'recording' | 'analyzing' | 'success';

interface VoiceMemoProps {
  onVerified: (verified: boolean) => void;
}

export const VoiceMemo: React.FC<VoiceMemoProps> = ({ onVerified }) => {
  const [step, setStep] = useState<Step>('instruction');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopAudio = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const r = 236;
        const g = Math.min(255, 72 + barHeight * 0.5);
        const b = Math.min(255, 153 + barHeight * 0.5);

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        const y = (canvas.height - barHeight) / 2;
        ctx.fillRect(x, y, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
  }, []);

  const startRecording = async () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setStep('recording');

      // Resize canvas
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }

      requestAnimationFrame(() => drawWaveform());
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('We konden geen toegang krijgen tot je microfoon. Controleer je browserinstellingen.');
    }
  };

  const stopRecording = () => {
    stopAudio();
    setStep('analyzing');

    setTimeout(() => {
      setStep('success');
      onVerified(true);
    }, 2500);
  };

  return (
    <div className={`relative bg-slate-100 dark:bg-black rounded-xl border transition-all duration-300 p-4 overflow-hidden ${
      step === 'success' 
        ? 'border-green-500/50' 
        : 'border-slate-200 dark:border-white/10'
    }`}>

      {/* Ready */}
      {step === 'instruction' && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Shoot your shot. &ldquo;YES&rdquo;</p>
            <p className="text-xs text-slate-400 dark:text-gray-500">Stem-verificatie vereist</p>
          </div>
          <button
            type="button"
            onClick={startRecording}
            aria-label="Start opname"
            className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      )}

      {/* Recording */}
      {step === 'recording' && (
        <div className="flex items-center gap-4">
          <div className="text-pink-500 text-xs font-mono animate-pulse whitespace-nowrap">● REC</div>
          <div className="flex-grow h-12 bg-slate-200/50 dark:bg-white/5 rounded-lg overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex-shrink-0 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-bold transition"
          >
            Stop
          </button>
        </div>
      )}

      {/* Analyzing */}
      {step === 'analyzing' && (
        <div className="flex items-center gap-3 py-1">
          <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <div className="flex-grow">
            <div className="w-full bg-slate-300 dark:bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full progress-bar-fill" />
            </div>
          </div>
          <span className="text-xs text-pink-500 font-mono whitespace-nowrap">Verifiëren...</span>
        </div>
      )}

      {/* Done */}
      {step === 'success' && (
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-bold text-green-500 dark:text-green-400">Geverifieerd — Welkom.</span>
        </div>
      )}

    </div>
  );
};
