import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Activity, TrendingUp, Package, DollarSign, Edit2, Camera, LogOut } from 'lucide-react';

type AdminUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
};

export function AdminProfile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Load admin data from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdmin({
          id: user.id || 'admin-001',
          email: user.email || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          role: user.role || 'Admin',
          avatar: user.avatar,
        });
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveChanges = () => {
    if (admin) {
      const updatedAdmin = {
        ...admin,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      localStorage.setItem('user', JSON.stringify(updatedAdmin));
      setAdmin(updatedAdmin);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add your password change logic here
    alert('Password changed successfully!');
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  if (!admin) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900">
          ADMIN PROFILE
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-500">
          SYSTEM ADMINISTRATOR CREDENTIALS AND METRICS.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
                {getInitials(admin.email)}
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-50">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-zinc-900">
              {admin.firstName && admin.lastName 
                ? `${admin.firstName} ${admin.lastName}` 
                : 'Admin User'}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">{admin.email}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              {admin.role.toUpperCase()}
            </span>
          </div>

          {/* Account Info */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Account Status</span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Role</span>
              <span className="text-sm font-semibold text-zinc-900">{admin.role}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Joined</span>
              <span className="text-sm font-semibold text-zinc-900">N/A</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
            >
              <Edit2 className="h-4 w-4" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
              <p className="text-xs font-medium tracking-widest text-zinc-500">ACCESS LEVEL</p>
              <p className="mt-2 text-2xl font-black text-zinc-900">Full Access</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
              <p className="text-xs font-medium tracking-widest text-zinc-500">STATUS</p>
              <p className="mt-2 text-2xl font-black text-emerald-600">Active</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-6 shadow-sm border border-emerald-200">
              <p className="text-xs font-medium tracking-widest text-emerald-600">REVENUE HANDLED</p>
              <p className="mt-2 text-2xl font-black text-emerald-700">$0</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">PERFORMANCE METRICS</h3>
            <p className="text-xs text-zinc-500 mb-6">Lifetime statistics</p>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900">0</p>
                  <p className="text-xs text-zinc-500">ORDERS PROCESSED</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900">0</p>
                  <p className="text-xs text-zinc-500">PRODUCTS MANAGED</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-600">$0</p>
                  <p className="text-xs text-zinc-500">REVENUE HANDLED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information - Edit Mode */}
          {isEditing && (
            <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900 mb-6">PERSONAL INFORMATION</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                    placeholder="Enter first name"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      value={admin.email}
                      disabled
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 pl-11 text-sm text-zinc-500"
                    />
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">Email cannot be changed</p>
                </div>
              </div>

              <button
                onClick={handleSaveChanges}
                className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Change Password */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Change Password
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                  placeholder="Enter current password"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full rounded-lg border-2 border-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">RECENT ACTIVITY</h3>
            <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
              <Activity className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-sm">No recent activity to display</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminProfile;