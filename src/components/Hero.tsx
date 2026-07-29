import React from 'react';
import { MessageCircle, Phone, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink, getClinicCurrentStatus } from '../utils/status';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang];
  const status = getClinicCurrentStatus();

  return (
    <section id="about" className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-16 lg:py-20">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location & Status Pills */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MapPin className="w-3.5 h-3.5" />
                12 Qërshori, Ferizaj, Kosovo
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                status.isOpen
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {status.isOpen 
                  ? (lang === 'sq' ? 'HAPUR SOT (10:00 - 18:00)' : 'OPEN TODAY (10:00 - 18:00)')
                  : (lang === 'sq' ? 'MBYLLUR TANI • Hapet të hënën 10:00' : 'CLOSED NOW • Opens Mon 10:00')
                }
              </span>
            </div>

            {/* Doctor Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {practiceInfo.doctorName}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-emerald-400">
                {lang === 'sq' ? practiceInfo.titleSq : practiceInfo.titleEn}
              </p>
            </div>

            {/* Subtitle description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'sq' ? 'Termine direkte në WhatsApp' : 'Direct WhatsApp Scheduling'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'sq' ? 'Kujdes Mjekësor me Përkushtim' : 'Dedicated Patient Care'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'sq' ? 'Konsultime të Personalizuara' : 'Personalized Consultations'}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{lang === 'sq' ? 'Lokacion Qendror në Ferizaj' : 'Central Ferizaj Location'}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all text-base active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>{t.bookWhatsApp}</span>
              </a>

              <a
                href={`tel:${practiceInfo.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-all text-base"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>{practiceInfo.phoneDisplay}</span>
              </a>
            </div>

            {/* Quick Contact Info Strip */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Mon - Fri: 10:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Ferizaj, 70000</span>
              </div>
            </div>

          </div>

          {/* Right Column - Images & Doctor Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Clinic/Consultation Generated Asset */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl bg-slate-900 group">
                <img
                  src="/src/assets/images/doctor_consultation_1785355642449.jpg"
                  alt="Dr. Fitore Arifi Sinani"
                  className="w-full h-[380px] sm:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Floating Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{practiceInfo.doctorName}</h3>
                      <p className="text-xs text-emerald-400 font-medium">
                        {lang === 'sq' ? 'Kujdes i Përkushtuar Shëndetësor' : 'Dedicated Healthcare Professional'}
                      </p>
                    </div>
                    <a
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md"
                      title="WhatsApp Chat"
                    >
                      <MessageCircle className="w-5 h-5 fill-slate-950" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Image Floating Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl bg-slate-900">
                <img
                  src="/src/assets/images/doctor_clinic_hero_1785355626122.jpg"
                  alt="Clinic Room"
                  className="w-full h-28 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2 bg-slate-900 text-center">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === 'sq' ? 'Kujdes Bashkëkohor' : 'Modern Practice'}
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute -top-4 -right-2 bg-emerald-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-full text-xs shadow-lg flex items-center gap-1.5 border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Ferizaj, Kosovo</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
