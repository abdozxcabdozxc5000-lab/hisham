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
    <div className="min-h-screen bg-dark-900 font-sans text-gold-400">
      
      {/* 
        ========================================
        SCREEN LAYOUT (Hidden when printing)
        ========================================
      */}
      <div className="print:hidden flex flex-col min-h-screen relative">
         {/* Background Decoration */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
         </div>

         <div className="relative z-10 flex flex-col flex-grow container mx-auto px-4 max-w-4xl">
            <Header onPrint={handlePrint} />
            <main className="flex-grow py-8">
               <AddItemForm onAdd={handleAddItem} />
               <OrderList items={items} onDelete={handleDeleteItem} />
            </main>
            <Footer />
         </div>
      </div>

      {/* 
        ========================================
        PRINT LAYOUT (Visible only when printing)
        ========================================
        Uses a native HTML table for the main layout to force 
        headers and footers to repeat on every page.
      */}
      <div className="hidden print:block w-full">
         {/* Fixed Header (Overlays the spacer) */}
         <div className="fixed top-0 left-0 w-full z-50">
            <Header onPrint={() => {}} />
            <div className="w-[90%] h-0.5 bg-gold-500/50 mt-1 mx-auto"></div>
         </div>

         {/* Fixed Footer (Overlays the spacer) */}
         <div className="fixed bottom-0 left-0 w-full z-50">
            <Footer />
         </div>

         {/* Main Layout Table */}
         <table className="w-full border-collapse">
            {/* Header Spacer - Repeats on every page */}
            <thead>
               <tr>
                  <td>
                     {/* Height matches the Fixed Header */}
                     <div className="h-[45mm]"></div>
                  </td>
               </tr>
            </thead>

            {/* Footer Spacer - Repeats on every page */}
            <tfoot>
               <tr>
                  <td>
                     {/* Height matches the Fixed Footer */}
                     <div className="h-[35mm]"></div>
                  </td>
               </tr>
            </tfoot>

            {/* Body Content */}
            <tbody>
               <tr>
                  <td className="align-top">
                     <div className="px-4 py-2">
                        {/* We reuse OrderList but the styling will handle the table look */}
                        <OrderList items={items} onDelete={handleDeleteItem} />
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default App;