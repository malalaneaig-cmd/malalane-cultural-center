import React from 'react';
import { useLang } from './LanguageContext';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const content = {
  en: {
    title: 'Donate',
    subtitle: 'Your generosity makes a difference',
    description:
      'Every contribution helps us empower communities in Zavala through education, technology, and sustainable development. Together, we can create lasting change.',
    amountLabel: 'Select an amount or enter a custom value',
    customPlaceholder: 'Custom amount',
    button: 'Donate Now',
    recurring: 'Make this a monthly donation',
    note: 'All donations are tax-deductible. You will receive a receipt via email.',
  },
  pt: {
    title: 'Contribua',
    subtitle: 'A sua generosidade faz a diferença',
    description:
      'Cada contribuição ajuda-nos a capacitar comunidades em Zavala através da educação, tecnologia e desenvolvimento sustentável. Juntos, podemos criar uma mudança duradoura.',
    amountLabel: 'Selecione um valor ou introduza um valor personalizado',
    customPlaceholder: 'Valor personalizado',
    button: 'Doar Agora',
    recurring: 'Tornar este um donativo mensal',
    note: 'Todos os donativos são dedutíveis nos impostos. Receberá um recibo por e-mail.',
  },
};

const amounts = [10, 25, 50, 100, 250, 500];

export default function DonateSection() {
  const { lang } = useLang();
  const c = content[lang];
  const [selected, setSelected] = React.useState(null);

  return (
    <section id="donate" className="py-24 sm:py-32 bg-[#D2BC9A] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/15" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#C05621]/10" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C05621]/10 mb-6">
            <Heart className="w-7 h-7 text-[#C05621]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A2E] tracking-tight">
            {c.title}
          </h2>
          <p className="mt-3 text-[#8B6914] font-medium text-lg">{c.subtitle}</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[#C05621] to-[#8B6914] mx-auto rounded-full" />
          <p className="mt-6 text-[#1A1A2E]/70 max-w-2xl mx-auto leading-relaxed">
            {c.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-[#1A1A2E]/5"
        >
          <p className="text-sm font-medium text-[#1A1A2E]/60 mb-4">{c.amountLabel}</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelected(amount)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  selected === amount
                    ? 'bg-[#C05621] text-white border-[#C05621] shadow-lg shadow-[#C05621]/20'
                    : 'bg-white text-[#1A1A2E] border-[#1A1A2E]/10 hover:border-[#C05621]/40 hover:text-[#C05621]'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={c.customPlaceholder}
            className="w-full px-5 py-3.5 rounded-xl border border-[#1A1A2E]/10 focus:outline-none focus:border-[#C05621] focus:ring-2 focus:ring-[#C05621]/20 transition-all text-[#1A1A2E] placeholder:text-[#1A1A2E]/30"
            onFocus={() => setSelected(null)}
          />
          <label className="flex items-center gap-3 mt-5 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#1A1A2E]/20 text-[#C05621] focus:ring-[#C05621]" />
            <span className="text-sm text-[#1A1A2E]/60">{c.recurring}</span>
          </label>
          <button className="mt-6 w-full py-4 bg-[#C05621] hover:bg-[#A04A1C] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#C05621]/30 hover:shadow-xl hover:shadow-[#C05621]/40 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            {c.button}
          </button>
          <p className="mt-4 text-xs text-center text-[#1A1A2E]/40">{c.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
