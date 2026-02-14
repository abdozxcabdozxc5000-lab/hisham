import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddItemForm } from './components/AddItemForm';
import { OrderList } from './components/OrderList';
import { OrderItem } from './types';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([]);

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
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden no-print">
         <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col flex-grow max-w-4xl print:block print:max-w-none print:w-full">
        
        {/* هيكل الطباعة: يستخدم نظام الجدول لتكرار الهيدر في كل صفحة */}
        <div className="w-full flex-grow flex flex-col print:table">
          
          {/* Header Group: This repeats on every page in print */}
          <div className="print:table-header-group">
            <Header onPrint={handlePrint} />
            {/* فاصل صغير يظهر فقط في الطباعة */}
            <div className="hidden print:block h-2 mb-2"></div>
          </div>
          
          {/* Body Group: The main content */}
          <div className="print:table-row-group">
            <main className="py-8 print:py-0">
              <AddItemForm onAdd={handleAddItem} />
              
              <div className="relative">
                <div className="hidden md:block print:hidden absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500 rounded-tl-lg"></div>
                <div className="hidden md:block print:hidden absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500 rounded-tr-lg"></div>
                
                <OrderList items={items} onDelete={handleDeleteItem} />
                
                <div className="hidden md:block print:hidden absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500 rounded-bl-lg"></div>
                <div className="hidden md:block print:hidden absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500 rounded-br-lg"></div>
              </div>
            </main>
          </div>

          {/* Footer Spacer: Keeps space at the bottom of pages for the fixed footer */}
          {/* زيادة المساحة بشكل كبير جداً (50mm) لضمان عدم اختفاء البنود خلف الفوتر */}
          <div className="hidden print:table-footer-group">
             <div className="h-[50mm]"></div>
          </div>
        </div>

        {/* Footer (Fixed via CSS in component) */}
        <Footer />
      </div>
    </div>
  );
};

export default App;