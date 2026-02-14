import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddItemForm } from './components/AddItemForm';
import { OrderList } from './components/OrderList';
import { OrderItem } from './types';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  // Initialize with 20 test items to verify the footer spacing fix
  const [items, setItems] = useState<OrderItem[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: uuidv4(),
      name: `بند تجريبي رقم ${i + 1}`,
      quantity: i + 1,
    }))
  );

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

      {/* Main Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col flex-grow max-w-4xl print:block print:max-w-none print:w-full print:px-0">
        
        {/* Print Layout Structure: Table Method for Repetitive Headers/Footers */}
        <div className="w-full flex-grow flex flex-col print:table print:w-full">
          
          {/* Header Group: Repeats on every page */}
          <div className="print:table-header-group">
            <Header onPrint={handlePrint} />
            {/* Spacer after header in print */}
            <div className="hidden print:block h-4"></div>
          </div>
          
          {/* Body Group: Main Content */}
          <div className="print:table-row-group">
            <main className="py-8 print:py-0">
              <AddItemForm onAdd={handleAddItem} />
              
              <div className="relative">
                {/* Decorative Corners (Screen Only) */}
                <div className="hidden md:block print:hidden absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500 rounded-tl-lg"></div>
                <div className="hidden md:block print:hidden absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gold-500 rounded-tr-lg"></div>
                
                <OrderList items={items} onDelete={handleDeleteItem} />
                
                {/* Decorative Corners (Screen Only) */}
                <div className="hidden md:block print:hidden absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gold-500 rounded-bl-lg"></div>
                <div className="hidden md:block print:hidden absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500 rounded-br-lg"></div>
              </div>
            </main>
          </div>

          {/* Footer Spacer Group: Reserves space at bottom of EVERY page so content doesn't hit the fixed footer */}
          <div className="hidden print:table-footer-group">
             {/* 
                Height calculation:
                The fixed footer is approx 80-100px. 
                We set this spacer to 30mm (~113px) to ensure a safe gap.
             */}
             <div style={{ height: '30mm' }}></div>
          </div>
        </div>

        {/* Fixed Footer: Sits on top of the page at the bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default App;