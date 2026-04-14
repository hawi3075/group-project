import { useState } from 'react';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // 1. Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Submit Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Replace URL with your friend's API endpoint (e.g., http://localhost:5000/api/login)
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/products'); // Redirect on success
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#F9F9F9] flex flex-col items-center justify-center py-10 font-sans">
      <div className="bg-white w-full max-w-[420px] p-10 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center z-10">
        
        <div className="text-red-600 mb-6">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-[900] text-black mb-10 tracking-tight text-center">
          Login to Efoy Gebya
        </h1>

        {/* 3. Error Message Display */}
        {error && (
          <div className="w-full mb-6 p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-lg text-center">
            {error}
          </div>
        )}
        
        <form className="w-full space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-[0.15em] text-black ml-1">
              Email Address
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com" 
              className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-200 text-black transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-[800] uppercase tracking-[0.15em] text-black">
                Password
              </label>
              <button type="button" className="text-[9px] font-black uppercase text-red-600 hover:underline tracking-tighter">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium placeholder:text-zinc-400 pr-10 focus:ring-2 focus:ring-zinc-200 text-black transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-black text-white font-[800] uppercase tracking-[0.2em] text-[11px] h-14 rounded-xl mt-4 transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Login'}
          </button>
        </form>

        <div className="w-full flex items-center my-8">
          <div className="flex-1 border-t border-zinc-100"></div>
          <span className="px-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 border-t border-zinc-100"></div>
        </div>

        <button type="button" className="w-full border border-zinc-200 bg-white hover:bg-zinc-50 flex items-center justify-center gap-3 h-12 rounded-xl transition-all text-[11px] font-bold text-black shadow-sm">
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google Logo" 
            className="w-5 h-5" 
          />
          Sign in with Google
        </button>

        <Link 
          to="/register" 
          className="mt-10 text-[10px] font-[900] uppercase tracking-widest text-red-600 hover:underline transition-all"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;