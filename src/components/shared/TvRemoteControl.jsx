// Control remoto auxiliar 
import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { ArrowLeft, ArrowRight, Tv } from 'lucide-react';

export default function TvRemoteControl() {
  const { tvFocusIndex, setTvFocusIndex, tvFocusKeys, speak } = useEcoPulse();

  const navegar = (direccion) => {
    const nuevo = direccion === 'prev'
      ? (tvFocusIndex - 1 + tvFocusKeys.length) % tvFocusKeys.length
      : (tvFocusIndex + 1) % tvFocusKeys.length;
    setTvFocusIndex(nuevo);
    speak(`Tarjeta enfocada: ${tvFocusKeys[nuevo]}`);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <div className="glass-card px-4 py-2 flex items-center gap-3">
        <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Control TV</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => navegar('prev')}
            className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => navegar('next')}
            className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}