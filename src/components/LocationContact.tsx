import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ExternalLink, Facebook, Instagram, Navigation, Clock } from 'lucide-react';
import { Language } from '../types';
import { practiceInfo, translations } from '../data/content';
import { generateWhatsAppLink } from '../utils/status';

interface LocationContactProps {
  lang: Language;
}

export const LocationContact: React.FC<LocationContactProps> = ({ lang }) => {
  const t = translations[lang];

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(practiceInfo.address.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(practiceInfo.address.mapQuery)}`;

  return (
    <section id="location" className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.navLocation} & {t.navContact}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.addressTitle}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {lang === 'sq'
              ? 'Ordinca jonë gjendet në qendër të Ferizajit, me qasje të lehtë dhe parkim.'
              : 'Our practice is centrally located in Ferizaj, Kosovo with convenient access.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Cards */}
          <div id="contact" className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${practiceInfo.phoneRaw}`}
              className="group block bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-400 group-hover:text-slate-950" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {lang === 'sq' ? 'Numri i Telefonit' : 'Phone Number'}
                  </div>
                  <div className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {practiceInfo.phoneDisplay}
                  </div>
                  <div className="text-xs text-emerald-400 mt-0.5">
                    {lang === 'sq' ? 'Klikoni për të thirrur' : 'Click to call directly'}
                  </div>
                </div>
              </div>
            </a>

            {/* WhatsApp Direct Card */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 p-5 rounded-2xl shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6 fill-slate-950" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300 uppercase font-semibold tracking-wider">
                    {lang === 'sq' ? 'Caktim Termini në WhatsApp' : 'WhatsApp Booking'}
                  </div>
                  <div className="text-lg font-bold text-white group-hover:text-emerald-200 transition-colors">
                    {practiceInfo.phoneDisplay}
                  </div>
                  <div className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span>{t.bookWhatsApp}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${practiceInfo.email}`}
              className="group block bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-400 group-hover:text-slate-950" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {lang === 'sq' ? 'Email-i Zyrtar' : 'Official Email'}
                  </div>
                  <div className="text-base font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                    {practiceInfo.email}
                  </div>
                  <div className="text-xs text-emerald-400 mt-0.5">
                    {lang === 'sq' ? 'Dërgo email' : 'Send an email'}
                  </div>
                </div>
              </div>
            </a>

            {/* Address Card */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                    {lang === 'sq' ? 'Adresa Zyrtare' : 'Official Address'}
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {practiceInfo.address.fullFormatted}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mon-Fri: 10:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold py-2.5 rounded-xl text-xs transition-colors border border-slate-700 mt-2"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>{t.getDirections}</span>
              </a>
            </div>

            {/* Official Social Media Channels */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-3">
              <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                {t.socialMediaTitle}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Facebook Button */}
                <a
                  href={practiceInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg.blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                  <span>Facebook</span>
                </a>

                {/* Instagram Button */}
                <a
                  href={practiceInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-pink-600/10 hover:bg-pink-600/20 border border-pink-500/30 text-pink-400 hover:text-pink-300 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Map */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-2 relative h-[520px] flex flex-col">
            <iframe
              title="Dr. Fitore Arifi Sinani Location"
              src={mapEmbedUrl}
              className="w-full h-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Map Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{practiceInfo.doctorName}</h4>
                  <p className="text-xs text-slate-300">12 Qërshori, Ferizaj, Kosovo, 70000</p>
                </div>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{lang === 'sq' ? 'Udhëzimet Google Maps' : 'Open in Google Maps'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
