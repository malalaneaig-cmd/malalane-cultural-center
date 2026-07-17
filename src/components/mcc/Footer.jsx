import React from 'react';
import { useLang } from './LanguageContext';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-[#3A8FA8] py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col items-start">
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
          <p className="text-[#FDF8F0]/60 text-xs">
            © {new Date().getFullYear()} Malalane Cultural Center.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
