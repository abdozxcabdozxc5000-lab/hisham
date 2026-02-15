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
      <div className="text-center py-12 text-gold-600/50 border-2 border-dashed border-gold-600/30 rounded-xl max-w-2xl mx-auto print:hidden">
        <p className="text-lg text-gold-500">القائمة فارغة. ابدأ بإضافة طلبات الكهرباء.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <table className="w-full border-collapse">
        <thead className="print:table-header-group">
            <tr className="border-b border-gold-600/30 text-gold-500 print:border-gold-500">
                <th className="py-3 px-4 text-center text-lg font-bold w-1/6">العدد</th>
                <th className="py-3 px-4 text-right text-lg font-bold w-4/6">الصنف</th>
                <th className="py-3 px-4 w-1/6 no-print"></th>
            </tr>
        </thead>
        <tbody className="print:table-row-group">
          {items.map((item, index) => {
             // Specific logic for forcing page breaks if needed
             const forcePageBreak = item.quantity === 130 && item.name.includes('لمبة اسبوط');
             
             return (
              <tr 
                key={item.id} 
                style={{ 
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid',
                    pageBreakBefore: forcePageBreak ? 'always' : 'auto'
                }}
                className={`group transition-colors ${
                    index % 2 === 0 ? 'bg-white/5 print:bg-transparent' : 'bg-transparent'
                } hover:bg-gold-500/10 print:border-b print:border-gold-600/20`}
              >
                <td className="py-3 px-4 text-center font-bold text-2xl text-gold-200 font-mono drop-shadow-sm print:text-xl print:text-gold-400 align-middle">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-right text-xl text-gold-200 font-bold leading-relaxed print:text-lg print:text-gold-400 align-middle">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-center no-print align-middle">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
          
          {/* Summary Row - Inserted as a table row to stick to the content */}
          <tr className="hidden print:table-row page-break-inside-avoid break-inside-avoid">
            <td colSpan={3} className="pt-8 pb-4">
               <div className="border-t-2 border-gold-500/50 pt-2 flex justify-end items-center">
                 <p className="text-gold-400 font-bold text-xl ml-2">إجمالي عدد الأصناف:</p>
                 <span className="text-gold-200 font-mono text-2xl font-bold">{items.length}</span>
               </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};