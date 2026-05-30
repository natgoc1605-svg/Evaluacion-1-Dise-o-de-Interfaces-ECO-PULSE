import React from 'react';
import { useEcoPulse } from '../../../context/EcoPulseContext';
import {
  Accessibility, LogOut, Mail, Sun, Moon, Edit3, Check, X
} from 'lucide-react';

export default function ProfileScreen() {
  const {
    currentUser,
    textSize, setTextSize,
    highContrast, setHighContrast,
    screenReader, setScreenReader,
    isDarkMode, toggleTheme,
    isEditingProfile,
    editProfileName, setEditProfileName,
    editProfileEmail, setEditProfileEmail,
    editProfileRole, setEditProfileRole,
    startEditProfile, cancelEditProfile, saveProfile,
    handleLogout,
    triggerToast,
  } = useEcoPulse();

  return (
    <div className="space-y-4 pt-2">
      {/* Tarjeta de usuario y edicion */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-950 text-lg shrink-0">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            {isEditingProfile ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editProfileName}
                  onChange={(e) => setEditProfileName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-white"
                  placeholder="Nombre"
                />
                <input
                  type="email"
                  value={editProfileEmail}
                  onChange={(e) => setEditProfileEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-white"
                  placeholder="Correo"
                />
                <select
                  value={editProfileRole}
                  onChange={(e) => setEditProfileRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-2 text-xs text-slate-300"
                >
                  <option value="Padre / Administrador">Padre / Administrador</option>
                  <option value="Hijo / Integrante">Hijo / Integrante</option>
                  <option value="Invitado Temporal">Invitado Temporal</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={saveProfile}
                    className="flex-1 py-1.5 bg-emerald-500 text-slate-950 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Guardar
                  </button>
                  <button onClick={cancelEditProfile}
                    className="flex-1 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
                    <X className="w-3 h-3" /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="text-sm font-bold text-white block truncate">{currentUser.name}</span>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-0.5">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{currentUser.email}</span>
                </div>
                <span className="inline-block text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold mt-1.5">
                  {currentUser.role}
                </span>
              </>
            )}
          </div>
          {!isEditingProfile && (
            <button onClick={startEditProfile}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800">
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tema claro/oscuro */}
      <div className="glass-card p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isDarkMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          <div>
            <span className="text-[10px] font-bold text-slate-300 block">
              {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
            </span>
            <span className="text-[8px] text-slate-600">
              {isDarkMode ? 'Tema oscuro activado' : 'Tema claro activado'}
            </span>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
            isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-emerald-400'
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
              isDarkMode ? 'left-0.5' : 'translate-x-6'
            }`}
          />
        </button>
      </div>

      {/* Accesibilidad */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Accessibility className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Preferencias de Accesibilidad
          </span>
        </div>

        <div className="glass-card p-3 space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-300 font-bold">Tamano de Letra</span>
            <span className="text-emerald-400 font-bold">{textSize}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">A-</span>
            <input
              type="range" min="80" max="140" value={textSize}
              onChange={(e) => setTextSize(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-slate-300 font-bold">A+</span>
          </div>
        </div>

        <div className="glass-card p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-300 block">Alto Contraste</span>
            <span className="text-[8px] text-slate-600">Optimizado para baja vision</span>
          </div>
          <button
            onClick={() => { setHighContrast(!highContrast); triggerToast(`Alto contraste ${!highContrast ? 'activado' : 'desactivado'}`); }}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${highContrast ? 'bg-emerald-400' : 'bg-slate-800 border border-slate-700'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${highContrast ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="glass-card p-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-300 block">Asistente Vocal</span>
            <span className="text-[8px] text-slate-600">Descripciones por voz</span>
          </div>
          <button
            onClick={() => { setScreenReader(!screenReader); triggerToast(`Lector ${!screenReader ? 'activado' : 'desactivado'}`); }}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${screenReader ? 'bg-emerald-400' : 'bg-slate-800 border border-slate-700'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${screenReader ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full glass-card py-3 flex items-center justify-center gap-2 text-rose-400 text-xs font-bold hover:bg-rose-500/10 transition"
      >
        <LogOut className="w-3.5 h-3.5" /> Cerrar Sesion
      </button>
    </div>
  );
}