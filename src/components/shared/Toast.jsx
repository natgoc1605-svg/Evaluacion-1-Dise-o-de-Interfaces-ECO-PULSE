import React from 'react';
import { useEcoPulse } from '../../context/EcoPulseContext';
import { Check, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, showToast } = useEcoPulse();

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
      showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
    }`}>
      <div className="glass-card px-4 py-3 flex items-center gap-3 min-w-[250px] max-w-sm"
           style={{ boxShadow: '0 0 30px rgba(16,185,129,0.15)' }}>
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-xs text-slate-200 font-medium">{toastMessage}</span>
      </div>
    </div>
  );
}