import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddItemForm } from './components/AddItemForm';
import { OrderList } from './components/OrderList';
import { OrderItem } from './types';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([
    // Initial sample data based on the image, users can delete them
    { id: '1', quantity: 20, name: 'علبة ماجيك مصطفى محمود' },
    { id: '2', quantity: 5, name: 'علبة ماجيك مجوز بالعرض م.محمود' },
    { id: '3', quantity: 5, name: 'علبة ماجيك مجوز بالطول م.محمود' },
    { id: '4', quantity: 2, name: 'لفة فلكسيبيل 13 مم م.محمود' },
  ]);

  const handleAddItem = (quantity: number, name: string) => {
    const newItem: OrderItem = {
      id: uuidv4(),
      name,
      quantity,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-dark-900">
      {/* Background decoration (hidden in print to keep it clean black, or remove no-print to show blurs) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden no-print">
         <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col flex-grow max-w-4xl print:pb-32">
        <Header onPrint={handlePrint} />
        
        <main className="flex-grow py-8">
          <AddItemForm onAdd={handleAddItem} />
          
          <div className="relative">
            {/* Corner borders similar to the image card style */}
            <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500 rounded-tl-lg"></div>
            <div className="hidden md:block absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500 rounded-tr-lg"></div>
            
            <OrderList items={items} onDelete={handleDeleteItem} />
            
            <div className="hidden md:block absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500 rounded-bl-lg"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500 rounded-br-lg"></div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;