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
    <div className="min-h-screen flex flex-col relative bg-dark-900 print:block">
      {/* Background decoration (Screen Only) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden no-print">
         <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* --- PRINT ONLY: FIXED HEADER --- */}
      {/* This element is fixed to the top of the viewport/page. Browsers repeat fixed elements on every printed page. */}
      <div className="hidden print:flex fixed top-0 left-0 w-full z-50 bg-dark-900 flex-col items-center justify-center pt-4 pb-2">
         <Header onPrint={() => {}} />
         {/* Gold Divider Line under header */}
         <div className="w-[90%] h-0.5 bg-gold-500/50 mt-2 mx-auto"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col flex-grow max-w-4xl print:block print:max-w-none print:w-full print:px-0">
        
        {/* --- SCREEN ONLY: HEADER --- */}
        <div className="print:hidden">
            <Header onPrint={handlePrint} />
        </div>

        {/* Print Layout Structure */}
        <div className="w-full flex-grow flex flex-col print:table print:w-full print:border-collapse">
          
          {/* 1. HEADER SPACER (Thead) */}
          {/* This repeats on every page to push content down, making room for the Fixed Header above */}
          <div className="print:table-header-group">
            <div className="print:table-row">
              <div className="print:table-cell w-full">
                 {/* Height matches the Fixed Header (approx 55mm) */}
                 <div className="hidden print:block h-[55mm]"></div> 
              </div>
            </div>
          </div>
          
          {/* 2. FOOTER SPACER (Tfoot) */}
          {/* Reserves 120mm at the bottom of every page for the Fixed Footer */}
          <div className="hidden print:table-footer-group">
             <div className="print:table-row">
                 <div className="print:table-cell">
                    <div style={{ height: '120mm' }}></div>
                 </div>
             </div>
          </div>

          {/* 3. BODY CONTENT (Tbody) */}
          <div className="print:table-row-group">
            <div className="print:table-row">
                <div className="print:table-cell print:align-top w-full">
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
            </div>
          </div>

        </div>

        {/* Fixed Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;