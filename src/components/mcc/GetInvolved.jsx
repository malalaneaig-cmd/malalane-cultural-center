import React, { useRef, useState } from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { HandHeart, Users, Megaphone, Briefcase } from 'lucide-react';
import { site } from '../../config/assets';

const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`;

const content = {
  en: {
    title: 'Get Involved',
    subtitle: 'Join us in making a difference',
    description:
      'There are many ways to support our mission. Whether you volunteer your time, partner with us, or help spread the word — every action counts.',
    cards: [
      {
        icon: HandHeart,
        title: 'Volunteer',
        desc: 'Give your time and skills to help our community programs and events.',
        messagePrefill: "I'd like to volunteer with Malalane Cultural Center.",
      },
      {
        icon: Briefcase,
        title: 'Partner With Us',
        desc: 'Collaborate with MCC as a corporate or institutional partner to amplify our impact.',
        messagePrefill: "I'm interested in partnering with Malalane Cultural Center.",
      },
      {
        icon: Megaphone,
        title: 'Spread the Word',
        desc: 'Share our mission on social media and help us reach more people.',
        messagePrefill: "I'd like to help spread the word about MCC's mission.",
      },
      {
        icon: Users,
        title: 'Join Our Team',
        desc: 'We are always looking for passionate individuals to join our team.',
        messagePrefill: "I'm interested in joining the Malalane Cultural Center team.",
      },
    ],
    formTitle: 'Stay Connected',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'How would you like to get involved?',
    button: 'Send Message',
    sending: 'Sending…',
    success: 'Thank you! Your message has been sent. We will get back to you soon.',
    error: 'Something went wrong. Please try again or email us at info@malalane.org.',
  },
  pt: {
    title: 'Como Participar',
    subtitle: 'Junte-se a nós para fazer a diferença',
    description:
      'Existem muitas formas de apoiar a nossa missão. Quer seja como voluntário, parceiro ou ajudando a divulgar — cada ação conta.',
    cards: [
      {
        icon: HandHeart,
        title: 'Voluntariado',
        desc: 'Dedique o seu tempo e competências para ajudar os nossos programas comunitários e eventos.',
        messagePrefill: 'Gostaria de ser voluntário/a no Centro Cultural Malalane.',
      },
      {
        icon: Briefcase,
        title: 'Parcerias',
        desc: 'Colabore com o MCC como parceiro corporativo ou institucional para ampliar o nosso impacto.',
        messagePrefill: 'Tenho interesse em estabelecer uma parceria com o MCC.',
      },
      {
        icon: Megaphone,
        title: 'Divulgue',
        desc: 'Partilhe a nossa missão nas redes sociais e ajude-nos a alcançar mais pessoas.',
        messagePrefill: 'Gostaria de ajudar a divulgar a missão do MCC.',
      },
      {
        icon: Users,
        title: 'Junte-se à Equipa',
        desc: 'Estamos sempre à procura de pessoas apaixonadas para se juntarem à nossa equipa.',
        messagePrefill: 'Tenho interesse em juntar-me à equipa do Centro Cultural Malalane.',
      },
    ],
    formTitle: 'Mantenha-se Ligado',
    namePlaceholder: 'O Seu Nome',
    emailPlaceholder: 'O Seu E-mail',
    messagePlaceholder: 'Como gostaria de participar?',
    button: 'Enviar Mensagem',
    sending: 'A enviar…',
    success: 'Obrigado! A sua mensagem foi enviada. Entraremos em contacto em breve.',
    error: 'Ocorreu um erro. Tente novamente ou envie e-mail para info@malalane.org.',
  },
};

export default function GetInvolved() {
  const { lang } = useLang();
  const c = content[lang];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [activeCard, setActiveCard] = useState(null);
  const formRef = useRef(null);
  const messageRef = useRef(null);

  const handleCardClick = (index, messagePrefill) => {
    setFormData((prev) => ({ ...prev, message: messagePrefill }));
    setActiveCard(index);
    if (status !== 'idle') setStatus('idle');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => messageRef.current?.focus(), 450);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New message from ${formData.name} — Malalane Cultural Center`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-5 py-3.5 rounded-xl bg-white border border-[#1A1A2E]/10 text-[#1A1A2E] placeholder:text-[#1A1A2E]/40 focus:outline-none focus:border-[#C05621] focus:ring-2 focus:ring-[#C05621]/20 transition-all';

  return (
    <section id="get-involved" className="py-24 sm:py-32 bg-[#EDAB78] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4A843]/15" />

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

        <div className="relative z-20 mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.cards.map(({ icon: Icon, title, desc, messagePrefill }, i) => (
            <button
              key={title}
              type="button"
              onClick={() => handleCardClick(i, messagePrefill)}
              aria-label={`${title} — ${c.formTitle}`}
              className={`text-left w-full bg-white/50 border rounded-2xl p-6 cursor-pointer transition-all duration-300 group hover:bg-white/70 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#C05621]/40 ${
                activeCard === i
                  ? 'border-[#C05621] bg-white/70 shadow-md ring-2 ring-[#C05621]/20'
                  : 'border-white/40'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#C05621]/15 flex items-center justify-center mb-4 group-hover:bg-[#C05621]/25 transition-colors">
                <Icon className="w-6 h-6 text-[#C05621]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A2E]">{title}</h3>
              <p className="mt-2 text-sm text-[#1A1A2E]/70 leading-relaxed">{desc}</p>
            </button>
          ))}
        </div>

        <div ref={formRef} id="get-involved-form" className="relative z-20 mt-16 max-w-xl mx-auto scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-[#1A1A2E] text-center mb-8">{c.formTitle}</h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white/50 border border-white/40 rounded-2xl p-8"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={c.namePlaceholder}
              required
              autoComplete="name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={c.emailPlaceholder}
              required
              autoComplete="email"
              className={inputClass}
            />
            <textarea
              ref={messageRef}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={c.messagePlaceholder}
              rows={4}
              required
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-[#C05621] hover:bg-[#A04A1C] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#C05621]/30 hover:shadow-xl"
            >
              {status === 'sending' ? c.sending : c.button}
            </button>
            {status === 'success' && (
              <p className="text-sm text-[#1A1A2E] bg-white/70 border border-[#C05621]/20 rounded-xl px-4 py-3 text-center">
                {c.success}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-[#1A1A2E] bg-white/70 border border-red-300 rounded-xl px-4 py-3 text-center">
                {c.error}
              </p>
            )}
          </form>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
