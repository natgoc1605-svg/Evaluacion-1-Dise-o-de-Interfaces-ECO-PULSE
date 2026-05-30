import React, { useState } from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import {
  Leaf, Zap, Tv, Video, Award, TrendingUp, Droplets, Shield,
  Camera, Power, Settings, Wifi, Music,
  Moon, Sun, Play, SkipBack, SkipForward
} from 'lucide-react';

export default function SmartTvView() {
  const { totalWatts, tvFocusIndex, setTvFocusIndex, tvFocusKeys, speak, devices, watchEcoMode, toggleDevice } = useEcoPulse();
  const [tvMode, setTvMode] = useState('home'); // 'home', 'cameras', 'music'

  const focusCard = (idx) => {
    setTvFocusIndex(idx);
    speak(`Tarjeta enfocada: ${tvFocusKeys[idx]}`);
  };

  const dispositivosActivos = devices.filter(d => d.status).length;

  return (
    <div className="relative w-full max-w-[95vw] xl:max-w-6xl mx-auto">
      {/* Contenedor responsive con aspect-ratio */}
      <div className="relative w-full bg-[#060b1a] rounded-2xl lg:rounded-3xl border-4 lg:border-[10px] border-slate-800/80 shadow-2xl overflow-hidden"
           style={{
             aspectRatio: '16 / 9',
             boxShadow: '0 0 80px rgba(16,185,129,0.08), 0 20px 60px rgba(0,0,0,0.5)'
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="absolute inset-0 p-3 sm:p-4 lg:p-6 flex flex-col gap-2 sm:gap-3 lg:gap-4">
          {/* Barra superior TV */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <Leaf className="text-slate-950 w-3 h-3 lg:w-4 lg:h-4" />
              </div>
              <div>
                <span className="text-xs lg:text-sm font-black text-white tracking-tight">EcoPulse TV</span>
                <span className="text-[7px] lg:text-[9px] text-emerald-400 block -mt-0.5">Monitor de Ecosistema</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-3">
              {/* Selector de modo TV */}
              <div className="flex bg-slate-900/80 rounded-lg lg:rounded-xl p-0.5 gap-0.5 lg:gap-1">
                {[
                  { id: 'home', icon: Tv, label: 'Panel' },
                  { id: 'cameras', icon: Camera, label: 'Cámaras' },
                  { id: 'music', icon: Music, label: 'Ambiente' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => { setTvMode(mode.id); speak(`Modo ${mode.label}`); }}
                    className={`p-1 lg:p-1.5 rounded-md lg:rounded-lg transition ${
                      tvMode === mode.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={mode.label}
                  >
                    <mode.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 lg:gap-1.5 bg-emerald-500/10 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[7px] lg:text-[9px] text-emerald-400 font-bold">EN VIVO</span>
              </div>
            </div>
          </div>

          {/* Contenido dinámico */}
          {tvMode === 'home' && (
            <div className="flex-1 min-h-0 grid grid-cols-12 gap-2 lg:gap-3">
              {/* Sidebar izquierdo */}
              <div className="col-span-3 flex flex-col gap-2 lg:gap-3 overflow-y-auto pr-1">
                {/* Escenas rápidas */}
                <div className="glass-card p-2 lg:p-3 flex flex-col gap-1.5 lg:gap-2 shrink-0">
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <Settings className="w-3 h-3 lg:w-4 lg:h-4 text-cyan-400" />
                    <span className="text-[8px] lg:text-[10px] text-slate-300 font-bold uppercase tracking-wider">Escenas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 lg:gap-1.5">
                    {[
                      { icon: Power, label: 'Fuera', action: () => devices.forEach(d => d.status && toggleDevice(d.id, d.status, d.name)) },
                      { icon: Moon, label: 'Noche', action: () => {} },
                      { icon: Sun, label: 'Día', action: () => {} },
                      { icon: Wifi, label: 'Eco', action: () => {} }
                    ].map((scene, i) => (
                      <button key={i} onClick={scene.action}
                        className="flex flex-col items-center gap-0.5 lg:gap-1 p-1.5 lg:p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition text-[7px] lg:text-[9px] text-slate-400 hover:text-emerald-400">
                        <scene.icon className="w-3 h-3 lg:w-4 lg:h-4" />
                        {scene.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reto semanal */}
                <div className={`glass-card p-2 lg:p-3 flex flex-col gap-1.5 lg:gap-2 shrink-0 transition-all duration-300 cursor-pointer ${
                  tvFocusKeys[tvFocusIndex] === 'co2' ? 'ring-2 ring-emerald-500/50 glow-emerald' : 'hover:border-slate-600/50'
                }`} onClick={() => focusCard(0)}>
                  <div className="flex items-center gap-1.5 lg:gap-2">
                    <Award className="w-3 h-3 lg:w-4 lg:h-4 text-amber-400" />
                    <span className="text-[8px] lg:text-[10px] text-slate-300 font-bold uppercase tracking-wider">Reto Semanal</span>
                  </div>
                  <h5 className="text-xs lg:text-sm font-bold text-white">Semana Sin Standby</h5>
                  <div className="space-y-1 mt-0.5 lg:mt-1">
                    <div className="flex justify-between text-[7px] lg:text-[9px]">
                      <span className="text-slate-500">Progreso</span>
                      <span className="text-emerald-400 font-bold">68%</span>
                    </div>
                    <div className="h-1 lg:h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-700"
                           style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>

                {/* Control rápido */}
                <div className="glass-card p-2 lg:p-3 flex flex-col gap-1.5 lg:gap-2 flex-1 min-h-0">
                  <span className="text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">Control Rápido</span>
                  <div className="flex-1 overflow-y-auto space-y-1 lg:space-y-1.5 pr-1">
                    {devices.map(device => (
                      <div key={device.id} className="flex items-center justify-between py-0.5 lg:py-1">
                        <span className="text-[8px] lg:text-[10px] text-slate-300">{device.name}</span>
                        <button
                          onClick={() => toggleDevice(device.id, device.status, device.name)}
                          className={`w-8 h-4 lg:w-10 lg:h-5 rounded-full relative transition-colors ${device.status ? 'bg-emerald-400' : 'bg-slate-700'}`}>
                          <span className={`absolute top-0.5 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white transition-transform ${device.status ? 'translate-x-4 lg:translate-x-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zona central */}
              <div className="col-span-9 flex flex-col gap-2 lg:gap-3 min-h-0">
                {/* Tarjetas superiores */}
                <div className="grid grid-cols-4 gap-1.5 lg:gap-3 shrink-0">
                  {[
                    { icon: Leaf, label: 'CO₂ Evitado', value: '42 kg', sub: 'Mejora 28%', idx: 0 },
                    { icon: Zap, label: 'Energía', value: `${totalWatts} W`, sub: `${dispositivosActivos} activos`, idx: 1 },
                    { icon: Droplets, label: 'Agua', value: '2,340 L', sub: 'Ahorro 22%', idx: 2 },
                    { icon: Video, label: 'Cámaras', value: '2/4', sub: 'Grabando', idx: 3 },
                  ].map((card) => (
                    <div key={card.idx}
                      onClick={() => focusCard(card.idx)}
                      className={`glass-card p-2 lg:p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                        tvFocusKeys[tvFocusIndex] === tvFocusKeys[card.idx]
                          ? 'ring-2 ring-emerald-500/50 glow-emerald scale-[1.03]'
                          : 'hover:border-slate-600/50 hover:scale-[1.01]'
                      }`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[7px] lg:text-[9px] text-slate-500 font-bold uppercase">{card.label}</span>
                        <card.icon className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-slate-400" />
                      </div>
                      <div className="mt-1 lg:mt-2">
                        <span className="text-sm lg:text-lg font-extrabold text-white">{card.value}</span>
                        <p className="text-[6px] lg:text-[8px] text-slate-500 mt-0.5">{card.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gráfico de barras sin brillo blanco */}
                <div className="flex-1 min-h-0 glass-card p-3 lg:p-4 flex flex-col justify-between cursor-pointer"
                     onClick={() => { setTvFocusIndex(4); speak("Gráfico de consumo semanal"); }}>
                  <div className="flex justify-between items-center mb-2 lg:mb-3 shrink-0">
                    <span className="text-[8px] lg:text-[10px] text-slate-300 font-bold uppercase">Consumo Semanal (kWh)</span>
                    <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-h-0 flex items-end justify-between gap-1 px-1 lg:px-2">
                    {[
                      { day: 'L', value: 18.2 },
                      { day: 'M', value: 22.5 },
                      { day: 'X', value: 15.8 },
                      { day: 'J', value: 19.1 },
                      { day: 'V', value: 24.3 },
                      { day: 'S', value: 14.7 },
                      { day: 'D', value: 17.9 }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-0.5 lg:gap-1">
                        <span className="text-[6px] lg:text-[8px] text-slate-400">{bar.value}</span>
                        <div className="relative w-full">
                          <div
                            className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t-sm lg:rounded-t-md transition-all duration-500"
                            style={{
                              height: `${(bar.value / 30) * 100}%`,
                              minHeight: '3px',
                              boxShadow: '0 2px 4px rgba(16,185,129,0.4)'
                            }}
                            title={`${bar.day}: ${bar.value} kWh`}
                          />
                        </div>
                        <span className="text-[6px] lg:text-[8px] text-slate-600 font-bold">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barra inferior */}
                <div className="glass-card p-1.5 lg:p-2 px-2 lg:px-3 flex items-center justify-between text-[8px] lg:text-[10px] shrink-0">
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="text-slate-500">Hoy: <strong className="text-white">18.5 kWh</strong></span>
                    <span className="text-slate-600 hidden sm:inline">|</span>
                    <span className="text-slate-500 hidden sm:inline">Ayer: <strong className="text-slate-400">20.1 kWh</strong></span>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <Shield className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-amber-400" />
                    <span className="text-amber-400 font-bold">Maestro del Ahorro</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modo Cámaras */}
          {tvMode === 'cameras' && (
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-2 lg:gap-3 overflow-y-auto p-1 lg:p-2">
              {['Entrada Principal', 'Garaje', 'Jardín', 'Sala'].map((cam, i) => (
                <div key={i} className="glass-card p-2 lg:p-3 flex flex-col">
                  <div className="flex items-center gap-1.5 lg:gap-2 mb-1 lg:mb-2 shrink-0">
                    <Video className="w-3 h-3 lg:w-4 lg:h-4 text-rose-400" />
                    <span className="text-[10px] lg:text-xs font-bold text-white">{cam}</span>
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-rose-500 rounded-full animate-pulse ml-auto" />
                  </div>
                  <div className="flex-1 bg-slate-950 rounded-lg flex items-center justify-center text-slate-600 text-[8px] lg:text-[10px] min-h-[60px] lg:min-h-[80px]">
                    [Vista previa]
                  </div>
                  <span className="text-[7px] lg:text-[9px] text-slate-500 mt-1 shrink-0">Grabando · Movimiento detectado</span>
                </div>
              ))}
            </div>
          )}

          {/* Modo Ambiente */}
          {tvMode === 'music' && (
            <div className="flex-1 flex items-center justify-center gap-4 lg:gap-8">
              <div className="text-center">
                <Music className="w-10 h-10 lg:w-16 lg:h-16 text-emerald-400 mx-auto mb-2 lg:mb-4 animate-pulse" />
                <h3 className="text-sm lg:text-lg font-bold text-white">Sonidos de Naturaleza</h3>
                <p className="text-[10px] lg:text-xs text-slate-400 mt-1 lg:mt-2">Bosque lluvioso · Relajante</p>
                <div className="mt-3 lg:mt-4 flex items-center justify-center gap-2 lg:gap-3">
                  <button className="p-1.5 lg:p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                    <SkipBack className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button className="p-2 lg:p-3 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition">
                    <Play className="w-4 h-4 lg:w-6 lg:h-6 fill-current" />
                  </button>
                  <button className="p-1.5 lg:p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                    <SkipForward className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}