import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddItemFormProps {
  onAdd: (quantity: number, name: string) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && quantity) {
      onAdd(Number(quantity), name);
      setName('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="no-print w-full max-w-2xl mx-auto mb-8 bg-dark-800 p-4 rounded-xl border border-gold-600/30 shadow-lg shadow-gold-900/20">
      <div className="flex flex-col md:flex-row gap-4">
        
        <div className="flex-1">
            <label className="block text-gold-500 text-sm mb-1 font-bold">اسم الصنف</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: لفة سلك 3 مم سويدي"
            className="w-full bg-dark-900 border border-gold-600/50 rounded-lg p-3 text-gold-100 placeholder-gold-600/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:outline-none transition-all text-lg"
            />
        </div>

        <div className="w-full md:w-32">
            <label className="block text-gold-500 text-sm mb-1 font-bold">العدد</label>
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            className="w-full bg-dark-900 border border-gold-600/50 rounded-lg p-3 text-gold-100 placeholder-gold-600/50 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:outline-none transition-all text-lg text-center"
            />
        </div>

        <div className="flex items-end">
            <button
            type="submit"
            disabled={!name || !quantity}
            className="w-full md:w-auto bg-gradient-to-br from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-gold-900/50"
            >
            <Plus size={24} />
            <span>إضافة</span>
            </button>
        </div>
      </div>
    </form>
  );
};