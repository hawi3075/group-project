import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
// Box icon added back for inventory level
import { ArrowLeft, ChevronDown, ChevronRight, X, Truck, MapPin, HelpCircle, Box } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false); 
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Ethiopia");
  const [isUrgent, setIsUrgent] = useState(false);
  const [amount, setAmount] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  // Inventory level data
  const stockCount = 12; 

  if (product && !mainImage) setMainImage(product.image);
  if (!product) return <div className="p-20 text-center font-black uppercase tracking-widest">Product not found.</div>;

  const availableSizes = ["S", "M", "L", "XL", "44"];
  const availableColors = ["Standard Black", "Retro Red", "Ocean Blue"];
  const countries = ["Ethiopia", "Kenya", "Djibouti", "Sudan", "Eritrea"];

  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
  const urgentFee = isUrgent ? 5.00 : 0; 
  const totalPrice = ((numericPrice * amount) + urgentFee).toFixed(2);

  return (
    <div className="container mx-auto px-8 py-16 min-h-screen bg-white">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:opacity-50 transition-all"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="space-y-6">
          <div className="bg-[#FBFBFB] border border-zinc-100 p-12 flex items-center justify-center aspect-square overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="flex flex-col space-y-10">
          <div className="space-y-4">
            <p className="text-red-600 text-[11px] font-black uppercase tracking-[0.4em]">{product.category}</p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">{product.name}</h1>
            <p className="text-4xl font-black tracking-tighter text-black">{product.price}</p>
            
            {/* RESTORED INVENTORY LEVEL */}
            <div className="flex items-center gap-2 text-green-600 pt-2">
              <Box size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">In Stock: {stockCount}</span>
            </div>
          </div>

          <div className="space-y-4 border-t border-zinc-100 pt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Product Description</p>
            <p className="text-sm leading-relaxed text-zinc-600 max-w-lg">
              Experience the premium craftsmanship of the {product.name}. Curated for the Efoy Gebya collection, this item combines modern aesthetics with everyday functionality.
            </p>
          </div>

          {/* STATIC INFO (Sizes & Colors) */}
          <div className="grid grid-cols-2 gap-6 text-[11px] font-black uppercase tracking-widest border-y border-zinc-100 py-6">
            <div>
              <p className="text-zinc-400 mb-2">Sizes Available</p>
              <div className="flex gap-2 flex-wrap">
                {availableSizes.map(s => <span key={s} className="bg-zinc-100 px-3 py-1.5">{s}</span>)}
              </div>
            </div>
            <div>
              <p className="text-zinc-400 mb-2">Colors Available</p>
              <div className="flex gap-2 flex-wrap">
                {availableColors.map(c => <span key={c} className="bg-zinc-100 px-3 py-1.5">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <Button 
              onClick={() => setShowCheckout(true)} 
              className="w-full bg-black text-white py-9 rounded-none text-[12px] font-black uppercase tracking-[0.4em] h-auto hover:bg-zinc-800 transition-all"
            >
              Buy Now
            </Button>
            <Button 
              onClick={() => navigate('/cart')}
              variant="outline"
              className="w-full border-black text-black py-9 rounded-none text-[12px] font-black uppercase tracking-[0.4em] h-auto"
            >
              Add to Shopping Bag
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL: CHECKOUT */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative my-auto animate-in zoom-in duration-300">
            <button onClick={() => setShowCheckout(false)} className="absolute top-8 right-8 text-zinc-400 hover:text-black">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black uppercase text-center mb-8 tracking-tighter">Confirm Purchase</h2>
            
            <div className="space-y-5">
              <div className="relative">
                <button 
                  onClick={() => {setIsSizeOpen(!isSizeOpen); setIsColorOpen(false);}} 
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl flex justify-between items-center text-[11px] font-black uppercase"
                >
                  {selectedSize || "Choose Size"}
                  <ChevronDown size={14} className={isSizeOpen ? 'rotate-180 transition-all' : ''} />
                </button>
                {isSizeOpen && (
                  <div className="absolute w-full mt-2 bg-white border z-[110] rounded-xl shadow-xl overflow-hidden">
                    {availableSizes.map(s => (
                      <div key={s} onClick={() => { setSelectedSize(s); setIsSizeOpen(false); }} className="p-3 hover:bg-zinc-100 cursor-pointer text-[10px] font-bold uppercase">{s}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => {setIsColorOpen(!isColorOpen); setIsSizeOpen(false);}} 
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl flex justify-between items-center text-[11px] font-black uppercase"
                >
                  {selectedColor || "Choose Color"}
                  <ChevronDown size={14} className={isColorOpen ? 'rotate-180 transition-all' : ''} />
                </button>
                {isColorOpen && (
                  <div className="absolute w-full mt-2 bg-white border z-[110] rounded-xl shadow-xl overflow-hidden">
                    {availableColors.map(c => (
                      <div key={c} onClick={() => { setSelectedColor(c); setIsColorOpen(false); }} className="p-3 hover:bg-zinc-100 cursor-pointer text-[10px] font-bold uppercase">{c}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Delivery Address</p>
                <div 
                  onClick={() => setShowAddressForm(true)}
                  className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl flex justify-between items-center cursor-pointer hover:bg-zinc-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-zinc-400" />
                    <span className="text-[11px] font-black uppercase">{selectedLocation}</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400" />
                </div>
              </div>

              <div onClick={() => setIsUrgent(!isUrgent)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${isUrgent ? 'border-red-500 bg-red-50' : 'border-zinc-100 bg-zinc-50'}`}>
                <div className="flex items-center gap-3">
                  <Truck size={18} className={isUrgent ? 'text-red-600' : 'text-zinc-400'} />
                  <span className="text-[10px] font-black uppercase">Urgent Delivery (+$5.00)</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isUrgent ? 'bg-red-500' : 'bg-zinc-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isUrgent ? 'left-6' : 'left-1'}`} />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Amount</p>
                <div className="flex items-center border border-zinc-100 rounded-xl overflow-hidden h-14">
                  <button onClick={() => setAmount(Math.max(1, amount - 1))} className="w-20 bg-zinc-50 font-bold hover:bg-zinc-100 transition-colors">-</button>
                  <div className="flex-1 text-center font-black text-sm">{amount}</div>
                  <button onClick={() => amount < stockCount && setAmount(amount + 1)} className="w-20 bg-zinc-50 font-bold hover:bg-zinc-100 transition-colors">+</button>
                </div>
              </div>

              <div className="p-8 bg-zinc-50 rounded-[30px] text-center">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Total Payment</p>
                <span className="text-3xl font-black text-black">${totalPrice}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                <Button className="w-full bg-[#FF0000] hover:bg-red-700 text-white py-8 rounded-[20px] font-black uppercase tracking-[0.2em] h-auto text-[11px]">Pay with Telebirr</Button>
                <Button className="w-full bg-black hover:bg-zinc-800 text-white py-8 rounded-[20px] font-black uppercase tracking-[0.2em] h-auto text-[11px]">Pay with Chapa</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL: ADDRESS FORM */}
      {showAddressForm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b flex items-center justify-between">
              <button onClick={() => setShowAddressForm(false)}><ArrowLeft size={20}/></button>
              <div className="text-center">
                <h3 className="text-sm font-bold">Add New Address</h3>
                <p className="text-[9px] text-green-600 font-medium">All information is encrypted</p>
              </div>
              <HelpCircle size={20} className="text-zinc-300"/>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
                <input type="text" placeholder="Contact name*" className="w-full p-4 border rounded-xl bg-zinc-50 text-xs outline-none focus:border-black" />
                <input type="text" placeholder="Mobile number*" className="w-full p-4 border rounded-xl bg-zinc-50 text-xs outline-none focus:border-black" />
                <input type="text" placeholder="Street, house/apartment/unit*" className="w-full p-4 border rounded-xl bg-zinc-50 text-xs outline-none" />
                
                {/* COUNTRY POSITIONED ABOVE CITY */}
                <select className="w-full p-4 border rounded-xl bg-zinc-50 text-xs outline-none focus:border-black appearance-none">
                  <option value="">Select Country*</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <input type="text" placeholder="City*" className="w-full p-4 border rounded-xl bg-zinc-50 text-xs outline-none" />
                
                <Button 
                    onClick={() => {setSelectedLocation("Adama, Ethiopia"); setShowAddressForm(false);}} 
                    className="w-full bg-[#E31E24] hover:bg-red-700 text-white py-7 rounded-full font-bold uppercase text-[11px]"
                >
                    Save Address
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;