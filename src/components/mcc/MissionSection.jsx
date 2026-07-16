import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { images } from '../../config/assets';

const content = {
  en: {
    title: 'Mission',
    text: 'Our mission is to empower underserved communities in Dunhe-Zavala by addressing pressing challenges such as poverty, inadequate education, lack of clean water and limited access to healthcare. We are committed to fostering sustainable development through innovative solutions, community engagement, and a dedication to principles of equity, transparency, and inclusivity. Our vision is a future where every individual in our Community has the opportunity to thrive and achieve their full potential.',
  },
  pt: {
    title: 'Missão',
    text: 'A nossa missão é capacitar as comunidades desfavorecidas de Zavala, enfrentando desafios tais como a pobreza extrema, falta de água potável, educação inadequada e dificuldades de acesso à saúde. É nosso compromisso promover uma mudança sustentável através de soluções inovadoras, engajamento comunitário, sempre norteados pela dedicação aos princípios de equidade, transparência e inclusão. A nossa visão é a de um futuro em que cada indivíduo na nossa Comunidade tenha a oportunidade de prosperar e alcançar seu pleno potencial.',
  },
};

export default function MissionSection() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <section id="mission" className="py-24 sm:py-32 bg-[#1A1A2E] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C05621]/5" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D4A843]/5" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images.mission}
              alt="African community members in discussion"
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C05621]/15 mb-6">
              <Target className="w-7 h-7 text-[#C05621]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FDF8F0] tracking-tight">
              {c.title}
            </h2>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#C05621] to-[#D4A843] rounded-full" />
            <p className="mt-8 text-lg leading-relaxed text-[#FDF8F0]/70">
              {c.text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
