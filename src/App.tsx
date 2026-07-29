import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WorkingHours } from './components/WorkingHours';
import { AppointmentSection } from './components/AppointmentSection';
import { LocationContact } from './components/LocationContact';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('sq');

  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar lang={lang} setLang={setLang} onOpenBooking={scrollToAppointment} />

      {/* Main Content Sections */}
      <main>
        <Hero lang={lang} onOpenBooking={scrollToAppointment} />
        <Services lang={lang} />
        <WorkingHours lang={lang} />
        <AppointmentSection lang={lang} />
        <LocationContact lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton lang={lang} />
    </div>
  );
}
