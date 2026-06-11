import React, { useState } from 'react';
import { useLang } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Cpu, Heart, Shield } from 'lucide-react';

const tabs = [
  { id: 'education', icon: GraduationCap },
  { id: 'technology', icon: Cpu },
  { id: 'solidarity', icon: Heart },
  { id: 'citizenship', icon: Shield },
];

const tabLabels = {
  en: { education: 'Education', technology: 'Technology', solidarity: 'Solidarity & Resilience', citizenship: 'Citizenship' },
  pt: { education: 'Educação', technology: 'Tecnologia', solidarity: 'Solidariedade e Resiliência', citizenship: 'Cidadania' },
};

const content = {
  en: {
    title: 'What We Do',
    education: [
      'Community learning center with classrooms and resources for both formal education and vocational training.',
      'Scholarship programs for underprivileged students to access quality education.',
      'Workshops on financial literacy, entrepreneurship, and job readiness to enhance economic opportunities.',
      'Partner with local schools and universities, Government institutions, private sector to provide educational support and resources.',
      'Adult literacy programs to empower adults with basic reading and writing skills.',
      'Integrate life skills, ethics, and citizenship education to foster values like empathy, responsibility, and respect in particular towards our Elders.',
    ],
    technology: [
      'Community technology center (E-Learning Platform, provide Low-cost devices, and set up a Digital Library) with access to computers, internet, and digital learning resources.',
      'Harness the power of technology to change lives (remote learning, financial literacy).',
      'Technology training and workshops to equip community members with digital skills.',
      'Mobile banking services to remote areas, allowing people to save, borrow, and transfer money securely.',
      'Technology to improve healthcare services, such as telemedicine and health monitoring applications.',
      'Sustainable energy solutions and green technologies to improve living conditions (solar panels, biogas).',
      'Community to take ownership of the center and its initiatives and create a sense of pride and belonging in working towards shared goals.',
    ],
    solidarity: [
      'Support groups for vulnerable members, such as elderly, youth, and women, to provide social and emotional support.',
      'Intergenerational programs that facilitate the exchange of knowledge and skills between elders, youth, and women.',
      'Community celebrations, cultural events, and festivals to foster a sense of togetherness and unity.',
      'Initiatives that address specific challenges faced by the community, such as access to clean water or healthcare.',
      'Technology solutions to improve Community resilience (fish farming, greenhouse farming, drought & pests tolerant crops).',
    ],
    citizenship: [
      'Awareness about the negative effects of rampant corruption in our country and its impact on the community.',
      'Community cleanups and conservation efforts to instill a sense of environmental responsibility.',
      'Awards and recognition programs that celebrate and honor good citizenship and community contributions.',
      'Cultural festivals and events that celebrate diversity and foster community pride.',
    ],
  },
  pt: {
    title: 'O Que Fazemos',
    education: [
      'Centro de aprendizagem comunitário com salas de aulas e recursos para educação formal e formação profissional.',
      'Programas de bolsas de estudo para estudantes desfavorecidos terem acesso à educação de qualidade.',
      'Seminários sobre educação financeira, empreendedorismo e preparação para a vida activa e desta forma melhorar oportunidades económicas.',
      'Parcerias com Escolas e Universidades locais, Instituições Governamentais e do sector privado para fornecer suporte educacional e recursos.',
      'Programas de alfabetização de adultos para capacitar adultos com habilidades básicas de leitura e escrita.',
      'Habilitações para a vida, ética e educação cívica para promover valores como empatia, responsabilidade e respeito em particular para com os idosos (as nossas Bibliotecas Vivas).',
    ],
    technology: [
      'Centro de tecnologia comunitário (Plataforma de E-Learning, instrumentos de aprendizagem de baixo custo e uma Biblioteca Digital) com acesso a computadores, internet e recursos de aprendizagem digital.',
      'Tecnologia como ferramenta para mudar vidas (aprendizagem remota, educação financeira).',
      'Formação e seminários de tecnologia para equipar membros da comunidade com conhecimentos digitais básicos.',
      'Serviços de "banco móvel" para áreas remotas, permitindo que as pessoas economizem, emprestem e transfiram dinheiro com segurança.',
      'Tecnologia para melhorar os serviços de saúde, como telemedicina e aplicações de monitorização de saúde.',
      'Soluções de energia sustentável e tecnologias verdes para melhorar as condições de vida da Comunidade (painéis solares, biogás).',
      'Consciencialização da comunidade para assumir a responsabilidade pelo Centro e suas iniciativas e criar um senso de orgulho e responsabilidade na prossecução das metas definidas pela Comunidade.',
    ],
    solidarity: [
      'Grupos de apoio para membros vulneráveis, tais como idosos, jovens e mulheres, para fornecer apoio social e emocional.',
      'Programas intergeracionais que facilitem a troca de conhecimentos e experiências entre idosos, jovens e mulheres.',
      'Celebrações comunitárias, eventos culturais e festivais para promover um sentimento de unidade.',
      'Iniciativas que abordem desafios específicos enfrentados pela comunidade, tais como acesso a água potável ou cuidados de saúde.',
      'Soluções tecnológicas para melhorar a resiliência da comunidade (piscicultura, agricultura em estufa, culturas tolerantes à seca e pragas).',
    ],
    citizenship: [
      'Consciencialização da Comunidade sobre os efeitos negativos da corrupção desenfreada no nosso país e seu impacto na Comunidade.',
      'Organização de iniciativas de limpezas comunitárias e esforços de conservação para incutir um sentido de responsabilidade ambiental.',
      'Programas de prémios e reconhecimento que celebrem a boa cidadania e as contribuições para a comunidade.',
      'Festivais culturais e eventos que celebrem a diversidade e promovam o orgulho da comunidade.',
    ],
  },
};

export default function WhatWeDo() {
  const { lang } = useLang();
  const c = content[lang];
  const [active, setActive] = useState('education');

  return (
    <section id="what-we-do" className="py-24 sm:py-32 bg-[#1A1A2E]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDF8F0] tracking-tight">
            {c.title}
          </h2>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#C05621] to-[#D4A843] mx-auto rounded-full" />
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === id
                  ? 'bg-[#C05621] text-white shadow-lg shadow-[#C05621]/30'
                  : 'bg-white/5 text-[#FDF8F0]/60 hover:bg-white/10 hover:text-[#FDF8F0]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tabLabels[lang][id]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <div className="grid gap-4">
              {c[active].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex gap-4 p-5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#D4A843]/15 flex items-center justify-center mt-0.5">
                    <span className="text-[#D4A843] text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-[#FDF8F0]/75 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
