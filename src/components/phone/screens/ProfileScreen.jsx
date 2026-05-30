import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { Accessibility, LogOut, User as UserIcon, Mail, Shield } from 'lucide-react';

export default function ProfileScreen() {
  const {
    currentUser,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    screenReader,
    setScreenReader,
    handleLogout,
    triggerToast,
  } = useEcoPulse();

  return (
    <div className="space-y-4 pt-2">
      {/* Tarjeta de usuario */}
      <div className="glass-card p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-lg shrink-0">
          {currentUser.name
            .split(' ')
            .map(n => n[0])
            .join('')}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-bold text-white block truncate">{currentUser.name}</span>
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-0.5">
            <Mail className="w-3 h-3" />
            <span className="truncate">{currentUser.email}</span>
          </div>
          <span className="inline-block text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold mt-1.5">
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Accesibilidad */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Accessibility className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Preferencias de Accesibilidad
          </span>
        </div>

        {/* Tamaño de letra */}
        <div className="glass-card p-3 space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-300 font-bold">Tamaño de Letra</span>
            <span className="text-emerald-400 font-bold">{textSize}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">A-</span>
            <input
              type="range"
              min="80"
              max="140"
              value={textSize}
              onChange={e => setTextSize(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-slate-300 font-bold">A+</span>
          </div>
        </div>

        {/* Alto contraste */}
        <div className="glass-card p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-300 block">Alto Contraste</span>
            <span className="text-[8px] text-slate-600">Optimizado para baja visión</span>
          </div>
          <button
            onClick={() => {
              setHighContrast(!highContrast);
              triggerToast(`Alto contraste ${!highContrast ? 'activado' : 'desactivado'}`);
            }}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              highContrast ? 'bg-emerald-400' : 'bg-slate-800 border border-slate-700'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                highContrast ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Lector de pantalla */}
        <div className="glass-card p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-300 block">Asistente Vocal</span>
            <span className="text-[8px] text-slate-600">Descripciones por voz</span>
          </div>
          <button
            onClick={() => {
              setScreenReader(!screenReader);
              triggerToast(`Lector de pantalla ${!screenReader ? 'activado' : 'desactivado'}`);
            }}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              screenReader ? 'bg-emerald-400' : 'bg-slate-800 border border-slate-700'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                screenReader ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="w-full glass-card py-3 flex items-center justify-center gap-2 text-rose-400 text-xs font-bold hover:bg-rose-500/10 transition"
      >
        <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
      </button>
    </div>
  );
}