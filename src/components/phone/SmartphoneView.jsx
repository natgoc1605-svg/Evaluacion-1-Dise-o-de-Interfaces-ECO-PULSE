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
  const { isLoggedIn, phoneScreen, textSize, highContrast, isDarkMode } = useEcoPulse();

  const renderScreen = () => {
    if (!isLoggedIn) {
      return phoneScreen === 'register' ? <RegisterScreen /> : <LoginScreen />;
    }
    switch (phoneScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'crud': return <CrudScreen />;
      case 'profile': return <ProfileScreen />;
      case 'control': return <ControlPanelScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className={`relative w-[320px] sm:w-[360px] h-[600px] sm:h-[640px] rounded-[40px] sm:rounded-[44px] border-[4px] sm:border-[5px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${
      highContrast ? 'contrast-125 saturate-50' : ''
    }`}
    style={{
      backgroundColor: isDarkMode ? '#0a0f1e' : '#ffffff',
      borderColor: isDarkMode ? 'rgba(51,65,85,0.5)' : 'rgba(203,213,225,0.8)',
      boxShadow: isDarkMode
        ? '0 0 60px rgba(16,185,129,0.1), 0 20px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.03)'
        : '0 0 40px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.03)',
    }}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-6 sm:h-7 rounded-b-2xl z-50 flex items-center justify-center gap-2 sm:gap-3 pointer-events-none"
        style={{ backgroundColor: isDarkMode ? '#0f172a' : '#e2e8f0' }}>
        <div className="w-8 sm:w-10 h-1 sm:h-1 rounded-full" style={{ backgroundColor: isDarkMode ? '#334155' : '#94a3b8' }} />
      </div>

      {/* Status bar */}
      <div className="h-10 pt-6 sm:pt-7 px-5 sm:px-6 flex justify-between items-center text-[10px] select-none shrink-0"
        style={{ color: isDarkMode ? '#64748b' : '#475569' }}>
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">5G</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
      </div>

      {/* Contenido con scroll */}
      <div
        style={{ fontSize: `${textSize}%` }}
        className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 pb-16 pt-1 transition-all duration-200 scroll-smooth"
      >
        {renderScreen()}
      </div>

      {isLoggedIn && <BottomNav />}

      {/* Brillo interior */}
      <div className="absolute inset-0 rounded-[40px] sm:rounded-[44px] pointer-events-none"
        style={{
          boxShadow: isDarkMode
            ? 'inset 0 0 2px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.03)'
            : 'inset 0 0 2px rgba(0,0,0,0.05), inset 0 1px 0 rgba(0,0,0,0.03)'
        }} />
    </div>
  );
}