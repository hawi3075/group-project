import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';


const Cart = () => {
  // Mock data following your project's product structure
  const cartItems = [
    {
      id: 1,
      name: "Premium Black Headphones",
      price: 1233.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
      status: "Low Stock (5 items left)"
    },
    {
      id: 2,
      name: "Space-Gray Laptop",
      price: 1200.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
      status: "Professional Workstation v2.0"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-black pb-20 mt-[72px]">
      {/* Header Section - Same flow as Shop/About */}
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter uppercase mb-2 scale-y-110">
          Shopping Cart
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12">
          ({cartItems.length} Items) <span className="mx-2 text-zinc-200">|</span> Review your selection
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side: Cart Items List */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm transition-all hover:shadow-md">
                <div className="w-32 h-32 bg-zinc-50 rounded-3xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-sm font-[900] uppercase tracking-tight mb-1">{item.name}</h3>
                  <p className="text-[9px] font-black uppercase text-red-600 tracking-widest mb-4 italic">
                    {item.status}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <button className="p-2 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-black">{item.quantity}</span>
                    <button className="p-2 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-center md:text-right flex flex-col items-center md:items-end gap-4">
                  <p className="text-lg font-[900] tracking-tighter">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <button className="p-3 text-zinc-300 hover:text-black transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm sticky top-32">
              <h2 className="text-[12px] font-[900] uppercase tracking-[0.2em] mb-10 pb-4 border-b border-zinc-50">
                Order Summary
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-black">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-black">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  <span>Tax</span>
                  <span className="text-black">$0.00</span>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-100 mb-10 flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest">Total</span>
                <span className="text-4xl font-[900] tracking-tighter">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-black text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3">
                  Checkout Now <ArrowRight size={14} />
                </button>
                <Link to="/products" className="w-full flex items-center justify-center py-4 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-50 flex items-center gap-3 text-zinc-300">
                <ShieldCheck size={20} />
                <p className="text-[8px] font-black uppercase tracking-widest">Secure Checkout Powered by AuraSync</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;