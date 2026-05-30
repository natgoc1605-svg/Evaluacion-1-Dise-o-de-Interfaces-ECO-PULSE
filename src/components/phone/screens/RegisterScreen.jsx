import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { ArrowLeft } from 'lucide-react';

export default function RegisterScreen() {
  const {
    regName, setRegName,
    regEmail, setRegEmail,
    regPassword, setRegPassword,
    regRole, setRegRole,
    handleRegister,
    setPhoneScreen,
  } = useEcoPulse();

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPhoneScreen('login')}
          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs font-bold text-slate-200">Registro de Integrante</span>
      </div>

      <form onSubmit={handleRegister} className="space-y-3">
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Nombre Completo</label>
          <input
            type="text"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            placeholder="Ej. Carlos Ramos"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-emerald-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Correo Electrónico</label>
          <input
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-emerald-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Contraseña</label>
          <input
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-emerald-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Rol en el Hogar</label>
          <select
            value={regRole}
            onChange={(e) => setRegRole(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-300 focus:border-emerald-500 outline-none"
          >
            <option value="Padre / Administrador">Padre / Administrador</option>
            <option value="Hijo / Integrante">Hijo / Integrante</option>
            <option value="Invitado Temporal">Invitado Temporal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition hover:shadow-lg hover:shadow-emerald-500/20"
        >
          Crear Registro
        </button>
      </form>
    </div>
  );
}