import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeOff, Eye, Loader2, ShoppingCart } from 'lucide-react';
import API from '../api/axios';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', // Matches Swagger camelCase requirement
    lastName: '',  // Matches Swagger camelCase requirement
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/register', formData);
      
      // Based on your previous success responses
      if (response.data.success || response.status === 201) {
        alert("Account Created Successfully!");
        navigate('/login'); 
      }
    } catch (err: any) {
      // Captures the 400 Bad Request error shown in your console
      setError(err.response?.data?.message || 'Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center py-10 font-sans">
      <div className="bg-white w-full max-w-[450px] p-10 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center">
        
        {/* Original Icon Style */}
        <div className="text-red-600 mb-6">
          <ShoppingCart size={42} fill="currentColor" />
        </div>
        
        <h1 className="text-3xl font-[900] text-black mb-10 text-center tracking-tight">
          Join Efoy Gebya
        </h1>

        {error && (
          <div className="w-full mb-6 p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-lg text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="w-full space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-[800] uppercase tracking-widest text-black ml-1">First Name</label>
              <input 
                placeholder="Hawi" 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium text-black" 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-[800] uppercase tracking-widest text-black ml-1">Last Name</label>
              <input 
                placeholder="Girma" 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium text-black" 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-widest text-black ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="example@gmail.com"
              className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium text-black" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-widest text-black ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium pr-10 text-black" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
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

          <div className="space-y-2">
            <label className="text-[10px] font-[800] uppercase tracking-widest text-black ml-1">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium pr-10 text-black" 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showConfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-black hover:bg-zinc-800 text-white font-[800] uppercase tracking-[0.2em] text-[11px] h-14 rounded-xl mt-4 flex items-center justify-center transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
          </button>
        </form>

        <Link to="/login" className="mt-10 text-[10px] font-[900] uppercase tracking-widest text-red-600 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;