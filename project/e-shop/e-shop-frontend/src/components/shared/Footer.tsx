import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#F5F5F5] text-black pt-20 pb-10 mt-auto border-t border-zinc-200">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Newsletter Section - Clean White Input */}
          <div className="md:col-span-1 space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em]">
              Join Our List
            </h4>
            <div className="flex bg-white p-1 border border-zinc-300">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-transparent border-none text-[10px] p-3 w-full focus:outline-none uppercase tracking-widest text-black placeholder:text-zinc-400"
              />
              <button className="bg-black text-white text-[10px] font-bold px-6 py-2 uppercase hover:bg-zinc-800 transition-colors">
                Join
              </button>
            </div>
          </div>

          <div className="hidden md:block"></div>

          {/* Support Links - Muted hover effects */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Support
            </h4>
            <ul className="text-[10px] space-y-3 uppercase tracking-[0.15em] font-bold">
              <li><Link to="/shipping" className="hover:text-zinc-500">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-zinc-500">Contact Us</Link></li>
              <li><Link to="/guide" className="hover:text-zinc-500">Size Guide</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Company
            </h4>
            <ul className="text-[10px] space-y-3 uppercase tracking-[0.15em] font-bold">
              <li><Link to="/story" className="hover:text-zinc-500">Our Story</Link></li>
              <li><Link to="/privacy" className="hover:text-zinc-500">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-zinc-500">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black uppercase tracking-tighter">EFOY GEBYA</span>
          <p className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-medium">
            © 2026 EFOY GEBYA INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;