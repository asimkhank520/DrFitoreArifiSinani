import React, { useState } from 'react';
import { MessageCircle, X, Phone, Calendar, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink, getClinicCurrentStatus } from '../utils/status';

interface FloatingWhatsAppButtonProps {
  lang: Language;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickName, setQuickName] = useState('');
  const t = translations[lang];
  const status = getClinicCurrentStatus();

  const handleQuickChat = () => {
    const waUrl = generateWhatsAppLink(quickName);
    window.open(waUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Expanded Quick Chat Popup Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[360px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950/20 flex items-center justify-center font-bold text-slate-950 text-xl border border-slate-950/10">
                F
              </div>
              <div>
                <h4 className="font-bold text-slate-950 text-sm leading-tight">{practiceInfo.doctorName}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-950/80 font-medium">
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-slate-950 animate-pulse' : 'bg-slate-950/50'}`} />
                  <span>{status.isOpen ? (lang === 'sq' ? 'Hapur Tani' : 'Open Now') : (lang === 'sq' ? 'Mbyllur Tani' : 'Closed Now')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-950/20 text-slate-950 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-slate-200 bg-slate-900 text-xs sm:text-sm">
            
            {/* Greeting Bubble */}
            <div className="bg-slate-800/90 border border-slate-700/60 p-3.5 rounded-2xl rounded-tl-none space-y-1">
              <p className="font-medium text-white">
                👋 {lang === 'sq' ? 'Përshëndetje! Si mund t’ju ndihmojmë me terminin tuaj?' : 'Hello! How can we assist you with your appointment?'}
              </p>
              <p className="text-[11px] text-slate-400">
                {practiceInfo.address.street}, Ferizaj • Mon-Fri 10:00 - 18:00
              </p>
            </div>

            {/* Quick Name Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'sq' ? 'Emri juaj (opsionale)' : 'Your Name (optional)'}
              </label>
              <input
                type="text"
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                placeholder={lang === 'sq' ? 'Shkruani emrin tuaj...' : 'Type your name...'}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleQuickChat}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl shadow-md transition-colors text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.startWaChat}</span>
              </button>

              <a
                href={`tel:${practiceInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl transition-colors text-xs border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'sq' ? 'Thirr në Telefon' : 'Call Phone'}: {practiceInfo.phoneDisplay}</span>
              </a>
            </div>

            <div className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>+383 48 872 828 • Ferizaj, Kosovo</span>
            </div>

          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 sm:px-5 sm:py-4 rounded-full shadow-2xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="WhatsApp Appointment"
      >
        {/* Pulse ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-slate-950"></span>
        </span>

        <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
        
        <span className="hidden sm:inline font-extrabold text-sm tracking-tight">
          {t.bookWhatsApp}
        </span>
      </button>

    </div>
  );
};
