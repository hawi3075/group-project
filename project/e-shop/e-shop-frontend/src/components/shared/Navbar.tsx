import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Globe } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Left Side: Brand */}
        <Link to="/" className="text-lg font-black tracking-tighter uppercase">
          EFOY GEBYA
        </Link>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-zinc-500">Home</Link>
          <Link to="/products" className="text-[10px] font-bold uppercase tracking-widest hover:text-zinc-500">Shop</Link>
          <Link to="/about" className="text-[10px] font-bold uppercase tracking-widest hover:text-zinc-500">About</Link>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase">
            <Search className="h-4 w-4" /> <span className="hidden sm:inline">Search</span>
          </button>
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase">
            <Globe className="h-4 w-4" /> <span>EN</span>
          </button>
          <Link to="/login" className="text-[10px] font-bold uppercase hover:underline">Log In</Link>
          <Link to="/register" className="text-[10px] font-bold uppercase hover:underline">Sign Up</Link>
          <Link to="/cart">
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;