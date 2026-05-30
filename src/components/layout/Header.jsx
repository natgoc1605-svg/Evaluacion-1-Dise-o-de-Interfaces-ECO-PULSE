// Barra superior con selector de dispositivo
import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { Leaf, Tv, Smartphone, Watch } from 'lucide-react';

export default function Header() {
  const { currentDevice, setCurrentDevice, speak } = useEcoPulse();

  const tabs = [
    { id: 'tv', label: 'Smart TV', icon: Tv },
    { id: 'phone', label: 'Smartphone', icon: Smartphone },
    { id: 'watch', label: 'Smartwatch', icon: Watch },
  ];

  return (
    <header className="border-b border-white/5 bg-[#020617]/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 rounded-xl blur-md" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <Leaf className="text-slate-950 w-5 h-5" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold tracking-tight">
              <span className="text-gradient">EcoPulse</span>
              <span className="text-slate-400 font-normal text-sm ml-1">Workspace</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Ecosistema Multi-dispositivo</p>
          </div>
        </div>

        {/* Selector de dispositivo */}
        <div className="flex bg-slate-900/80 p-1 rounded-2xl border border-white/5 backdrop-blur-sm gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setCurrentDevice(id); speak(`Vista ${label}`); }}
              className={`relative flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-300 ${
                currentDevice === id
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              {currentDevice === id && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Indicador de estado */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Sincronizado
        </div>
      </div>
    </header>
  );
}