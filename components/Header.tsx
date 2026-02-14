import React from 'react';
import { Zap, Printer } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPrint }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 relative print:pt-0 print:pb-0 w-full">
      {/* Print Button - Hidden when printing */}
      <button 
        onClick={onPrint}
        className="no-print absolute left-4 top-4 p-2 bg-gold-500 text-dark-900 rounded-full hover:bg-gold-300 transition-colors shadow-lg shadow-gold-900/50"
        title="طباعة الطلبية"
      >
        <Printer size={24} />
      </button>

      {/* Logo Icon */}
      <div className="mb-4 relative print:mb-1 flex items-center justify-center">
        {/* Horizontal lines next to logo - visual flourish */}
        <div className="hidden print:block absolute right-14 top-1/2 w-8 h-0.5 bg-gold-500/50"></div>
        <div className="hidden print:block absolute left-14 top-1/2 w-8 h-0.5 bg-gold-500/50"></div>

        <Zap className="text-gold-200 fill-gold-400 drop-shadow-[0_0_15px_rgba(253,230,138,0.4)] w-20 h-20 print:w-10 print:h-10" strokeWidth={1.5} />
      </div>

      {/* Main Name */}
      <h1 className="text-5xl font-black tracking-wide mb-3 text-gold-200 print:text-gold-400 print:text-3xl print:mb-1 print:font-extrabold uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        هشــام محمــد
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl text-gold-300 font-bold tracking-wide print:text-base print:text-gold-500">
        أعمال كهرباء متكاملة - تأسيس وصيانة
      </h2>

      {/* Divider for Screen Only */}
      <div className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-gold-200 to-transparent mt-6 rounded-full opacity-60 print:hidden"></div>
    </div>
  );
};