import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import CrudScreen from './screens/CrudScreen';
import ProfileScreen from './screens/ProfileScreen';
import ControlPanelScreen from './screens/ControlPanelScreen';
import BottomNav from './BottomNav';

export default function SmartphoneView() {
  const { isLoggedIn, phoneScreen, textSize, highContrast } = useEcoPulse();

  const renderScreen = () => {
    if (!isLoggedIn) {
      return phoneScreen === 'register' ? <RegisterScreen /> : <LoginScreen />;
    }
    switch (phoneScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'crud':
        return <CrudScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'control':
        return <ControlPanelScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div
      className={`relative w-[360px] h-[640px] bg-[#0a0f1e] rounded-[44px] border-[5px] border-slate-700/50 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${
        highContrast ? 'contrast-125 saturate-50' : ''
      }`}
      style={{
        boxShadow:
          '0 0 60px rgba(16,185,129,0.1), 0 20px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.03)',
      }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center gap-3 pointer-events-none">
        <div className="w-10 h-1 bg-slate-700 rounded-full" />
      </div>

      {/* Status bar */}
      <div className="h-10 pt-7 px-6 flex justify-between items-center text-[10px] text-slate-500 select-none shrink-0">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
            5G
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      {/* Contenido con scroll automático */}
      <div
        style={{ fontSize: `${textSize}%` }}
        className="flex-1 min-h-0 overflow-y-auto px-4 pb-16 pt-1 text-slate-300 transition-all duration-200 scroll-smooth"
      >
        {renderScreen()}
      </div>

      {/* Barra de navegación inferior (solo si está logueado) */}
      {isLoggedIn && <BottomNav />}

      {/* Efecto de brillo en bordes */}
      <div
        className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 2px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      />
    </div>
  );
}