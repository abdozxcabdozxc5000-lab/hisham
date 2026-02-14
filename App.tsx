import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddItemForm } from './components/AddItemForm';
import { OrderList } from './components/OrderList';
import { OrderItem } from './types';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', quantity: 20, name: 'وصلة ليد' },
    { id: '2', quantity: 25, name: 'عود المونيوم بروفايل 1.7' },
    { id: '3', quantity: 7, name: 'درايفر 400 وات' },
    { id: '4', quantity: 2, name: 'درايفر 300 وات' },
    { id: '5', quantity: 140, name: 'شاسيه' },
    { id: '6', quantity: 50, name: 'مفتاح' },
    { id: '7', quantity: 16, name: 'مفتاح دفتير' },
    { id: '8', quantity: 50, name: 'لقمة بريزه' },
    { id: '9', quantity: 25, name: 'بريزه مجوفه' },
    { id: '10', quantity: 250, name: 'سداده' },
    { id: '27', quantity: 1, name: 'بريزة دش' },
    { id: '11', quantity: 2, name: 'بريزة تليفون' },
    { id: '12', quantity: 14, name: 'مفتاح 2 فاز على علبه ماجيك' },
    { id: '13', quantity: 1, name: 'مفتاح جرس' },
    { id: '14', quantity: 1, name: 'جرس على علبه ماجيك' },
    { id: '15', quantity: 2, name: 'باكو شريط لحام سويدى' },
    { id: '16', quantity: 130, name: 'لمبة اسبوط' },
    { id: '17', quantity: 65, name: 'اسبوط مجوز' },
    { id: '18', quantity: 1, name: 'مفتاح ظبط التيار 3 فاز' },
    { id: '19', quantity: 11, name: 'كشاف طوارئ مجوز' },
    { id: '20', quantity: 8, name: 'مفتاح هاجر 32' },
    { id: '21', quantity: 4, name: 'مفتاح 40 امبير هاجر' },
    { id: '22', quantity: 1, name: 'مفتاح ايرث ليكيج 380 فولت هاجر' },
    { id: '23', quantity: 10, name: 'مفتاح هاجر 25' },
    { id: '24', quantity: 3, name: 'لمبة اشاره هاجر' },
    { id: '25', quantity: 1, name: 'قاطع 100 امبير هاجر 3 فاز' },
    { id: '28', quantity: 1, name: 'مفتاح دايمر' },
    { id: '26', quantity: 3, name: 'مفتاح شطر' },
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