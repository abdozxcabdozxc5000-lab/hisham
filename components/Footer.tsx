import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto print:fixed print:bottom-0 print:left-0 print:right-0 print:bg-black print:z-50">
      {/* Decorative line - hidden in print as we use a border there */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-4 opacity-50 print:hidden"></div>
      
      {/* Footer Content */}
      <div className="flex justify-center items-center gap-4 py-4 bg-dark-800 rounded-t-lg border-t border-gold-600/20 print:bg-black print:border-t-2 print:border-gold-500 print:rounded-none print:w-full print:py-6">
        <div className="flex items-center gap-2 text-2xl font-bold text-gold-400">
            <span dir="ltr">01008181793</span>
            <div className="flex gap-2">
                <Phone className="fill-gold-400 text-dark-900 p-0.5 rounded-full bg-gold-400" size={28} />
                <MessageCircle className="text-green-500" size={28} />
            </div>
        </div>
      </div>
    </footer>
  );
};