import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import { Leaf, LogIn, Fingerprint, QrCode } from 'lucide-react';

export default function LoginScreen() {
  const { currentUser, setPhoneScreen, handleLogin } = useEcoPulse();

  return (
    <div className="space-y-5 pt-6">
      <div className="text-center">
        <div className="relative mx-auto w-14 h-14 mb-3">
          <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-lg" />
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Leaf className="text-slate-950 w-7 h-7" />
          </div>
        </div>
        <h3 className="text-lg font-extrabold text-white">EcoPulse</h3>
        <p className="text-[10px] text-slate-500 mt-1">Ecosistema inteligente para ahorro familiar</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Correo Electrónico</label>
          <input
            type="email"
            defaultValue={currentUser.email}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-emerald-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">Contraseña</label>
          <input
            type="password"
            defaultValue="12345678"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:border-emerald-500 outline-none transition"
          />
        </div>
        <button
          onClick={() => handleLogin('password')}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          <LogIn className="w-3.5 h-3.5" /> Ingresar
        </button>
      </div>

      <div className="pt-2 border-t border-white/5 space-y-2">
        <span className="block text-center text-[9px] text-slate-600 uppercase font-bold">Acceso rápido</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleLogin('fingerprint')}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition text-[9px] font-bold text-slate-400 hover:text-emerald-400"
          >
            <Fingerprint className="w-5 h-5" />
            Huella
          </button>
          <button
            onClick={() => handleLogin('qr')}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition text-[9px] font-bold text-slate-400 hover:text-cyan-400"
          >
            <QrCode className="w-5 h-5" />
            Código QR
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-slate-600">
        ¿Nuevo?{' '}
        <button
          onClick={() => setPhoneScreen('register')}
          className="text-emerald-400 font-bold hover:underline"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  );
}