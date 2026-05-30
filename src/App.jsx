import React, { useEffect } from 'react';
import { EcoPulseProvider, useEcoPulse } from './context/EcoPulseContext';
import Header from './components/layout/Header';
import ScreenReader from './components/layout/ScreenReader';
import SmartTvView from './components/tv/SmartTvView';
import SmartphoneView from './components/phone/SmartphoneView';
import SmartwatchView from './components/watch/SmartwatchView';
import Toast from './components/shared/Toast';
import CrudModal from './components/shared/CrudModal';
import TvRemoteControl from './components/shared/TvRemoteControl';

function DeviceRenderer() {
  const { currentDevice } = useEcoPulse();
  return (
    <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 gap-6 min-h-0">
      {currentDevice === 'tv' && (
        <div className="w-full">
          <SmartTvView />
          <TvRemoteControl />
        </div>
      )}
      {currentDevice === 'phone' && <SmartphoneView />}
      {currentDevice === 'watch' && <SmartwatchView />}
    </main>
  );
}

function AppContent() {
  const { isDarkMode } = useEcoPulse();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNDgsMTYzLDE4NCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />
      <Header />
      <DeviceRenderer />
      <ScreenReader />
      <CrudModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <EcoPulseProvider>
      <AppContent />
    </EcoPulseProvider>
  );
}