import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { Zap, Edit3, Trash2, Plus } from 'lucide-react';

export default function CrudScreen() {
  const {
    devices,
    toggleDevice,
    openAddModal,
    openEditModal,
    deleteDevice,
    triggerToast,
  } = useEcoPulse();

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-200">Catálogo (CRUD)</span>
        <button
          onClick={openAddModal}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:shadow-lg transition flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Agregar
        </button>
      </div>

      <p className="text-[10px] text-slate-500">
        Administra los dispositivos de tu hogar inteligente.
      </p>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {devices.map(device => (
          <div
            key={device.id}
            className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between hover:border-slate-700 transition"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleDevice(device.id, device.status, device.name)}
                className={`p-1.5 rounded-lg ${
                  device.status ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-600'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
              <div>
                <span className="text-[11px] font-bold text-white block">{device.name}</span>
                <span className="text-[9px] text-slate-500">{device.watts} Watts</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditModal(device)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-cyan-400 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteDevice(device.id, device.name)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-rose-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {devices.length === 0 && (
          <p className="text-[10px] text-slate-500 text-center py-8">No hay dispositivos. Agrega uno nuevo.</p>
        )}
      </div>
    </div>
  );
}