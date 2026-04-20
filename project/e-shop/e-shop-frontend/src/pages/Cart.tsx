import { useState } from 'react';
import { Trash2, ShoppingBag, X, ChevronRight, Truck, ArrowLeft, HelpCircle, MapPin, ChevronDown } from 'lucide-react';

const Cart = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Sienna Street Low",
      price: 65.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000",
      status: "Lifestyle Selection"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [amount, setAmount] = useState(1);
  const [view, setView] = useState<'purchase' | 'address'>('purchase');
  
  // Selection States
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  // Address States
  const [selectedCountry, setSelectedCountry] = useState("");
  const countries = ["Ethiopia", "Kenya", "Djibouti", "Sudan", "Eritrea"];
  const availableSizes = ["S", "M", "L", "XL", "44"];
  const availableColors = ["Standard Black", "Retro Red", "Ocean Blue"];

  const closeModals = () => {
    setSelectedProduct(null);
    setIsUrgent(false);
    setAmount(1);
    setView('purchase');
    setIsSizeOpen(false);
    setIsColorOpen(false);
  };

  const calculateTotal = (price: number) => {
    const base = price * amount;
    return isUrgent ? base + 5 : base;
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-black pb-20 mt-[72px]">
      <div className="max-w-[1000px] mx-auto px-8 py-16 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter uppercase mb-2 scale-y-110">
          Shopping Cart
        </h1>
        
        <div className="space-y-6 mt-12">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="w-32 h-32 bg-zinc-50 rounded-3xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-[900] uppercase tracking-tight mb-1">{item.name}</h3>
                <p className="text-[9px] font-black uppercase text-red-600 tracking-widest italic">{item.status}</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4">
                <p className="text-xl font-[900] tracking-tighter">${item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedProduct(item)}
                    className="p-4 bg-black text-white rounded-2xl hover:bg-red-600 transition-all"
                  >
                    <ShoppingBag size={18} />
                  </button>
                  <button className="p-4 text-zinc-300 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MULTI-VIEW CHECKOUT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModals} />
          
          <div className="relative bg-white w-full max-w-md max-h-[90vh] rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
            
            {/* VIEW 1: CONFIRM PURCHASE */}
            {view === 'purchase' && (
              <>
                <div className="p-10 pb-4 flex justify-between items-center bg-white z-10 shrink-0">
                  <h3 className="text-xl font-black uppercase tracking-tight w-full text-center">Confirm Purchase</h3>
                  <button onClick={closeModals} className="absolute top-10 right-10 text-zinc-400 hover:text-black transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-4 scrollbar-hide">
                  
                  {/* SIZE SELECTOR */}
                  <div className="relative">
                    <div 
                      onClick={() => {setIsSizeOpen(!isSizeOpen); setIsColorOpen(false);}}
                      className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer hover:bg-zinc-100 transition-all"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{selectedSize || "Choose Size"}</span>
                      <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isSizeOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isSizeOpen && (
                      <div className="absolute w-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                        {availableSizes.map(s => (
                          <div 
                            key={s} 
                            onClick={() => {setSelectedSize(s); setIsSizeOpen(false);}}
                            className="p-4 text-[10px] font-bold uppercase hover:bg-zinc-50 cursor-pointer border-b last:border-0 border-zinc-50"
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* COLOR SELECTOR */}
                  <div className="relative">
                    <div 
                      onClick={() => {setIsColorOpen(!isColorOpen); setIsSizeOpen(false);}}
                      className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer hover:bg-zinc-100 transition-all"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{selectedColor || "Choose Color"}</span>
                      <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isColorOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isColorOpen && (
                      <div className="absolute w-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                        {availableColors.map(c => (
                          <div 
                            key={c} 
                            onClick={() => {setSelectedColor(c); setIsColorOpen(false);}}
                            className="p-4 text-[10px] font-bold uppercase hover:bg-zinc-50 cursor-pointer border-b last:border-0 border-zinc-50"
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Delivery Address</p>
                    <div 
                      onClick={() => setView('address')} 
                      className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer group hover:bg-zinc-100 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-zinc-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {selectedCountry || "Select Location"}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                    <div className="flex items-center gap-3">
                      <Truck size={18} className="text-zinc-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Urgent Delivery (+$5.00)</span>
                    </div>
                    <button onClick={() => setIsUrgent(!isUrgent)} className={`w-12 h-6 rounded-full transition-all relative ${isUrgent ? 'bg-red-600' : 'bg-zinc-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isUrgent ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Amount</p>
                    <div className="flex items-center justify-between bg-zinc-50 p-2 rounded-2xl border border-zinc-100">
                      <button onClick={() => setAmount(Math.max(1, amount - 1))} className="p-4 hover:bg-white rounded-xl transition-all font-black text-xl">-</button>
                      <span className="font-black text-lg">{amount}</span>
                      <button onClick={() => setAmount(amount + 1)} className="p-4 hover:bg-white rounded-xl transition-all font-black text-xl">+</button>
                    </div>
                  </div>

                  <div className="bg-zinc-50/50 rounded-[2.5rem] p-10 text-center space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Payment</p>
                    <p className="text-5xl font-black tracking-tighter">${calculateTotal(selectedProduct.price).toFixed(2)}</p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-[#E31E24] text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-2xl shadow-xl shadow-red-100 hover:scale-[1.02] transition-all">
                      Pay with Telebirr
                    </button>
                    <button className="w-full bg-black text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-2xl hover:scale-[1.02] transition-all">
                      Pay with Chapa
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* VIEW 2: ADD NEW ADDRESS */}
            {view === 'address' && (
              <>
                <div className="p-10 pb-6 flex justify-between items-center bg-white border-b border-zinc-100 shrink-0">
                  <button onClick={() => setView('purchase')} className="p-2 -ml-2 text-zinc-400 hover:text-black transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                  <div className="text-center">
                    <h3 className="text-sm font-black uppercase tracking-tight">Add New Address</h3>
                    <p className="text-[8px] font-black uppercase text-green-500 tracking-widest">All information is encrypted</p>
                  </div>
                  <HelpCircle size={18} className="text-zinc-300" />
                </div>

                <div className="flex-1 overflow-y-auto px-10 py-8 space-y-5 scrollbar-hide">
                  <div className="space-y-4">
                    <input type="text" placeholder="Contact name*" className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-black transition-all" />
                    <input type="tel" placeholder="Mobile number*" className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-black transition-all" />
                    <input type="text" placeholder="Street, house/apartment/unit*" className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-black transition-all" />
                    
                    <div className="relative">
                      <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-black transition-all appearance-none"
                      >
                        <option value="">Select Country*</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>

                    <input type="text" placeholder="City*" className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold outline-none focus:border-black transition-all" />
                  </div>

                  <button 
                    onClick={() => setView('purchase')}
                    className="w-full bg-[#E31E24] text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-3xl shadow-xl shadow-red-100 mt-4 hover:bg-red-700 transition-all"
                  >
                    Save Address
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;