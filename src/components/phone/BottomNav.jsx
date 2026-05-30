import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { LayoutDashboard, Sliders, Shield, User } from 'lucide-react';

export default function BottomNav() {
  const { phoneScreen, setPhoneScreen, speak } = useEcoPulse();

  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Inicio' },
    { id: 'crud', icon: Sliders, label: 'Catálogo' },
    { id: 'control', icon: Shield, label: 'Control' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-slate-950/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-10">
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => {
            setPhoneScreen(id);
            speak(`Pantalla ${label}`);
          }}
          className={`relative flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
            phoneScreen === id ? 'text-emerald-400 scale-110' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[8px] font-bold">{label}</span>
          {phoneScreen === id && (
            <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-400 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}