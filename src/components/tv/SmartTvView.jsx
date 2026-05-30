import React, { useState } from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import {
  Leaf, Zap, Tv, Video, Award, TrendingUp, Droplets, Shield,
  BarChart3, Camera, Power, Settings, Wifi, Music,
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
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="relative bg-[#060b1a] rounded-3xl border-[10px] border-slate-800/80 shadow-2xl overflow-hidden"
           style={{ boxShadow: '0 0 80px rgba(16,185,129,0.08), 0 20px 60px rgba(0,0,0,0.5)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

        <div className="aspect-video p-6 flex flex-col gap-4 relative">
          {/* Barra superior TV */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <Leaf className="text-slate-950 w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-tight">EcoPulse TV</span>
                <span className="text-[9px] text-emerald-400 block -mt-0.5">Monitor de Ecosistema</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Selector de modo TV */}
              <div className="flex bg-slate-900/80 rounded-xl p-0.5 gap-1">
                {[
                  { id: 'home', icon: Tv, label: 'Panel' },
                  { id: 'cameras', icon: Camera, label: 'Cámaras' },
                  { id: 'music', icon: Music, label: 'Ambiente' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => { setTvMode(mode.id); speak(`Modo ${mode.label}`); }}
                    className={`p-1.5 rounded-lg transition ${tvMode === mode.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                    title={mode.label}
                  >
                    <mode.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-emerald-400 font-bold">EN VIVO</span>
              </div>
            </div>
          </div>

          {/* Contenido dinámico según modo */}
          {tvMode === 'home' && (
            <div className="flex-1 min-h-0 grid grid-cols-12 gap-3">
              {/* Sidebar izquierdo con scroll */}
              <div className="col-span-3 flex flex-col gap-3 overflow-y-auto pr-1">
                {/* Escenas rápidas */}
                <div className="glass-card p-3 flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Escenas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { icon: Power, label: 'Fuera', action: () => devices.forEach(d => d.status && toggleDevice(d.id, d.status, d.name)) },
                      { icon: Moon, label: 'Noche', action: () => {} },
                      { icon: Sun, label: 'Día', action: () => {} },
                      { icon: Wifi, label: 'Eco', action: () => {} }
                    ].map((scene, i) => (
                      <button key={i} onClick={scene.action}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition text-[9px] text-slate-400 hover:text-emerald-400">
                        <scene.icon className="w-4 h-4" />
                        {scene.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reto semanal */}
                <div className={`glass-card p-3 flex flex-col gap-2 shrink-0 transition-all duration-300 cursor-pointer ${
                  tvFocusKeys[tvFocusIndex] === 'co2' ? 'ring-2 ring-emerald-500/50 glow-emerald' : 'hover:border-slate-600/50'
                }`} onClick={() => focusCard(0)}>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Reto Semanal</span>
                  </div>
                  <h5 className="text-sm font-bold text-white">Semana Sin Standby</h5>
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-slate-500">Progreso</span>
                      <span className="text-emerald-400 font-bold">68%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-700"
                           style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>

                {/* Control rápido (contenedor con scroll interno) */}
                <div className="glass-card p-3 flex flex-col gap-2 flex-1 min-h-0">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">Control Rápido</span>
                  <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                    {devices.map(device => (
                      <div key={device.id} className="flex items-center justify-between py-1">
                        <span className="text-[10px] text-slate-300">{device.name}</span>
                        <button
                          onClick={() => toggleDevice(device.id, device.status, device.name)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${device.status ? 'bg-emerald-400' : 'bg-slate-700'}`}>
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${device.status ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zona central */}
              <div className="col-span-9 flex flex-col gap-3 min-h-0">
                {/* Tarjetas superiores */}
                <div className="grid grid-cols-4 gap-3 shrink-0">
                  {[
                    { icon: Leaf, label: 'CO₂ Evitado', value: '42 kg', sub: 'Mejora 28%', idx: 0 },
                    { icon: Zap, label: 'Energía', value: `${totalWatts} W`, sub: `${dispositivosActivos} activos`, idx: 1 },
                    { icon: Droplets, label: 'Agua', value: '2,340 L', sub: 'Ahorro 22%', idx: 2 },
                    { icon: Video, label: 'Cámaras', value: '2/4', sub: 'Grabando', idx: 3 },
                  ].map((card) => (
                    <div key={card.idx}
                      onClick={() => focusCard(card.idx)}
                      className={`glass-card p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                        tvFocusKeys[tvFocusIndex] === tvFocusKeys[card.idx]
                          ? 'ring-2 ring-emerald-500/50 glow-emerald scale-[1.03]'
                          : 'hover:border-slate-600/50 hover:scale-[1.01]'
                      }`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">{card.label}</span>
                        <card.icon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="mt-2">
                        <span className="text-lg font-extrabold text-white">{card.value}</span>
                        <p className="text-[8px] text-slate-500 mt-0.5">{card.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gráfico de barras con relieve 3D */}
                <div className="flex-1 min-h-0 glass-card p-4 flex flex-col justify-between cursor-pointer"
                     onClick={() => { setTvFocusIndex(4); speak("Gráfico de consumo semanal"); }}>
                  <div className="flex justify-between items-center mb-3 shrink-0">
                    <span className="text-[10px] text-slate-300 font-bold uppercase">Consumo Semanal (kWh)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-h-0 flex items-end justify-between gap-1 px-2">
                    {[
                      { day: 'L', value: 18.2 },
                      { day: 'M', value: 22.5 },
                      { day: 'X', value: 15.8 },
                      { day: 'J', value: 19.1 },
                      { day: 'V', value: 24.3 },
                      { day: 'S', value: 14.7 },
                      { day: 'D', value: 17.9 }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[8px] text-slate-400">{bar.value}</span>
                        <div className="relative w-full group">
                          {/* Barra con sombra y efecto de relieve */}
                          <div
                            className="w-full bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-t-md transition-all duration-500 relative overflow-hidden"
                            style={{
                              height: `${(bar.value / 30) * 100}%`,
                              minHeight: '4px',
                              boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3), 0 2px 4px -2px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }}
                            title={`${bar.day}: ${bar.value} kWh`}
                          >
                            {/* Brillo izquierdo para dar profundidad */}
                            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/20 to-transparent rounded-tl-md" />
                          </div>
                        </div>
                        <span className="text-[8px] text-slate-600 font-bold">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barra inferior de resumen */}
                <div className="glass-card p-2 px-3 flex items-center justify-between text-[10px] shrink-0">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Hoy: <strong className="text-white">18.5 kWh</strong></span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-500">Ayer: <strong className="text-slate-400">20.1 kWh</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-400 font-bold">Insignia: Maestro del Ahorro</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modo Cámaras */}
          {tvMode === 'cameras' && (
            <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 overflow-y-auto p-2">
              {['Entrada Principal', 'Garaje', 'Jardín', 'Sala'].map((cam, i) => (
                <div key={i} className="glass-card p-3 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 shrink-0">
                    <Video className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-bold text-white">{cam}</span>
                    <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse ml-auto" />
                  </div>
                  <div className="flex-1 bg-slate-950 rounded-lg flex items-center justify-center text-slate-600 text-[10px] min-h-[80px]">
                    [Vista previa]
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 shrink-0">Grabando · Movimiento detectado</span>
                </div>
              ))}
            </div>
          )}

          {/* Modo Ambiente (música simulada) */}
          {tvMode === 'music' && (
            <div className="flex-1 flex items-center justify-center gap-8">
              <div className="text-center">
                <Music className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Sonidos de Naturaleza</h3>
                <p className="text-xs text-slate-400 mt-2">Bosque lluvioso · Relajante</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition">
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                  <button className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                    <SkipForward className="w-5 h-5" />
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