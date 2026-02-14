import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <div className="w-full mt-auto">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-4 opacity-50 print-border print:bg-black"></div>
      
      <div className="flex justify-center items-center gap-4 py-4 bg-dark-800 print-white-bg rounded-t-lg border-t border-gold-600/20">
        <div className="flex items-center gap-2 text-2xl font-bold text-gold-400 print-black-text">
            <span dir="ltr">01008181793</span>
            <div className="flex gap-2">
                <Phone className="fill-gold-400 text-dark-900 p-0.5 rounded-full bg-gold-400" size={28} />
                <MessageCircle className="text-green-500" size={28} />
            </div>
        </div>
      </div>
    </div>
  );
};