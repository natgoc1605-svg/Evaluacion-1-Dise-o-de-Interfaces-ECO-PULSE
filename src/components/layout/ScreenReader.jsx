// Barra de asistente vocal
import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { Volume2 } from 'lucide-react';

export default function ScreenReader() {
  const { screenReader, readerSpeech } = useEcoPulse();

  if (!screenReader) return null;

  return (
    <div className="bg-slate-950/90 border-t border-emerald-500/20 backdrop-blur-md px-4 py-3 flex items-center gap-3">
      <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse shrink-0" />
      <div>
        <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest block">Asistente Vocal</span>
        <p className="text-xs text-slate-300 italic font-mono mt-0.5">"{readerSpeech}"</p>
      </div>
    </div>
  );
}