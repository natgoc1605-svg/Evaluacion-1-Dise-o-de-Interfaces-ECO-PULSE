import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { Zap, ChevronRight, PieChart, TrendingUp, Leaf } from 'lucide-react';

export default function DashboardScreen() {
  const { currentUser, totalWatts, devices, toggleDevice, setPhoneScreen, watchEcoMode } = useEcoPulse();
  
  // Solo dispositivos encendidos
  const encendidos = devices.filter(d => d.status);
  
  // Calcular total de watts de encendidos (para la gráfica)
  const totalActivo = encendidos.reduce((sum, d) => sum + d.watts, 0);
  
  // Colores para la gráfica
  const colors = ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];
  
  // Preparar datos para gráfica: máximo 5 segmentos + "Otros" si hay más
  const getChartData = () => {
    if (encendidos.length === 0) return [];
    
    // Ordenar por consumo descendente
    const sorted = [...encendidos].sort((a, b) => b.watts - a.watts);
    
    if (sorted.length <= 5) {
      return sorted.map((d, i) => ({
        ...d,
        color: colors[i % colors.length],
        percentage: ((d.watts / totalActivo) * 100).toFixed(1)
      }));
    }
    
    // Top 5 y el resto como "Otros"
    const top5 = sorted.slice(0, 5);
    const otrosWatts = sorted.slice(5).reduce((sum, d) => sum + d.watts, 0);
    
    const data = top5.map((d, i) => ({
      ...d,
      color: colors[i % colors.length],
      percentage: ((d.watts / totalActivo) * 100).toFixed(1)
    }));
    
    if (otrosWatts > 0) {
      data.push({
        id: 'otros',
        name: 'Otros',
        watts: otrosWatts,
        color: '#94a3b8',
        percentage: ((otrosWatts / totalActivo) * 100).toFixed(1)
      });
    }
    
    return data;
  };
  
  const chartData = getChartData();

  return (
    <div className="space-y-4 pt-2">
      {/* Saludo */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[9px] text-slate-500 uppercase tracking-wider">EcoPulse Monitor</span>
          <h4 className="text-sm font-bold text-white">Hola, {currentUser.name.split(' ')[0]}</h4>
        </div>
        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
          {currentUser.role}
        </span>
      </div>

      {/* Tarjeta de energía total */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/30 border border-emerald-500/20 p-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
          Energía Total {watchEcoMode && '(Eco 30%)'}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-white">{totalWatts}</span>
          <span className="text-xs text-slate-400 font-semibold">Watts</span>
        </div>
        <p className="text-[9px] text-slate-500 mt-2 flex items-center gap-1">
          <Zap className="w-3 h-3 text-yellow-400" />
          {encendidos.length} dispositivo{encendidos.length !== 1 ? 's' : ''} encendido{encendidos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 gap-2">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Ahorro CO₂</span>
            <span className="text-sm font-bold text-white">42 kg</span>
          </div>
        </div>
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Consumo Agua</span>
            <span className="text-sm font-bold text-white">2,340 L</span>
          </div>
        </div>
      </div>

      {/* Gráfico de distribución (solo si hay encendidos) */}
      {chartData.length > 0 && (
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-300 font-bold uppercase">Distribución de Consumo</span>
          </div>
          <div className="flex items-start gap-4">
            {/* Donut */}
            <svg width="90" height="90" viewBox="0 0 40 40" className="shrink-0">
              {chartData.reduce((acc, item, i) => {
                const porcentaje = parseFloat(item.percentage);
                const angulo = (porcentaje / 100) * 360;
                const startAngle = acc.offset;
                const endAngle = startAngle + angulo;
                const largeArc = angulo > 180 ? 1 : 0;
                const x1 = 20 + 12 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 20 + 12 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 20 + 12 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 20 + 12 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                acc.paths.push(
                  <path key={item.id || i}
                    d={`M20,8 A12,12 0 ${largeArc},1 ${x2},${y2} L20,20 Z`}
                    fill={item.color}
                    opacity="0.85"
                  />
                );
                acc.offset = endAngle;
                return acc;
              }, { paths: [], offset: 0 }).paths}
              <circle cx="20" cy="20" r="7" fill="#0f172a" />
              {/* Texto central: total de dispositivos encendidos */}
              <text x="20" y="21" textAnchor="middle" fill="#e2e8f0" fontSize="6" fontWeight="bold">
                {encendidos.length}
              </text>
              <text x="20" y="27" textAnchor="middle" fill="#94a3b8" fontSize="3">
                DISP
              </text>
            </svg>
            
            {/* Leyenda con scroll si es necesario */}
            <div className="flex-1 space-y-1.5 max-h-[120px] overflow-y-auto">
              {chartData.map((item, i) => (
                <div key={item.id || i} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-400 truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-white ml-2 shrink-0">{item.watts}W</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dispositivos encendidos */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-center mb-2 shrink-0">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
            Dispositivos Encendidos ({encendidos.length})
          </span>
          <button
            onClick={() => setPhoneScreen('crud')}
            className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5 hover:underline"
          >
            Administrar <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        {encendidos.length === 0 ? (
          <div className="glass-card p-4 text-center text-slate-500 text-xs">
            <Zap className="w-8 h-8 mx-auto mb-2 text-slate-700" />
            <p>Todos los dispositivos están apagados</p>
            <button
              onClick={() => setPhoneScreen('crud')}
              className="text-emerald-400 font-bold mt-1 hover:underline"
            >
              Ir al catálogo para encender
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 min-h-0 space-y-1.5 pr-1">
            {encendidos.map(device => (
              <div
                key={device.id}
                className="flex items-center justify-between p-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl hover:border-emerald-500/30 transition group"
              >
                <div>
                  <span className="text-[11px] font-bold text-white block">{device.name}</span>
                  <span className="text-[9px] text-slate-500">{device.watts}W</span>
                </div>
                <button
                  onClick={() => toggleDevice(device.id, device.status, device.name)}
                  className="relative w-12 h-6 rounded-full transition-all duration-300 bg-emerald-400 opacity-70 hover:opacity-100 group-hover:opacity-100"
                >
                  <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}