import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { images } from '../../config/assets';

export default function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden flex flex-col justify-start" style={{ minHeight: '140vh' }}>
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Mozambique landscape"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-[#D4A843]">Malalane Cultural Center</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-white/90 max-w-3xl mx-auto leading-relaxed sm:whitespace-nowrap">
            {lang === 'en'
              ? 'Empowering communities through education, culture, and sustainable development.'
              : 'Capacitando comunidades através da educação, cultura e desenvolvimento sustentável.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-4"
        >
          <button
            onClick={() => document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-2 text-white/80 hover:text-white font-semibold transition-all duration-300 text-sm"
          >
            {lang === 'en' ? 'Discover More' : 'Saiba Mais'}
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
