import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const { login, register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const result = await login({ email: formData.email, password: formData.password });
      if (result.success) navigate("/");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      if (result.success) navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f3] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6">
        {/* Logo & Tagline */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-red-500 p-2 rounded-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? "Efoy Gebya" : "Efoy Gebya"}
            </h1>
          </div>
          <p className="text-sm text-gray-500">Speed meets smart shopping.</p>
        </div>

        {/* Login/Signup Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setIsLogin(true); clearError(); }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
              isLogin ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Login
            {isLogin && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => { setIsLogin(false); clearError(); }}
            className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
              !isLogin ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Sign Up
            {!isLogin && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  First Name
                </label>
                <div className="relative">
                  <Input
                    name="firstName"
                    placeholder="e.g. Julian"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-100 border-0 focus:ring-2 focus:ring-red-500 rounded-lg h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Last Name
                </label>
                <div className="relative">
                  <Input
                    name="lastName"
                    placeholder="e.g. Voss"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-100 border-0 focus:ring-2 focus:ring-red-500 rounded-lg h-11"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="customer@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-gray-100 border-0 focus:ring-2 focus:ring-red-500 rounded-lg h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  className="text-xs font-semibold text-red-500 hover:text-red-600 uppercase tracking-wide"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10 bg-gray-100 border-0 focus:ring-2 focus:ring-red-500 rounded-lg h-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-gray-100 border-0 focus:ring-2 focus:ring-red-500 rounded-lg h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold bg-gray-900 hover:bg-gray-800 rounded-full mt-6"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-6">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
        </div>

        {/* Continue as Guest (Login only) */}
        {isLogin && (
          <div className="text-center">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 hover:text-gray-700 uppercase tracking-wide"
            >
              CONTINUE AS GUEST
            </Link>
          </div>
        )}

        {/* Exclusive Access Banner */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Exclusive Access</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Join for bespoke recommendations and early access to curated collections.
            </p>
          </div>
        </div>

        {/* Switch Auth Mode */}
        <div className="text-center pt-2">
          <button
            onClick={() => { setIsLogin(!isLogin); clearError(); }}
            className="text-xs font-semibold text-red-500 hover:text-red-600 uppercase tracking-wide"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;