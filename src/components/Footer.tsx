import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Heart } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink } from '../utils/status';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Doctor Practice Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md">
                F
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {practiceInfo.doctorName}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {lang === 'sq' ? practiceInfo.titleSq : practiceInfo.titleEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'sq' 
                ? 'Ordincë mjekësore e përkushtuar ndaj shëndetit dhe mirëqenies suaj në Ferizaj, Kosovë.'
                : 'Healthcare practice dedicated to patient well-being and medical excellence in Ferizaj, Kosovo.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={practiceInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>

              <a
                href={practiceInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center hover:bg-emerald-400 transition-colors shadow-md"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {lang === 'sq' ? 'Lidhje të Shpejta' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  {t.navServices}
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-emerald-400 transition-colors">
                  {t.navHours}
                </a>
              </li>
              <li>
                <a href="#appointment" className="hover:text-emerald-400 transition-colors">
                  {t.appointmentTitle}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-400 transition-colors">
                  {t.navLocation} & {t.navContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Working Schedule */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.workingHoursTitle}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Monday - Friday</span>
                <span className="text-emerald-400 font-semibold">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Saturday</span>
                <span className="text-slate-500">CLOSED</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Sunday</span>
                <span className="text-slate-500">CLOSED</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.directContact}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>12 Qërshori, Ferizaj, Kosovo, 70000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${practiceInfo.phoneRaw}`} className="hover:text-emerald-300 font-semibold">
                  +383 48 872 828
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${practiceInfo.email}`} className="hover:text-emerald-300">
                  fitorearifisinani@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {practiceInfo.doctorName}. {t.rightsReserved}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Ferizaj, Kosovo</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">+383 48 872 828</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
