import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Flame, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProductSidebar = ({ activeCategory, onCategoryChange }: SidebarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Updated categories list: Furniture removed, Fashion/Accessories added
  const categories = [
    { name: 'All Products' },
    { name: 'Clothing', hasSub: true },
    { name: 'Shoes', hasSub: true },
    { name: 'Home Materials' },
    { name: 'Beauty' },
    { name: 'Electronics' },
    { name: 'Fashion' },
    { name: 'Accessories' }
  ];

  return (
    <aside className="w-full md:w-72 shrink-0 h-fit sticky top-32">
      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 space-y-10 shadow-sm">
        
        {/* Category Section */}
        <div>
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between mb-8 group"
          >
            <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black">Category</h3>
            <div className="p-1 rounded-md bg-zinc-50 group-hover:bg-zinc-100 transition-colors">
              {isCategoryOpen ? <ChevronUp size={14} className="text-red-600" /> : <ChevronDown size={14} />}
            </div>
          </button>
          
          {isCategoryOpen && (
            <ul className="space-y-5">
              {categories.map((cat) => (
                <li key={cat.name} className="flex flex-col gap-3">
                  <div 
                    onClick={() => onCategoryChange(cat.name)}
                    className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                      activeCategory === cat.name ? 'text-red-600' : 'text-zinc-400 hover:text-black hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        activeCategory === cat.name ? 'bg-red-600 scale-125 shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'bg-transparent border border-zinc-200'
                      }`} />
                      {cat.name}
                    </div>
                    {cat.hasSub && <ChevronRight size={12} className={activeCategory === cat.name ? 'rotate-90 text-red-600' : ''} />}
                  </div>

                  {/* Sub-categories for Clothing/Shoes */}
                  {cat.hasSub && activeCategory === cat.name && (
                    <ul className="pl-8 space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                      {['Men', 'Women', 'Children'].map((sub) => (
                        <li key={sub} className="text-[9px] font-black text-zinc-400 hover:text-black cursor-pointer flex items-center gap-2 group">
                          <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recommended Navigation */}
        <div 
          onClick={() => onCategoryChange('Recommended')}
          className={`pt-8 border-t border-zinc-50 cursor-pointer group transition-all ${
            activeCategory === 'Recommended' ? 'translate-x-2' : ''
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className={activeCategory === 'Recommended' ? 'fill-red-600 text-red-600' : 'text-yellow-500 fill-yellow-500'} />
            <h3 className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === 'Recommended' ? 'text-red-600' : ''}`}>
              Recommended
            </h3>
          </div>
          <p className="text-[9px] text-zinc-400 font-bold leading-relaxed tracking-wider italic">
            "PREMIUM SELECTION BASED ON YOUR RECENT VIEWS."
          </p>
        </div>

        {/* Top Seller Navigation */}
        <div 
          onClick={() => onCategoryChange('Top Seller')}
          className={`pt-8 border-t border-zinc-50 cursor-pointer group transition-all ${
            activeCategory === 'Top Seller' ? 'translate-x-2' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <Flame size={14} className={activeCategory === 'Top Seller' ? 'text-red-600' : 'text-orange-500'} />
            <h3 className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === 'Top Seller' ? 'text-red-600' : ''}`}>
              Top Seller
            </h3>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;