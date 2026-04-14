import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add your manual navigation or logic here
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#F9F9F9] flex flex-col items-center justify-center py-10 font-sans">
      <div className="bg-white w-full max-w-[420px] p-10 rounded-2xl shadow-sm border border-zinc-100 flex flex-col items-center">
        
        {/* Branding */}
        <div className="text-red-600 mb-6">
           <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>

        <h1 className="text-3xl font-[900] text-black mb-10 tracking-tight text-center">Join Efoy Gebya</h1>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">First Name</label>
              <input 
                type="text" name="firstName" required placeholder="John" 
                value={formData.firstName} onChange={handleChange}
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-zinc-200 text-black transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1">Last Name</label>
              <input 
                type="text" name="lastName" required placeholder="Doe" 
                value={formData.lastName} onChange={handleChange}
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-zinc-200 text-black transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" name="email" required placeholder="name@domain.com" 
              value={formData.email} onChange={handleChange}
              className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-zinc-200 text-black transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} name="password" required 
                placeholder="••••••••" value={formData.password} onChange={handleChange}
                className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium pr-10 focus:ring-2 focus:ring-zinc-200 text-black transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} name="confirmPassword" required 
              placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange}
              className="w-full bg-[#E8F0FE] border-none h-12 px-4 rounded-xl text-sm font-medium focus:ring-2 focus:ring-zinc-200 text-black transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-zinc-900 hover:bg-black text-white font-black uppercase tracking-[0.2em] text-[11px] h-14 rounded-xl mt-4 transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
          >
            Create Account
          </button>
        </form>

        <button onClick={() => navigate('/login')} className="mt-8 text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;