import React from 'react';
import { Stethoscope, Activity, HeartPulse, ClipboardCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { servicesData, translations } from '../data/content';
import { generateWhatsAppLink } from '../utils/status';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-emerald-400" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-6 h-6 text-emerald-400" />;
      default:
        return <Stethoscope className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span>{t.navServices}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'sq' ? 'Shërbimet Mjekësore & Kujdesi' : 'Medical Services & Patient Care'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {lang === 'sq' 
              ? 'Të gjitha shërbimet mjekësore ofrohen me profesionalizëm dhe vëmendje të plotë ndaj çdo pacienti.' 
              : 'Professional healthcare services delivered with dedicated attention to patient well-being.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const title = lang === 'sq' ? service.titleSq : service.titleEn;
            const description = lang === 'sq' ? service.descriptionSq : service.descriptionEn;
            const waUrl = generateWhatsAppLink('', '', title);

            return (
              <div
                key={service.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {description}
                  </p>
                </div>

                {/* Card Footer WhatsApp Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{service.duration}</span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>{t.bookWhatsApp}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Service Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
              {lang === 'sq' ? 'Keni nevojë për konsultë apo udhëzim mjekësor?' : 'Need specific medical advice or consultation?'}
            </h3>
            <p className="text-slate-300 text-sm">
              {lang === 'sq' 
                ? 'Dr. Fitore Arifi Sinani është e gatshme t’u përgjigjet pyetjeve tuaja me mirësi dhe profesionalizëm.' 
                : 'Dr. Fitore Arifi Sinani is available to answer your healthcare questions with expertise and care.'}
            </p>
          </div>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>{t.bookWhatsApp}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
