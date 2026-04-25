import { useState } from 'react';
// FIXED: Added missing Link import to solve the red error
import { Link } from 'react-router-dom'; 
import { 
  Trash2, ShoppingBag, X, ChevronRight, Truck, 
  ArrowLeft, HelpCircle, MapPin, ChevronDown, CheckCircle2 
} from 'lucide-react';

const Cart = () => {
  // Real state for cart items to allow deletion
  const [cartItems, setCartItems] = useState([
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
  const [isSuccess, setIsSuccess] = useState(false); 
  
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

  const deleteItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setIsUrgent(false);
    setAmount(1);
    setView('purchase');
    setIsSizeOpen(false);
    setIsColorOpen(false);
    setIsSuccess(false);
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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
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
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="p-4 text-zinc-300 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <p className="text-zinc-400 font-black uppercase tracking-widest text-xs italic">Your cart is currently empty</p>
              <Link to="/" className="inline-block text-[10px] font-black uppercase border-b-2 border-black pb-1">Start Shopping</Link>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModals} />
          
          <div className="relative bg-white w-full max-w-md max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden">
            
            {/* VIEW 1: PURCHASE */}
            {view === 'purchase' && !isSuccess && (
              <div className="flex-1 overflow-y-auto px-10 py-10 space-y-4 scrollbar-hide">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-black uppercase tracking-tight">Confirm</h3>
                   <button onClick={closeModals}><X size={24} /></button>
                </div>
                
                {/* Size Selection */}
                <div className="relative">
                  <div onClick={() => setIsSizeOpen(!isSizeOpen)} className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedSize || "Choose Size"}</span>
                    <ChevronDown size={16} />
                  </div>
                  {isSizeOpen && (
                    <div className="absolute w-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-xl z-50">
                      {availableSizes.map(s => (
                        <div key={s} onClick={() => {setSelectedSize(s); setIsSizeOpen(false);}} className="p-4 text-[10px] font-bold uppercase hover:bg-zinc-50 cursor-pointer">{s}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div className="relative">
                  <div onClick={() => setIsColorOpen(!isColorOpen)} className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedColor || "Choose Color"}</span>
                    <ChevronDown size={16} />
                  </div>
                  {isColorOpen && (
                    <div className="absolute w-full mt-2 bg-white border border-zinc-100 rounded-2xl shadow-xl z-50">
                      {availableColors.map(c => (
                        <div key={c} onClick={() => {setSelectedColor(c); setIsColorOpen(false);}} className="p-4 text-[10px] font-bold uppercase hover:bg-zinc-50 cursor-pointer">{c}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Address Button */}
                <div onClick={() => setView('address')} className="flex justify-between items-center bg-zinc-50 border border-zinc-100 p-5 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedCountry || "Select Location"}</span>
                  </div>
                  <ChevronRight size={16} />
                </div>

                {/* Urgent Toggle */}
                <div className="flex items-center justify-between bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Urgent (+$5.00)</span>
                  </div>
                  <button onClick={() => setIsUrgent(!isUrgent)} className={`w-12 h-6 rounded-full relative ${isUrgent ? 'bg-red-600' : 'bg-zinc-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isUrgent ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="bg-zinc-50/50 rounded-[2.5rem] p-8 text-center">
                  <p className="text-[10px] font-black uppercase text-zinc-400">Total</p>
                  <p className="text-5xl font-black tracking-tighter">${calculateTotal(selectedProduct.price).toFixed(2)}</p>
                </div>

                <button onClick={() => setIsSuccess(true)} className="w-full bg-[#E31E24] text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-2xl">
                  Pay Now
                </button>
              </div>
            )}

            {/* VIEW 2: ADDRESS */}
            {view === 'address' && (
               <div className="p-10 space-y-6">
                  <button onClick={() => setView('purchase')} className="flex items-center gap-2 text-[10px] font-black uppercase">
                    <ArrowLeft size={16}/> Back
                  </button>
                  <h3 className="text-sm font-black uppercase text-center">Enter Details <HelpCircle size={14} className="inline ml-1"/></h3>
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-5 rounded-2xl text-[10px] font-bold"
                  >
                    <option value="">Select Country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setView('purchase')} className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase text-[10px]">Save Address</button>
               </div>
            )}

            {/* VIEW 3: SUCCESS */}
            {isSuccess && (
              <div className="p-12 text-center space-y-8">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-[900] uppercase italic tracking-tighter">Success!</h2>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Order placed successfully.</p>
                </div>
                <button 
                  onClick={() => {
                    deleteItem(selectedProduct.id); 
                    closeModals();
                  }}
                  className="w-full bg-black text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-3xl"
                >
                  Return to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;