import React from 'react';
import { Clock, Calendar, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink, getClinicCurrentStatus } from '../utils/status';

interface WorkingHoursProps {
  lang: Language;
}

export const WorkingHours: React.FC<WorkingHoursProps> = ({ lang }) => {
  const t = translations[lang];
  const status = getClinicCurrentStatus();

  return (
    <section id="hours" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.workingHoursTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.workingHoursTitle}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.workingHoursSubtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Card Wrapper */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Status Header */}
            <div className={`p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border ${
              status.isOpen 
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200' 
                : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${status.isOpen ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'}`}>
                  {status.isOpen ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg">
                    {lang === 'sq' ? status.statusTextSq : status.statusTextEn}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300">
                    {status.isOpen 
                      ? (lang === 'sq' ? 'Ju mirëpresim për vizita gjatë orarit 10:00 - 18:00.' : 'We welcome your visit during our 10:00 - 18:00 hours.')
                      : (lang === 'sq' ? status.nextOpenTextSq : status.nextOpenTextEn)
                    }
                  </div>
                </div>
              </div>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-md text-sm transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.bookWhatsApp}</span>
              </a>
            </div>

            {/* Timetable List */}
            <div className="space-y-2.5">
              {practiceInfo.workingHours.map((item) => {
                const isCurrentDay = item.dayIndex === status.currentDayIndex;
                const dayLabel = lang === 'sq' ? item.daySq : item.dayEn;

                return (
                  <div
                    key={item.dayIndex}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isCurrentDay
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-4 h-4 ${isCurrentDay ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="font-medium text-sm sm:text-base">{dayLabel}</span>
                      {isCurrentDay && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500 text-slate-950">
                          {lang === 'sq' ? 'SOT' : 'TODAY'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm sm:text-base ${
                        item.isClosed 
                          ? 'text-slate-500' 
                          : isCurrentDay ? 'text-emerald-300' : 'text-slate-200'
                      }`}>
                        {item.hours}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location Reminder Note */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
              <span>📍 {practiceInfo.address.fullFormatted}</span>
              <span>•</span>
              <a href={`tel:${practiceInfo.phoneRaw}`} className="text-emerald-400 hover:underline font-semibold">
                📞 {practiceInfo.phoneDisplay}
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
