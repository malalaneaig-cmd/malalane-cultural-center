import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { Play, Image, Newspaper } from 'lucide-react';
import { site } from '../../config/assets';

const content = {
  en: {
    title: 'Media',
    subtitle: 'Stories, updates, and highlights from our community',
    news: 'Latest News',
    gallery: 'Photo Gallery',
    videos: 'Videos',
    comingSoon: 'Coming Soon',
    comingDesc: 'Photo galleries from our programs are on the way.',
    followUs: 'Follow Us',
    tags: {
      programs: 'Programs',
      education: 'Education',
      culture: 'Culture',
      community: 'Community',
    },
  },
  pt: {
    title: 'Redes Sociais',
    subtitle: 'Histórias, atualizações e destaques da nossa comunidade',
    news: 'Últimas Notícias',
    gallery: 'Galeria de Fotos',
    videos: 'Vídeos',
    comingSoon: 'Em Breve',
    comingDesc: 'Galerias fotográficas dos nossos programas estarão disponíveis em breve.',
    followUs: 'Siga-nos',
    tags: {
      programs: 'Programas',
      education: 'Educação',
      culture: 'Cultura',
      community: 'Comunidade',
    },
  },
};

const newsHighlights = {
  en: [
    {
      tag: 'programs',
      title: 'Community Learning Centers',
      excerpt:
        'MCC is developing learning centers with classrooms and resources for formal education and vocational training in underserved areas of Zavala, Mozambique.',
    },
    {
      tag: 'education',
      title: 'Scholarships & Adult Literacy',
      excerpt:
        'Scholarship programs and adult literacy workshops are expanding access to quality education and life skills for students and families across the region.',
    },
    {
      tag: 'culture',
      title: 'Maputo’s Vibrant Arts Scene',
      excerpt:
        'From film cycles at the Cine-Teatro Scala to exhibitions honoring Mozambican artists, Maputo remains a hub for cinema, music, and cultural celebration.',
    },
    {
      tag: 'community',
      title: 'Festivals That Unite Communities',
      excerpt:
        'Across Mozambique, cultural festivals and community gatherings celebrate shared heritage — bringing together elders, youth, and families through music, dance, and tradition.',
    },
  ],
  pt: [
    {
      tag: 'programs',
      title: 'Centros de Aprendizagem Comunitária',
      excerpt:
        'O MCC desenvolve centros de aprendizagem com salas de aula e recursos para educação formal e formação profissional em áreas carenciadas de Zavala, Moçambique.',
    },
    {
      tag: 'education',
      title: 'Bolsas de Estudo e Alfabetização',
      excerpt:
        'Programas de bolsas e oficinas de alfabetização para adultos ampliam o acesso à educação de qualidade e às competências para a vida na região.',
    },
    {
      tag: 'culture',
      title: 'Artes e Cinema em Maputo',
      excerpt:
        'Desde ciclos de cinema no Cine-Teatro Scala até exposições que homenageiam artistas moçambicanos, Maputo continua a ser um centro de cultura e criatividade.',
    },
    {
      tag: 'community',
      title: 'Festivais que Unem Comunidades',
      excerpt:
        'Em Moçambique, festivais culturais e encontros comunitários celebram a herança partilhada — reunindo idosos, jovens e famílias através da música, dança e tradição.',
    },
  ],
};

const videoItems = {
  en: [
    {
      src: '/videos/nyandayeyo-initiative.mpeg',
      title: 'Nyandayeyo Initiative',
      description: 'A community initiative highlight from our programs in Mozambique.',
    },
  ],
  pt: [
    {
      src: '/videos/nyandayeyo-initiative.mpeg',
      title: 'Iniciativa Nyandayeyo',
      description: 'Um destaque de iniciativa comunitária dos nossos programas em Moçambique.',
    },
  ],
};

const socialLinks = [
  {
    name: 'X (Twitter)',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'LinkedIn',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Instagram',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'TikTok',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Email',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    href: `mailto:${site.email}`,
  },
];

export default function MediaSection() {
  const { lang } = useLang();
  const c = content[lang];
  const highlights = newsHighlights[lang];
  const videos = videoItems[lang];
  const activeSocialLinks = socialLinks.filter((social) => social.href?.startsWith('http'));

  return (
    <section id="media" className="py-24 sm:py-32 bg-[#3A8FA8] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#D4A843]/10" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
          <p className="mt-3 text-[#FDF8F0]/80 text-lg">{c.subtitle}</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#D4A843] to-[#FDF8F0] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15">
              <Newspaper className="w-6 h-6 text-[#FDF8F0]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FDF8F0]">{c.news}</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-[#1A1A2E]/5 shadow-sm text-left h-full"
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C05621] bg-[#C05621]/10 px-2.5 py-1 rounded-md mb-3">
                  {c.tags[item.tag]}
                </span>
                <h4 className="text-lg font-semibold text-[#1A1A2E] leading-snug">{item.title}</h4>
                <p className="mt-2 text-sm text-[#1A1A2E]/70 leading-relaxed">{item.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 text-center border border-[#1A1A2E]/5 shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1A1A2E]/5 mb-5">
              <Image className="w-8 h-8 text-[#1A1A2E]/30" />
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A2E]">{c.gallery}</h3>
            <p className="mt-2 text-sm text-[#1A1A2E]/40">{c.comingSoon}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-[#1A1A2E]/5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A1A2E]/5">
                <Play className="w-6 h-6 text-[#C05621]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A2E]">{c.videos}</h3>
            </div>

            <div className="space-y-5">
              {videos.map((video) => (
                <article key={video.src}>
                  <div className="overflow-hidden rounded-xl bg-[#1A1A2E]/5">
                    <video
                      className="w-full aspect-video object-cover bg-black"
                      controls
                      preload="metadata"
                      playsInline
                    >
                      <source src={video.src} type="video/mpeg" />
                      Your browser does not support embedded video.
                    </video>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-[#1A1A2E]">{video.title}</h4>
                  <p className="mt-1 text-sm text-[#1A1A2E]/70 leading-relaxed">{video.description}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-[#FDF8F0]/75 max-w-xl mx-auto">{c.comingDesc}</p>

        {activeSocialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FDF8F0]/60 mb-6">
              {c.followUs}
            </p>
            <div className="flex justify-center gap-4">
              {activeSocialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#1A1A2E] text-white flex items-center justify-center hover:bg-[#C05621] transition-colors duration-300 hover:scale-110 transform"
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
