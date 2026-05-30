import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { 
  Tv, Watch, Eye, Power, Shield, Leaf, Zap, Droplets, Camera, BarChart3 
} from 'lucide-react';

export default function ControlPanelScreen() {
  const {
    tvFocusIndex,
    setTvFocusIndex,
    tvFocusKeys,
    watchEcoMode,
    setWatchEcoMode,
    setCurrentDevice,
    totalWatts,
    devices,
    triggerToast,
    apagarTodo,
  } = useEcoPulse();

  const tvCards = [
    { idx: 0, label: 'CO₂ Evitado', icon: Leaf, key: 'co2' },
    { idx: 1, label: 'Energía Activa', icon: Zap, key: 'energy' },
    { idx: 2, label: 'Agua', icon: Droplets, key: 'water' },
    { idx: 3, label: 'Cámara Seg.', icon: Camera, key: 'camera' },
    { idx: 4, label: 'Histórico', icon: BarChart3, key: 'chart' },
  ];

  const enfocarTV = (idx) => {
    setTvFocusIndex(idx);
    triggerToast(`Smart TV enfocada en: ${tvCards[idx].label}`);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Encabezado */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Centro de Control</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-2">Administra todo el ecosistema desde aquí</p>
      </div>

      {/* Resumen rápido */}
      <div className="glass-card p-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="text-2xl font-extrabold text-white">{totalWatts}</span>
            <span className="text-[9px] text-slate-500 block">Watts Totales</span>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-emerald-400">
              {devices.filter(d => d.status).length}
            </span>
            <span className="text-[9px] text-slate-500 block">Dispositivos ON</span>
          </div>
          <div>
            <span className="text-2xl font-extrabold text-cyan-400">{devices.length}</span>
            <span className="text-[9px] text-slate-500 block">En Catálogo</span>
          </div>
        </div>
      </div>

      {/* Control Smart TV */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <Tv className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Smart TV · Sala Principal</span>
            <span className="text-[9px] text-slate-500">Control remoto de enfoque</span>
          </div>
          <button
            onClick={() => {
              setCurrentDevice('tv');
              triggerToast('Vista cambiada a Smart TV');
            }}
            className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-bold hover:underline"
          >
            <Eye className="w-3.5 h-3.5" /> Ver TV
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tvCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.idx}
                onClick={() => enfocarTV(card.idx)}
                className={`py-2 px-1 rounded-xl text-[10px] font-semibold transition-all duration-200 flex flex-col items-center gap-1 ${
                  tvFocusIndex === card.idx
                    ? 'bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-emerald-400 border border-emerald-500/40 shadow-md'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                {card.label}
              </button>
            );
          })}
        </div>

        <div className="text-[9px] text-slate-500 text-center">
          Tarjeta activa:{' '}
          <span className="text-emerald-400 font-bold">
            {tvCards.find(c => c.idx === tvFocusIndex)?.label || 'Energía'}
          </span>
        </div>
      </div>

      {/* Control Smartwatch */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
            <Watch className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Smartwatch · Muñeca</span>
            <span className="text-[9px] text-slate-500">Modo ecológico y control rápido</span>
          </div>
          <button
            onClick={() => {
              setCurrentDevice('watch');
              triggerToast('Vista cambiada a Smartwatch');
            }}
            className="ml-auto flex items-center gap-1 text-[10px] text-cyan-400 font-bold hover:underline"
          >
            <Eye className="w-3.5 h-3.5" /> Ver Reloj
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">Modo Eco Inteligente</span>
            <span className="text-[9px] text-slate-500">Ahorro del 30% en consumo</span>
          </div>
          {/* Toggle mejorado */}
          <button
            onClick={() => {
              setWatchEcoMode(!watchEcoMode);
              triggerToast(`Modo Eco ${!watchEcoMode ? 'activado' : 'desactivado'} remotamente`);
            }}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 overflow-hidden ${
              watchEcoMode
                ? 'bg-gradient-to-r from-emerald-400 to-cyan-500'
                : 'bg-slate-800 border border-slate-700'
            }`}
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                watchEcoMode ? 'left-[calc(100%-1.625rem)]' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="glass-card p-4 space-y-3">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Acciones Rápidas
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              apagarTodo();
            }}
            className="flex items-center justify-center gap-2 py-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition"
          >
            <Power className="w-3.5 h-3.5" /> Apagar Todo
          </button>
          <button
            onClick={() => {
              setCurrentDevice('tv');
              triggerToast('Navegando a vista Smart TV');
            }}
            className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition"
          >
            <Tv className="w-3.5 h-3.5" /> Ver TV
          </button>
        </div>
      </div>

      {/* Indicador de sincronización */}
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] text-slate-500">Ecosistema sincronizado en tiempo real</span>
      </div>
    </div>
  );
}