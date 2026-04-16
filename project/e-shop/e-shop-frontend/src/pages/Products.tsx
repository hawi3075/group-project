import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search,  Maximize2, ArrowLeft } from 'lucide-react';
import ProductSidebar from '../components/ecommerce/ProductSidebar';
// Importing global data to ensure consistent IDs and redirection
import { PRODUCTS } from '@/lib/mock-data'; 

// 1. Defined the Product Interface to match mock data structure
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  isRecommended?: boolean; 
  salesCount?: number;     
}

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Filtering Logic: Syncs with search and explicitly removes "Furniture"
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      // Remove Furniture category as requested
      if (product.category.toLowerCase() === 'furniture') return false;

      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                            product.category.toLowerCase().includes(searchLower);

      if (activeCategory === 'All Products') return matchesSearch;
      if (activeCategory === 'Recommended') return !!product.isRecommended && matchesSearch;
      if (activeCategory === 'Top Seller') return (product.salesCount || 0) > 100 && matchesSearch;

      return product.category.toLowerCase() === activeCategory.toLowerCase() && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans text-black overflow-x-hidden flex flex-col">
      {/* Hero Header */}
      <div className="relative w-full h-[45vh] bg-zinc-950 overflow-hidden">
        <img src="/shop.jpg" alt="Shop Header" className="w-full h-full object-cover opacity-70 scale-105" />
        
        {/* BACK ICON - TOP LEFT SIDE */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 z-30 bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-16 gap-x-10">
            {filteredProducts.map((product: Product) => (
              <div key={product.id} className="group flex flex-col animate-in fade-in zoom-in-95 duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-[2.5rem] mb-6 border border-zinc-100 p-8 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                  <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-all duration-700" alt={product.name} />
                  
                  {/* DETAIL ICON - Navigates to correct dynamic route */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                    <button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-black text-white p-4 shadow-2xl hover:bg-red-600 transition-colors"
                    >
                      <Maximize2 size={20} />
                    </button>
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

      <div className="w-full px-12 py-8 flex justify-between items-center border-t border-zinc-100 bg-white mt-auto">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase">EFOY GEBYA</span>
        <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400">2026</span>
      </div>
    </div>
  );
};

export default Products;