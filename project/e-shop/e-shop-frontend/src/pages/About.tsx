import { ShieldCheck, Zap, Check } from 'lucide-react'; // Removed 'Globe' to fix the error

const About = () => {
  return (
    <div className="w-full bg-white font-sans text-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900 mt-[72px]">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Retail" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-[900] text-white tracking-tighter mb-4 uppercase">
            Efoy Gebya
          </h1>
          <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em]">
            Defining the Future of Premium Commerce
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto py-20 px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=2070" 
              alt="Premium Quality" 
              className="rounded-2xl shadow-2xl object-cover h-[400px] w-full grayscale"
            />
            <div className="absolute -bottom-6 -left-6 bg-black p-8 rounded-xl hidden md:block border border-zinc-800 shadow-2xl">
              <p className="text-white font-[900] text-4xl tracking-tighter">100%</p>
              <p className="text-white/50 text-[8px] font-black uppercase tracking-widest">Authentic Curation</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">
              Our Vision
            </span>
            <h2 className="text-3xl font-[900] tracking-tight mb-6 leading-none uppercase">
              Where Elegance Meets <br />Seamless Accessibility.
            </h2>
            <p className="text-zinc-500 text-xs leading-relaxed font-bold tracking-wide">
              Efoy Gebya was founded on the principle that high-end shopping should be more than a transaction—it should be an experience. We curate a selection of world-class products, ensuring each item meets our rigorous standards of quality and design.
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed font-bold tracking-wide">
              By blending modern technology with a "console-inspired" digital interface, we provide a platform that is as beautiful to look at as it is easy to use.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[#F9F9F9] py-24 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
              Core Values
            </h3>
            <h2 className="text-2xl font-[900] uppercase tracking-tighter">The Foundation of AuraSync</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Precision", icon: <Zap size={20}/>, desc: "Every detail of our platform is engineered for a premium feel and zero-latency browsing." },
              { title: "Curation", icon: <Check size={20}/>, desc: "We only list products that define modern excellence and meet 100% authenticity standards." },
              { title: "Trust", icon: <ShieldCheck size={20}/>, desc: "Military-grade encryption protecting every transaction within our secure elite ecosystem." }
            ].map((item, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6 text-black">{item.icon}</div>
                <h4 className="font-[900] text-sm tracking-widest uppercase mb-4">{item.title}</h4>
                <p className="text-zinc-500 text-[10px] font-bold leading-loose tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Officer Message */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 relative">
          <div className="max-w-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-10">Officer's Note</h3>
            <blockquote className="text-3xl md:text-4xl font-[900] tracking-tighter leading-tight uppercase mb-10">
              "We didn't just build a shop. We built a digital sanctuary for those who value 
              <span className="text-zinc-300"> quality over quantity </span> 
              and design over noise."
            </blockquote>
            <div className="flex items-center gap-4">
              {/* Updated Profile Image: Female Professional */}
              <div className="w-12 h-12 bg-zinc-100 rounded-full overflow-hidden grayscale border border-zinc-200 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                  alt="Hawi Girma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-[900] uppercase text-xs tracking-widest">Hawi Girma</p>
                <p className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">Chief Officer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="h-[400px] relative">
        <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover grayscale opacity-80" 
            alt="HQ"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
                <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.5em] mb-3">Operations Hub</p>
                <h2 className="text-white text-3xl font-[900] uppercase tracking-tighter">Adama, Ethiopia</h2>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;