import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageCircle, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { servicesData, translations } from '../data/content';
import { generateWhatsAppLink, getClinicCurrentStatus } from '../utils/status';

interface AppointmentSectionProps {
  lang: Language;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const status = getClinicCurrentStatus();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(servicesData[0].id);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const selectedService = servicesData.find((s) => s.id === serviceId);
  const serviceTitle = selectedService ? (lang === 'sq' ? selectedService.titleSq : selectedService.titleEn) : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waUrl = generateWhatsAppLink(
      fullName,
      phone,
      serviceTitle,
      preferredDate,
      preferredTime,
      notes
    );

    // Open WhatsApp URL
    window.open(waUrl, '_blank');
    setSentSuccess(true);

    setTimeout(() => {
      setSentSuccess(false);
    }, 8000);
  };

  const availableTimeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <section id="appointment" className="py-16 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3 mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{lang === 'sq' ? 'Caktoni Terminin në WhatsApp' : 'WhatsApp Appointment'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.appointmentTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              {t.appointmentSubtitle}
            </p>
          </div>

          {/* Success Toast Banner */}
          {sentSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-sm">
                <span className="font-bold">
                  {lang === 'sq' ? 'Po hapet WhatsApp!' : 'Opening WhatsApp!'}
                </span>{' '}
                {lang === 'sq' 
                  ? 'Kërkesa juaj është përgatitur. Klikoni "Send" në dritaren e WhatsApp për t’i dërguar mesazhin Dr. Fitore Arifi Sinani.'
                  : 'Your scheduling request is prepared. Click "Send" in the WhatsApp window to deliver your message.'}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.fullNameLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'sq' ? 'p.sh. Agon Krasniqi' : 'e.g. John Doe'}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.phoneLabel} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'sq' ? '+383 4X XXX XXX' : '+383 48 872 828'}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.selectServiceLabel} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicesData.map((s) => {
                    const isSelected = s.id === serviceId;
                    const title = lang === 'sq' ? s.titleSq : s.titleEn;

                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-sm font-semibold">{title}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.preferredDateLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {lang === 'sq' ? 'E hënë - E premte (10:00 - 18:00)' : 'Monday - Friday (10:00 - 18:00)'}
                </p>
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.preferredTimeLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
                  {t.notesLabel}
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 text-slate-500 pointer-events-none">
                    <FileText className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={lang === 'sq' ? 'Përshkruani shkurtimisht arsyen e vizitës suaj...' : 'Briefly describe your visit reason or questions...'}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

            </div>

            {/* Form Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/20 text-base transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>{t.sendWhatsAppBtn}</span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-500">
              🔒 {lang === 'sq' 
                ? 'Kjo formë krijon një mesazh të sigurt direkt në WhatsApp me numrin zyrtar +383 48 872 828.' 
                : 'This form formats a direct secure WhatsApp chat message to official number +383 48 872 828.'}
            </p>
          </form>

        </div>

      </div>
    </section>
  );
};
