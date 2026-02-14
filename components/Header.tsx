import React from 'react';
import { Zap, Printer } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPrint }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 relative print:pt-2 print:pb-2">
      {/* Print Button - Hidden when printing */}
      <button 
        onClick={onPrint}
        className="no-print absolute left-4 top-4 p-2 bg-gold-500 text-dark-900 rounded-full hover:bg-gold-300 transition-colors shadow-lg shadow-gold-900/50"
        title="طباعة الطلبية"
      >
        <Printer size={24} />
      </button>

      {/* Logo Icon */}
      <div className="mb-2 relative print:mb-1">
        <Zap className="text-gold-400 fill-current drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] w-16 h-16 print:w-10 print:h-10" strokeWidth={1.5} />
        {/* Decorative dots/lines - Hide detailed decorations in print to keep it clean or scale them */}
        <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gold-500 rounded-full print:w-4 print:-left-5"></div>
        <div className="absolute top-1/2 -left-8 w-2 h-2 bg-gold-400 rounded-full -mt-[3px] shadow-[0_0_5px_#FFD700] print:hidden"></div>
        
        <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gold-500 rounded-full print:w-4 print:-right-5"></div>
        <div className="absolute top-1/2 -right-2 w-2 h-2 bg-gold-400 rounded-full -mt-[3px] shadow-[0_0_5px_#FFD700] print:hidden"></div>
      </div>

      {/* Main Name */}
      <h1 className="text-5xl font-extrabold tracking-wide mb-2 drop-shadow-md gold-gradient-text pb-1 print:text-3xl print:mb-0">
        هشــام محمــد
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl text-gold-200 font-medium tracking-wide print:text-sm">
        أعمال كهرباء متكاملة - تأسيس وصيانة
      </h2>

      {/* Divider */}
      <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-6 rounded-full opacity-80 print-border print:mt-2 print:h-0.5"></div>
    </div>
  );
};