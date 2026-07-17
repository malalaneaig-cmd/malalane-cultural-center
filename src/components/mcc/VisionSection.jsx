import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { images } from '../../config/assets';

const content = {
  en: {
    title: 'Vision',
    text: 'We strive to be a transformative beacon in fostering a thriving future through education, cultural enrichment, self-sufficiency, inclusivity, ethical leadership, and sustainable progress. We aspire to create a resilient and interconnected community, celebrating tradition while embracing innovation, leaving a lasting legacy of positive change.',
  },
  pt: {
    title: 'Visão',
    text: 'Empenhamo-nos por ser um polo de referência na procura de um futuro próspero através da educação, enriquecimento cultural, auto-suficiência, inclusão, liderança ética e progresso sustentável. Aspiramos por criar uma comunidade resiliente e integrada, celebrando as nossas tradições enquanto abraçamos a inovação, visando deixar um legado duradouro de mudança positiva.',
  },
};

export default function VisionSection() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <section id="vision" className="py-24 sm:py-32 bg-[#3A8FA8] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D4A843]/10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images.vision}
              alt="Children at a village water pump, East Africa"
              loading="lazy"
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 mb-6">
              <Eye className="w-7 h-7 text-[#D4A843]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FDF8F0] tracking-tight">
              {c.title}
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#D4A843] to-[#FDF8F0] rounded-full" />
            <p className="mt-8 text-lg leading-relaxed text-[#FDF8F0]/85">
              {c.text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
