import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, LayoutGrid, List, X, CreditCard, ShoppingCart } from 'lucide-react';
import ProductSidebar from '../components/ecommerce/ProductSidebar';

// 1. Define the Product Interface
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  isRecommended: boolean;
  salesCount: number;
}

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showBuyForm, setShowBuyForm] = useState(false);
  
  // Updated state to include customColor for the "Other" option
  const [formData, setFormData] = useState({ 
    color: 'Standard Black', 
    customColor: '', // New field for specific color input
    size: '',        // Changed to empty string for manual entry
    amount: 1, 
    payment: 'Telebirr' 
  });

  const categoryList = [
    'Clothing', 'Shoes', 'Home Materials', 'Beauty', 
    'Electronics', 'Furniture', 'Accessories', 'Fashion'
  ];

  const allProducts: Product[] = [
    { id: 1, name: "Premium Wireless Headphones", price: "$299.00", category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000", isRecommended: true, salesCount: 50 },
    { id: 2, name: "Luxury Minimalist Watch", price: "$150.00", category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000", isRecommended: false, salesCount: 120 },
    { id: 3, name: "Pro Gaming Console", price: "$450.00", category: "Electronics", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=1000", isRecommended: true, salesCount: 200 },
    { id: 4, name: "Ergonomic Desk Chair", price: "$599.00", category: "Furniture", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=1000", isRecommended: false, salesCount: 30 },
    { id: 5, name: "Designer Leather Bag", price: "$1,200.00", category: "Fashion", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000", isRecommended: true, salesCount: 10 },
    { id: 6, name: "Sports Running Shoes", price: "$120.00", category: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000", isRecommended: true, salesCount: 300 },
  ];

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const foundCategory = categoryList.find(cat => cat.toLowerCase() === query);
    if (foundCategory) {
      setActiveCategory(foundCategory);
    }
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                            product.category.toLowerCase().includes(searchLower);

      if (activeCategory === 'All Products') return matchesSearch;
      if (activeCategory === 'Recommended') return product.isRecommended && matchesSearch;
      if (activeCategory === 'Top Seller') return product.salesCount > 100 && matchesSearch;

      return product.category.toLowerCase() === activeCategory.toLowerCase() && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product.name); 
    setSelectedProduct(null);
    navigate('/cart');
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setShowBuyForm(false);
    setFormData({ color: 'Standard Black', customColor: '', size: '', amount: 1, payment: 'Telebirr' });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-black overflow-x-hidden flex flex-col">
      {/* Hero Header */}
      <div className="relative w-full h-[45vh] bg-zinc-950 overflow-hidden">
        <img src="/shop.jpg" alt="Shop Header" className="w-full h-full object-cover opacity-70 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-center w-full px-8 z-10">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
              {activeCategory}
            </h1>
            <div className="h-1.5 w-24 bg-red-600 mx-auto mt-6" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-12 flex-grow">
        <div className="w-full lg:w-72 shrink-0 h-fit sticky top-32">
          {/* FIX: onCategoryChange used here to match SidebarProps requirements */}
          <ProductSidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="relative w-full md:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="FIND ITEM OR CATEGORY..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-200 py-4 pl-14 pr-6 rounded-full text-[10px] font-bold tracking-widest outline-none shadow-sm focus:border-black transition-all" 
              />
            </div>
            <div className="flex items-center gap-3 p-1.5 bg-zinc-100 rounded-full text-zinc-400">
              <button className="p-3 bg-white text-black rounded-full shadow-md"><LayoutGrid size={18}/></button>
              <button className="p-3"><List size={18}/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-16 gap-x-10">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group flex flex-col animate-in fade-in zoom-in-95 duration-300 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-[2.5rem] mb-6 border border-zinc-100 p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                  <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-all duration-700" alt={product.name} />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="bg-white text-[10px] font-black tracking-widest px-6 py-3 rounded-full shadow-xl">VIEW OPTIONS</span>
                  </div>
                </div>
                <div className="text-center px-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600 mb-2">{product.category}</p>
                  <h2 className="text-sm font-black tracking-tight uppercase mb-2 leading-tight h-10 line-clamp-2 italic">{product.name}</h2>
                  <div className="h-[1px] w-8 bg-zinc-200 mx-auto mb-3"></div>
                  <p className="text-xl font-black tracking-tighter text-zinc-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODAL SECTION */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModals} />
          
          <div className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <button onClick={closeModals} className="absolute top-8 right-8 text-zinc-400 hover:text-black transition-colors z-10">
              <X size={24} />
            </button>

            <div className="p-10 text-center">
              {!showBuyForm ? (
                /* PREVIEW SECTION */
                <div className="space-y-6 pt-6">
                  <div className="w-24 h-24 mx-auto mb-6">
                    <img src={selectedProduct.image} className="w-full h-full object-contain" alt="" />
                  </div>
                  <h3 className="text-lg font-black uppercase italic tracking-tighter">{selectedProduct.name}</h3>
                  
                  {/* Color dots for preview */}
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="w-4 h-4 rounded-full bg-red-600 border border-zinc-200" title="Red" />
                    <div className="w-4 h-4 rounded-full bg-yellow-400 border border-zinc-200" title="Yellow" />
                    <div className="w-4 h-4 rounded-full bg-green-600 border border-zinc-200" title="Green" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex items-center justify-center gap-3 w-full bg-zinc-100 hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all"
                    >
                      <ShoppingCart size={16} /> ADD TO CART
                    </button>
                    <button 
                      onClick={() => setShowBuyForm(true)}
                      className="flex items-center justify-center gap-3 w-full bg-black hover:bg-red-600 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all shadow-lg"
                    >
                      <ShoppingBag size={16} /> BUY IT NOW
                    </button>
                  </div>
                </div>
              ) : (
                /* CHECKOUT SECTION */
                <div className="space-y-6 pt-6 text-left">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-center mb-8">Checkout Details</h3>
                  <div className="space-y-4">
                    
                    {/* Size Selector - Changed to Optional Text Input for flexibility */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Size (Optional)</label>
                      <input 
                        type="text"
                        placeholder="e.g. XL, 42, 15-inch"
                        className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-xl text-xs font-bold outline-none mt-1"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                      />
                    </div>

                    {/* Color Selector with "Other" Insert Line */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Select Color</label>
                      <select 
                        value={formData.color}
                        onChange={(e) => setFormData({...formData, color: e.target.value})}
                        className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-xl text-xs font-bold outline-none mt-1"
                      >
                        <option value="Standard Black">Standard Black</option>
                        <option value="Other">Other (Specify Below)</option>
                      </select>

                      {formData.color === 'Other' && (
                        <input 
                          type="text"
                          placeholder="Type color (e.g. Red, Yellow, Green)"
                          className="w-full bg-white border-2 border-red-500 p-4 rounded-xl text-xs font-bold outline-none mt-2 animate-in slide-in-from-top-1"
                          value={formData.customColor}
                          onChange={(e) => setFormData({...formData, customColor: e.target.value})}
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Amount</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
                        className="w-full bg-zinc-50 border border-zinc-100 p-4 rounded-xl text-xs font-bold outline-none mt-1" 
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-2">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button 
                          onClick={() => setFormData({...formData, payment: 'Telebirr'})}
                          className={`flex items-center gap-2 p-4 border-2 rounded-xl text-[10px] font-black uppercase transition-all ${formData.payment === 'Telebirr' ? 'border-black' : 'border-zinc-100 text-zinc-400'}`}
                        >
                          <CreditCard size={14}/> Telebirr
                        </button>
                        <button 
                          onClick={() => setFormData({...formData, payment: 'CBE Birr'})}
                          className={`flex items-center gap-2 p-4 border-2 rounded-xl text-[10px] font-black uppercase transition-all ${formData.payment === 'CBE Birr' ? 'border-black text-black' : 'border-zinc-100 text-zinc-400'}`}
                        >
                          CBE Birr
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { alert('Order Placed!'); closeModals(); }}
                    className="w-full bg-red-600 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all shadow-xl mt-8 hover:bg-red-700"
                  >
                    CONFIRM ORDER
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="w-full px-12 py-8 flex justify-between items-center border-t border-zinc-100 bg-white mt-auto">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase">EFOY GEBYA</span>
        <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400">2026</span>
      </div>
    </div>
  );
};

export default Products;