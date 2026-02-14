import React from 'react';
import { Trash2 } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderListProps {
  items: OrderItem[];
  onDelete: (id: string) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gold-600/50 border-2 border-dashed border-gold-600/30 rounded-xl max-w-2xl mx-auto">
        <p className="text-lg text-gold-500">القائمة فارغة. ابدأ بإضافة طلبات الكهرباء.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2">
      <div className="bg-transparent overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gold-600/30 text-gold-500 font-bold text-lg mb-2 px-4 print:mb-1 print:pb-1 print:text-base print:px-2">
            <div className="col-span-2 text-center">العدد</div>
            <div className="col-span-9 text-right pr-4">الصنف</div>
            <div className="col-span-1 no-print"></div>
        </div>

        {/* Items */}
        <ul className="space-y-2 print:space-y-0">
          {items.map((item, index) => (
            <li 
              key={item.id} 
              className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg hover:bg-gold-500/10 transition-colors group print:py-1 print:px-2 print:rounded-none print:border-b print:border-gold-600/10 ${
                  index % 2 === 0 ? 'bg-white/5 print:bg-transparent' : 'bg-transparent'
              }`}
            >
              <div className="col-span-2 text-center font-bold text-2xl text-gold-400 font-mono drop-shadow-sm print:text-lg">
                {item.quantity}
              </div>
              <div className="col-span-9 text-right pr-4 text-xl text-gold-100 font-medium leading-relaxed print:text-base print:pr-2">
                {item.name}
              </div>
              <div className="col-span-1 text-center no-print opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10"
                  title="حذف"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary for Print */}
      <div className="mt-8 pt-4 border-t border-gold-600 hidden print:block print:mt-4 print:pt-2">
        <p className="text-right text-gold-500 font-bold print:text-sm">إجمالي عدد الأصناف: {items.length}</p>
      </div>
    </div>
  );
};