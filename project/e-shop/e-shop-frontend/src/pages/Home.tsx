import { ArrowRight, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, CATEGORIES } from '@/lib/mock-data';

const Home = () => {
  return (
    <div className="flex flex-col gap-20 pb-0 bg-white font-sans">
      {/* --- PREMIUM HEADER SECTION --- */}
      <section className="w-full bg-[#F5F5F5] py-8 border-b border-zinc-100">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-8 gap-8">
          <div className="space-y-6">
            <h1 className="text-6xl font-black leading-[0.95] tracking-tighter uppercase text-black">
              Shop From <br /> Efoy Gebya <br /> Collection
            </h1>
            <p className="text-2xl font-medium tracking-tight text-zinc-900">$33.00</p>
            <Button className="bg-black text-white px-10 py-6 rounded-none hover:bg-zinc-800 transition-all text-[10px] font-bold uppercase tracking-[0.3em] h-auto">
              Shop Collection
            </Button>
          </div>
          <div className="relative h-[400px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Bag" 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </div>
        </div>
      </section>

      {/* --- RECOMMENDATIONS WITH RATINGS --- */}
      <section className="container mx-auto px-8">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Recommended For You</h2>
            <div className="h-1 w-10 bg-black"></div>
          </div>
          <button className="text-[10px] uppercase border-b-2 border-black pb-1 flex items-center gap-2 font-black tracking-widest">
            See More <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {PRODUCTS.slice(0, 5).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="container mx-auto px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Shop by Category</h2>
          <button className="text-[10px] uppercase border-b-2 border-black pb-1 font-black">See All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="group cursor-pointer text-center">
              <div className="aspect-square bg-zinc-100 overflow-hidden mb-3 border border-zinc-200">
                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={cat.name} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCT ROWS WITH RATINGS --- */}
      <ProductRowSection title="Last Viewed" data={PRODUCTS.slice(5, 10)} />
      <ProductRowSection title="Top Sellers" data={PRODUCTS.slice(0, 5)} />

      {/* --- COMFY STYLE BANNERS (BOY & GIRL) --- */}
      <section className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <ComfyBanner 
          title="Comfy style for her.✨" 
          description="Shop from efoy gebya fashion including shoes, clothes, handbags and much more😊"
          img="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
        />
        <ComfyBanner 
          title="Comfy style for him.✨" 
          description="Shop from efoy gebya fashion including shoes, clothes, handbags and much more😊"
          img="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop"
        />
      </section>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ProductCard = ({ product }: { product: any }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/5] overflow-hidden bg-[#F9F9F9] mb-4 relative border border-zinc-100 p-3 flex items-center justify-center">
      <Star className="absolute top-3 right-3 h-3 w-3 fill-black text-black" />
      <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" alt={product.name} />
    </div>
    <div className="space-y-1 px-1">
      {/* Design matched: Stars and stock availability */}
      <div className="flex items-center gap-0.5 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={8} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-zinc-200 text-zinc-200"} />
        ))}
        <span className="text-[7px] text-zinc-400 ml-1 font-bold">19 left in stock</span>
      </div>
      <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest leading-none">{product.category}</p>
      <h3 className="text-[10px] font-bold uppercase truncate">{product.name}</h3>
      <p className="text-[11px] font-black text-black">{product.price}</p>
    </div>
  </div>
);

const ComfyBanner = ({ title, description, img }: { title: string, description: string, img: string }) => (
  <div className="bg-[#F8F8F8] p-10 flex flex-col md:flex-row items-center justify-between rounded-sm relative overflow-hidden group">
    <div className="w-full md:w-1/2 space-y-3 z-10">
      <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px]">{description}</p>
      <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest pt-5 group-hover:translate-x-1 transition-transform">
        Explore <ChevronRight className="h-3 w-3" />
      </button>
    </div>
    <div className="w-full md:w-1/2 mt-8 md:mt-0 relative h-[250px] flex justify-center items-center">
       <img src={img} className="max-h-full w-auto object-contain rounded-sm" alt="Style Category" />
    </div>
  </div>
);

const ProductRowSection = ({ title, data }: { title: string, data: any[] }) => (
  <section className="container mx-auto px-8">
    <div className="flex justify-between items-end mb-8">
      <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
      <button className="text-[10px] uppercase border-b-2 border-black pb-1 font-black">Shop All</button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default Home;