import { useState } from 'react';
import { EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios'; 

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // ✅ REMOVED the auto-redirect useEffect that was causing the issue!

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sending credentials to the backend
      const response = await API.post('/auth/login', { email, password });
      
      // Matches the Swagger Response: response.data.data
      const authData = response.data.data; 

      if (authData && authData.accessToken) {
        // Saving the correct keys from your Swagger UI
        localStorage.setItem('token', authData.accessToken);
        localStorage.setItem('user', JSON.stringify({
          id: authData.id,
          email: authData.email,
          role: authData.role
        }));
        
        // Success feedback
        alert("Login Successful!");
        
        // ✅ FIXED: Use /admin instead of /admin/overview to match your App.tsx routes
        if (authData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products'); 
        }
      } else {
        setError("Invalid response format from server.");
      }
    } catch (err: any) {
      // Handles the 401 Unauthorized error in your console
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      // Stops the loading spinner so the page isn't stuck
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#F9F9F9] flex flex-col items-center justify-center py-10 font-sans">
      <div className="bg-white w-full max-w-[420px] p-10 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center">
        
        <div className="text-red-600 mb-6">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-[900] text-black mb-10 text-center tracking-tight">
          Login to Efoy Gebya
        </h1>

        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="w-full mb-6 p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-lg text-center border border-red-100">
            {error}
          </div>
        )}
        
        <form className="w-full space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-[0.15em] text-black ml-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium text-black" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-[0.15em] text-black ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium pr-10 text-black" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-zinc-900 hover:bg-black text-white font-[800] uppercase tracking-[0.2em] text-[11px] h-14 rounded-xl mt-4 flex items-center justify-center transition-colors"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Login'}
          </button>
        </form>

        <Link to="/register" className="mt-10 text-[10px] font-[900] uppercase tracking-widest text-red-600 hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;