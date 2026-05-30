import React, { useState } from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { Zap, Leaf, Power, WashingMachine, Thermometer, Tv, Lightbulb, Home, List } from 'lucide-react';

const iconMap = {
  lavadora: WashingMachine,
  refrigerador: Thermometer,
  television: Tv,
  luces: Lightbulb,
  default: Zap,
};

function DeviceIcon({ name }) {
  const key = name.toLowerCase();
  const Icon = Object.keys(iconMap).find(k => key.includes(k)) ? iconMap[Object.keys(iconMap).find(k => key.includes(k))] : iconMap.default;
  return <Icon className="w-4 h-4" />;
}

export default function SmartwatchView() {
  const { totalWatts, watchEcoMode, setWatchEcoMode, devices, toggleDevice, apagarTodo, triggerToast } = useEcoPulse();
  const [watchPage, setWatchPage] = useState('main'); // 'main', 'devices'

  const encendidos = devices.filter(d => d.status);
  const maxWatts = 2500;
  const porcentaje = Math.min((totalWatts / maxWatts) * 100, 100);
  const circunferencia = 2 * Math.PI * 58;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;

  return (
    <div className="relative flex items-center justify-center">
      {/* Cuerpo del reloj (ligeramente más grande y con margen extra) */}
      <div className="w-[340px] h-[340px] rounded-full border-[8px] border-slate-800 bg-[#020617] flex items-center justify-center relative"
           style={{ boxShadow: '0 0 80px rgba(16,185,129,0.1), 0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(16,185,129,0.03)' }}>
        <div className="absolute inset-0 rounded-full border-2 border-white/5 pointer-events-none" />

        {/* Zona segura interna */}
        <div className="w-full h-full rounded-full p-[16%] flex flex-col items-center justify-between text-center relative z-10">
          
          {watchPage === 'main' && (
            <>
              <div className="flex flex-col items-center gap-0.5 mt-1">
                <span className="text-2xl font-extrabold text-white tracking-tight">10:09</span>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest">Mar, 22 Oct</span>
              </div>

              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 140 140">
                  <defs>
                    <linearGradient id="watchArc" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="70" r="58" stroke="#1e293b" strokeWidth="10" fill="none" />
                  <circle cx="70" cy="70" r="58" stroke="url(#watchArc)" strokeWidth="10" fill="none"
                    strokeLinecap="round" strokeDasharray={circunferencia} strokeDashoffset={offset}
                    className="transition-all duration-700 ease-out" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white">{totalWatts}</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Watts</span>
                </div>
              </div>

              {watchEcoMode && (
                <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full animate-pulse">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[9px] text-emerald-400 font-bold">ECO 30%</span>
                </div>
              )}

              <div className="flex gap-2 w-full mb-1">
                <button onClick={() => apagarTodo()}
                  className="flex-1 py-2 bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold rounded-full text-[10px] flex items-center justify-center gap-1">
                  <Power className="w-3 h-3" /> Apagar Todo
                </button>
                <button onClick={() => { setWatchEcoMode(!watchEcoMode); triggerToast(`Modo Eco ${!watchEcoMode ? 'activado' : 'desactivado'}`); }}
                  className={`flex-1 py-2 rounded-full text-[10px] font-bold transition ${watchEcoMode ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950' : 'bg-slate-900/80 border border-slate-700 text-slate-400'}`}>
                  {watchEcoMode ? 'Eco ON' : 'Eco OFF'}
                </button>
              </div>
            </>
          )}

          {watchPage === 'devices' && (
            <div className="flex flex-col items-center w-full space-y-2 max-h-[190px] overflow-y-auto mt-1 pr-1">
              <div className="flex items-center justify-between w-full px-1 shrink-0">
                <span className="text-[10px] font-bold text-slate-300">Dispositivos Activos</span>
                <button onClick={() => setWatchPage('main')} className="text-slate-500 hover:text-white">
                  <Home className="w-4 h-4" />
                </button>
              </div>
              {encendidos.length === 0 ? (
                <p className="text-[10px] text-slate-500 py-4">Todo apagado</p>
              ) : (
                encendidos.map(device => (
                  <div key={device.id} className="flex items-center justify-between w-full bg-slate-950/80 rounded-xl px-3 py-2 shrink-0">
                    <div className="flex items-center gap-2">
                      <DeviceIcon name={device.name} />
                      <span className="text-[10px] text-slate-300 truncate max-w-[120px]">{device.name}</span>
                    </div>
                    <button
                      onClick={() => toggleDevice(device.id, device.status, device.name)}
                      className="text-rose-400 hover:bg-rose-500/20 rounded-full p-1"
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Botones físicos laterales – más separados y alineados */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button onClick={() => setWatchPage('devices')}
          className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 shadow-lg"
          title="Dispositivos activos">
          <List className="w-4 h-4" />
        </button>
        <button onClick={() => setWatchPage('main')}
          className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-700 shadow-lg"
          title="Pantalla principal">
          <Home className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}