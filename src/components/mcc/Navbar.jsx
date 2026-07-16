import React, { useState } from 'react';
import { useLang } from './LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { images } from '../../config/assets';

const navItems = {
  en: ['Who We Are', 'Mission', 'Vision', 'What We Do', 'Donate', 'Media', 'Get Involved'],
  pt: ['Quem Somos', 'Missão', 'Visão', 'O Que Fazemos', 'Contribua', 'Redes Sociais', 'Como Participar'],
};

const sectionIds = ['who-we-are', 'mission', 'vision', 'what-we-do', 'donate', 'media', 'get-involved'];

export default function Navbar() {
  const { lang, toggle } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: '#D4A843', boxShadow: '0 1px 8px rgba(0,0,0,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={images.logo}
              alt="Malalane Cultural Center Logo"
              className="h-12 lg:h-16 w-auto object-contain"
              style={{ mixBlendMode: 'multiply', filter: 'brightness(0.75) contrast(1.8) saturate(1.6)' }}
            />
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-evenly mx-8">
            {navItems[lang].map((item, i) => (
              <button
                key={sectionIds[i]}
                onClick={() => scrollTo(sectionIds[i])}
                className="px-2 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-300 rounded-md hover:bg-white/10 whitespace-nowrap"
                style={{ color: '#1A1A2E' }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-semibold"
              style={{ color: '#1A1A2E', borderColor: '#1A1A2E66' }}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold"
              style={{ color: '#1A1A2E', borderColor: '#1A1A2E66' }}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'PT' : 'EN'}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: '#1A1A2E' }}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#1A1A2E]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navItems[lang].map((item, i) => (
              <button
                key={sectionIds[i]}
                onClick={() => scrollTo(sectionIds[i])}
                className="block w-full text-left px-4 py-3 text-sm text-[#FDF8F0]/80 hover:text-[#D4A843] hover:bg-white/5 rounded-lg transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
