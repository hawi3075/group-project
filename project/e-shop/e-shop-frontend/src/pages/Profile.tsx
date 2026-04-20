import  { useState, useEffect } from 'react';
import { User, Package, Mail, Clock, CheckCircle, Truck, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const orders = [
    { id: '#8842', date: 'April 10, 2026', total: '2,400 ETB', status: 'Delivered', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle size={14} /> },
    { id: '#8791', date: 'April 02, 2026', total: '1,150 ETB', status: 'Shipped', color: 'bg-blue-50 text-blue-700 border-blue-100', icon: <Truck size={14} /> },
    { id: '#8655', date: 'March 25, 2026', total: '4,500 ETB', status: 'Processing', color: 'bg-amber-50 text-amber-700 border-amber-100', icon: <Clock size={14} /> },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Section with Profile Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <User size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{user?.name || 'Guest User'}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Mail size={14} /> {user?.email}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 text-sm border-l pl-4 border-slate-200">
                  <MapPin size={14} /> Adama, Ethiopia
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-100 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Dashboard Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-slate-900 font-bold mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-500">Total Spent</span>
                  <span className="font-bold text-slate-900">8,050 ETB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm text-slate-500">Member Since</span>
                  <span className="font-bold text-slate-900">2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Order Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Recent Orders</h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="p-4 text-sm font-semibold text-slate-900">{order.id}</td>
                        <td className="p-4 text-sm text-slate-500">{order.date}</td>
                        <td className="p-4 text-sm font-bold text-slate-900">{order.total}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${order.color}`}>
                            {order.icon} {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;