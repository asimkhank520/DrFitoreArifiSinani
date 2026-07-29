import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, MapPin, Clock, Globe } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink, getClinicCurrentStatus } from '../utils/status';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];
  const status = getClinicCurrentStatus();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navAbout, href: '#about' },
    { name: t.navServices, href: '#services' },
    { name: t.navHours, href: '#hours' },
    { name: t.navLocation, href: '#location' },
    { name: t.navContact, href: '#contact' },
  ];

  return (
    <>
      {/* Top emergency / quick contact bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <a 
              href={`tel:${practiceInfo.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span className="font-medium">{practiceInfo.phoneDisplay}</span>
            </a>
            <span className="hidden md:inline text-emerald-600">•</span>
            <div className="flex items-center gap-1.5 hidden md:flex">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>{practiceInfo.address.street}, Ferizaj, Kosovo</span>
            </div>
            <span className="hidden md:inline text-emerald-600">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mon-Fri: 10:00 - 18:00</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Clinic Status Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              status.isOpen 
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' 
                : 'bg-rose-500/20 text-rose-200 border border-rose-400/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <span>{status.isOpen ? (lang === 'sq' ? 'HAPUR TANI' : 'OPEN NOW') : (lang === 'sq' ? 'MBYLLUR' : 'CLOSED')}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-emerald-950/60 p-0.5 rounded-lg border border-emerald-800/50">
              <button
                onClick={() => setLang('sq')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  lang === 'sq' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-300 hover:text-white'
                } transition-all`}
              >
                SQ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  lang === 'en' ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-300 hover:text-white'
                } transition-all`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3' 
            : 'bg-slate-900/90 backdrop-blur-sm border-b border-slate-800/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              F
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                {practiceInfo.doctorName}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>Ferizaj, Kosovo</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  {lang === 'sq' ? practiceInfo.titleSq : practiceInfo.titleEn}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-950/40 hover:shadow-emerald-500/20 transition-all text-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{t.bookWhatsApp}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl shadow-md text-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>{t.bookWhatsApp}</span>
              </a>

              <a
                href={`tel:${practiceInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-xl text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{practiceInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
