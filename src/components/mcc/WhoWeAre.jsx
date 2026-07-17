import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { images } from '../../config/assets';

const content = {
  en: {
    title: 'Who We Are',
    text: 'The Malalane Cultural Center is an independent non-governmental organization (NGO) based in Mozambique, with branches in Europe (Portugal) and North America (Canada). The Board of Directors includes individuals from all walks of life, from the public to the private sector, academics, artists, sports personalities, and representatives from non-profit organizations and community activists. Inclusion, diversity, equality, building resilient communities, special support for our elders, and youth empowerment are at the core of everything we do.',
  },
  pt: {
    title: 'Quem Somos',
    text: 'O Centro Cultural Malalane é uma organização não-Governamental independente sem fins lucrativos (ONG), com sede em Moçambique e com delegações na Europa (Portugal) e América do Norte (Canadá). Os Membros do Conselho de Administração incluem personalidades de todas as esferas da vida, do sector público ao privado, Académicos, Artistas, Personalidades do desporto e de Organizações sem fins lucrativos e Activistas comunitários de base. Inclusão, diversidade, igualdade, construção de comunidades resilientes, especial apoio aos nossos anciãos e capacitação de jovens estão no centro de tudo o que fazemos.',
  },
};

export default function WhoWeAre() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <section id="who-we-are" className="py-24 sm:py-32 bg-[#EDAB78] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4A843]/15" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1A2E]/10 mb-6">
            <Users className="w-7 h-7 text-[#C05621]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A2E] tracking-tight">
            {c.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#C05621] to-[#D4A843] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <p className="text-lg leading-relaxed text-[#1A1A2E]/80 text-center">
            {c.text}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-3 sm:gap-4 rounded-2xl overflow-hidden"
        >
          <img
            src={images.communityGathering}
            alt="African community gathering"
            loading="lazy"
            className="w-full h-40 sm:h-56 object-cover rounded-xl"
          />
          <img
            src={images.culturalCelebration}
            alt="Cultural celebration"
            loading="lazy"
            className="w-full h-40 sm:h-56 object-cover rounded-xl"
          />
          <img
            src={images.communityOutreach}
            alt="Community outreach"
            loading="lazy"
            className="w-full h-40 sm:h-56 object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
