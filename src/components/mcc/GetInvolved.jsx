import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { HandHeart, Users, Megaphone, Briefcase } from 'lucide-react';

const content = {
  en: {
    title: 'Get Involved',
    subtitle: 'Join us in making a difference',
    description:
      'There are many ways to support our mission. Whether you volunteer your time, partner with us, or help spread the word — every action counts.',
    cards: [
      { icon: HandHeart, title: 'Volunteer', desc: 'Give your time and skills to help our community programs and events.' },
      { icon: Briefcase, title: 'Partner With Us', desc: 'Collaborate with MCC as a corporate or institutional partner to amplify our impact.' },
      { icon: Megaphone, title: 'Spread the Word', desc: 'Share our mission on social media and help us reach more people.' },
      { icon: Users, title: 'Join Our Team', desc: 'We are always looking for passionate individuals to join our team.' },
    ],
    formTitle: 'Stay Connected',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'How would you like to get involved?',
    button: 'Send Message',
  },
  pt: {
    title: 'Como Participar',
    subtitle: 'Junte-se a nós para fazer a diferença',
    description:
      'Existem muitas formas de apoiar a nossa missão. Quer seja como voluntário, parceiro ou ajudando a divulgar — cada ação conta.',
    cards: [
      { icon: HandHeart, title: 'Voluntariado', desc: 'Dedique o seu tempo e competências para ajudar os nossos programas comunitários e eventos.' },
      { icon: Briefcase, title: 'Parcerias', desc: 'Colabore com o MCC como parceiro corporativo ou institucional para ampliar o nosso impacto.' },
      { icon: Megaphone, title: 'Divulgue', desc: 'Partilhe a nossa missão nas redes sociais e ajude-nos a alcançar mais pessoas.' },
      { icon: Users, title: 'Junte-se à Equipa', desc: 'Estamos sempre à procura de pessoas apaixonadas para se juntarem à nossa equipa.' },
    ],
    formTitle: 'Mantenha-se Ligado',
    namePlaceholder: 'O Seu Nome',
    emailPlaceholder: 'O Seu E-mail',
    messagePlaceholder: 'Como gostaria de participar?',
    button: 'Enviar Mensagem',
  },
};

export default function GetInvolved() {
  const { lang } = useLang();
  const c = content[lang];

  return (
    <section id="get-involved" className="py-24 sm:py-32 bg-[#EDAB78] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4A843]/15" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A2E] tracking-tight">
            {c.title}
          </h2>
          <p className="mt-3 text-[#C05621] font-medium text-lg">{c.subtitle}</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#C05621] to-[#D4A843] mx-auto rounded-full" />
          <p className="mt-6 text-[#1A1A2E]/80 max-w-2xl mx-auto">{c.description}</p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.cards.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/50 border border-white/40 rounded-2xl p-6 hover:bg-white/65 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C05621]/15 flex items-center justify-center mb-4 group-hover:bg-[#C05621]/25 transition-colors">
                <Icon className="w-6 h-6 text-[#C05621]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A2E]">{title}</h3>
              <p className="mt-2 text-sm text-[#1A1A2E]/70 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-[#1A1A2E] text-center mb-8">{c.formTitle}</h3>
          <div className="space-y-4 bg-white/50 border border-white/40 rounded-2xl p-8">
            <input
              type="text"
              placeholder={c.namePlaceholder}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#1A1A2E]/10 text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#C05621] focus:ring-2 focus:ring-[#C05621]/20 transition-all"
            />
            <input
              type="email"
              placeholder={c.emailPlaceholder}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#1A1A2E]/10 text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#C05621] focus:ring-2 focus:ring-[#C05621]/20 transition-all"
            />
            <textarea
              placeholder={c.messagePlaceholder}
              rows={4}
              className="w-full px-5 py-3.5 rounded-xl bg-white border border-[#1A1A2E]/10 text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#C05621] focus:ring-2 focus:ring-[#C05621]/20 transition-all resize-none"
            />
            <button className="w-full py-4 bg-[#C05621] hover:bg-[#A04A1C] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#C05621]/30 hover:shadow-xl">
              {c.button}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
