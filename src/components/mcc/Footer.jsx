import React from 'react';
import { useLang } from './LanguageContext';

const content = {
  en: {
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    rights: 'All rights reserved.',
    navLabel: 'Footer navigation',
  },
  pt: {
    contact: 'Contacto',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Utilização',
    rights: 'Todos os direitos reservados.',
    navLabel: 'Navegação do rodapé',
  },
};

const links = [
  { key: 'contact', href: 'mailto:info@malalane.org' },
  { key: 'privacy', href: '/privacy.html' },
  { key: 'terms', href: '/terms.html' },
];

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang];

  const linkClass =
    'text-[#FDF8F0]/85 hover:text-[#FDF8F0] text-sm font-medium transition-colors duration-200';

  return (
    <footer className="bg-[#3A8FA8] py-6 sm:py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-10">
          <div className="flex flex-col items-start shrink-0">
            <div className="flex items-center gap-3">
              <div className="mcc-footer-badge w-10 h-10 shrink-0 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MCC</span>
              </div>
              <p className="text-[#FDF8F0] font-semibold text-sm leading-tight">
                Malalane Cultural Center
              </p>
            </div>
            <p className="text-[#FDF8F0]/70 text-xs leading-tight -mt-2.5 pl-[64px]">
              {lang === 'en' ? 'Mozambique • Portugal • Canada' : 'Moçambique • Portugal • Canadá'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:ml-auto">
            <nav
              aria-label={c.navLabel}
              className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-8 sm:gap-y-2"
            >
              {links.map(({ key, href }) => (
                <a key={key} href={href} className={linkClass}>
                  {c[key]}
                </a>
              ))}
            </nav>
            <p className="text-[#FDF8F0]/60 text-xs leading-tight">
              © {new Date().getFullYear()} Malalane Cultural Center. {c.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
