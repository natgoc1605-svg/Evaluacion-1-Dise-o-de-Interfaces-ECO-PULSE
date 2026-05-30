import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { X } from 'lucide-react';

export default function CrudModal() {
  const {
    modalOpen, setModalOpen, editMode,
    formName, setFormName,
    formWatts, setFormWatts,
    formStatus, setFormStatus,
    saveDevice
  } = useEcoPulse();

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-sm p-5 space-y-4 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200">
            {editMode ? 'Modificar Dispositivo' : 'Añadir al Catálogo'}
          </h3>
          <button
            onClick={() => setModalOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1.5">Nombre</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Ej. Calefactor Sala"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1.5">Consumo (Watts)</label>
            <input
              type="number"
              value={formWatts}
              onChange={(e) => setFormWatts(e.target.value)}
              placeholder="Ej. 1100"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1.5">Estado</label>
            <select
              value={formStatus ? "true" : "false"}
              onChange={(e) => setFormStatus(e.target.value === "true")}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-300 focus:border-emerald-500 outline-none transition"
            >
              <option value="true">Activo / Encendido</option>
              <option value="false">Inactivo / Apagado</option>
            </select>
          </div>

          <button
            onClick={saveDevice}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all duration-200 shadow-lg shadow-emerald-500/20"
          >
            {editMode ? 'Actualizar Dispositivo' : 'Agregar Dispositivo'}
          </button>
        </div>
      </div>
    </div>
  );
}