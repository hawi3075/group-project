import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, Minus, Plus, Package, Truck, 
  MapPin, ChevronDown, X, Globe, CheckCircle2 
} from "lucide-react";

// --- IMPORT SHARED DATA ---
import { PRODUCTS } from '@/lib/mock-data';

// Interface to clear TypeScript errors
interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  category: string;
  price: string;
  image: string;
  description?: string;
  stock?: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // UI States
  const [amount, setAmount] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState("Original");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  
  // Dropdown States
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  
  // Address State
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  // Product Lookup
  const product = (PRODUCTS as any[]).find((p) => String(p._id || p.id) === String(id)) as Product;

  useEffect(() => {
    if (product) setMainImage(product.image);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Product Not Found.</h2>
        <Link to="/" className="text-xs font-bold border-b border-black pb-1 uppercase tracking-widest">
          Return Home
        </Link>
      </div>
    );
  }

  const unitPrice = parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;
  const totalPayment = (unitPrice * amount) + (isUrgent ? 5 : 0);

  const handlePayment = () => {
    // Simulating payment processing
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Navigation */}
      <div className="p-6">
        <Link to="/" className="flex items-center text-[10px] font-black uppercase tracking-widest hover:text-purple-600 transition-colors">
          <ChevronLeft size={14} className="mr-2" /> Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="relative group">
          <div className="aspect-[4/5] bg-[#f9f9f9] rounded-[60px] overflow-hidden border border-gray-100 shadow-sm">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col pt-10">
          <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
            {product.category}
          </span>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">
            {product.name}
          </h1>
          <div className="text-6xl font-black mb-8 tracking-tighter">
            ${unitPrice}
          </div>

          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm mb-8 bg-emerald-50 w-fit px-4 py-2 rounded-full">
            <Package size={16} /> {product.stock || '10+'} ITEMS IN STOCK
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg max-w-lg mb-12 italic font-medium">
              "{product.description || 'Premium selection from our latest collection. High quality materials and crafted for comfort.'}"
            </p>
          </div>

          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-8 rounded-[30px] transition-all transform active:scale-95 uppercase italic text-2xl shadow-2xl shadow-purple-200"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Checkout Side Panel */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)} />
          
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 flex justify-between items-center border-b">
              <h2 className="font-black text-2xl uppercase italic tracking-tighter">Order Details</h2>
              <button onClick={() => setIsCheckoutOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Size</label>
                  <button onClick={() => setIsSizeOpen(!isSizeOpen)} className="w-full p-4 border-2 border-gray-100 rounded-2xl font-bold flex justify-between items-center hover:border-purple-200">
                    {selectedSize} <ChevronDown size={16} />
                  </button>
                  {isSizeOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-2 rounded-2xl shadow-xl z-10 overflow-hidden">
                      {["Small", "Medium", "Large"].map(s => (
                        <div key={s} onClick={() => {setSelectedSize(s); setIsSizeOpen(false)}} className="p-4 font-bold hover:bg-purple-50 cursor-pointer">{s}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Color</label>
                  <button onClick={() => setIsColorOpen(!isColorOpen)} className="w-full p-4 border-2 border-gray-100 rounded-2xl font-bold flex justify-between items-center hover:border-purple-200">
                    {selectedColor} <ChevronDown size={16} />
                  </button>
                  {isColorOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-100 mt-2 rounded-2xl shadow-xl z-10 overflow-hidden">
                      {["Original", "Midnight", "Rose"].map(c => (
                        <div key={c} onClick={() => {setSelectedColor(c); setIsColorOpen(false)}} className="p-4 font-bold hover:bg-purple-50 cursor-pointer">{c}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Delivery Address</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="ENTER COUNTRY" 
                      value={country}
                      onChange={(e) => setCountry(e.target.value.toUpperCase())}
                      className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-purple-600 rounded-2xl font-bold uppercase text-sm outline-none transition-all" 
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="ENTER CITY" 
                      value={city}
                      onChange={(e) => setCity(e.target.value.toUpperCase())}
                      className="w-full p-5 pl-12 bg-gray-50 border-2 border-transparent focus:border-purple-600 rounded-2xl font-bold uppercase text-sm outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setIsUrgent(!isUrgent)}
                className={`p-6 rounded-[25px] border-2 transition-all cursor-pointer flex items-center justify-between ${isUrgent ? 'border-purple-600 bg-purple-50/50' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isUrgent ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}><Truck size={24} /></div>
                  <div>
                    <p className="font-black text-sm uppercase italic">Urgent Delivery</p>
                    <p className="text-[10px] font-bold text-gray-400">+$5.00 SHIPPING FEE</p>
                  </div>
                </div>
                <div className={`w-14 h-8 rounded-full relative transition-colors ${isUrgent ? 'bg-purple-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm ${isUrgent ? 'left-7' : 'left-1'}`} />
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-900 p-2 rounded-2xl">
                <button onClick={() => setAmount(Math.max(1, amount-1))} className="p-4 text-white hover:text-purple-400 transition-colors"><Minus size={20}/></button>
                <span className="text-white font-black text-2xl">{amount}</span>
                <button onClick={() => setAmount(amount+1)} className="p-4 text-white hover:text-purple-400 transition-colors"><Plus size={20}/></button>
              </div>
            </div>

            {/* Payment Section */}
            <div className="p-8 border-t bg-gray-50/80">
              <div className="flex justify-between items-end mb-8">
                <span className="text-[10px] font-black uppercase text-gray-400">Total Payment</span>
                <span className="text-5xl font-black italic tracking-tighter text-gray-900">${totalPayment.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={handlePayment} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-3xl font-black uppercase italic tracking-tighter shadow-xl shadow-purple-100 transition-all active:scale-95">Pay with Telebirr</button>
                <button onClick={handlePayment} className="w-full bg-gray-900 hover:bg-black text-white py-6 rounded-3xl font-black uppercase italic tracking-tighter transition-all active:scale-95">Pay with Chapa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS OVERLAY */}
      {isSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-purple-600/90 backdrop-blur-xl animate-in fade-in duration-500" />
          <div className="relative bg-white p-12 rounded-[50px] text-center space-y-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-200">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Payment Success!</h2>
              <p className="text-zinc-500 text-sm font-medium">Thank you for shopping at Efoy Gebya. Your order is being processed.</p>
            </div>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setIsCheckoutOpen(false);
              }}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]"
            >
              Back to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;