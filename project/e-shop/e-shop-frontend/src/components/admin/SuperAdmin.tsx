// src/components/admin/SuperAdmin.tsx
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Users,
  Shield,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Save,
  Check,
  X
} from "lucide-react";

// ✅ TypeScript Types
type UserRole = "REGULAR" | "ADMIN" | "SUPER_ADMIN";
type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

type AdminUser = {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastLogin?: string;
};

type Stats = {
  totalUsers: number;
  adminUsers: number;
  superAdminUsers: number;
};

type FetchResponse = {
  users: AdminUser[];
  stats: Stats;
  pages: number;
  page: number;
};

// ✅ Mock API (Replace with your real adminAPI)
const adminAPI = {
  getUsers: async (query: string): Promise<FetchResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Mock data - replace with real fetch
    return {
      users: [
        { _id: "1", fullName: "Siham Birhanu", email: "siham@efoy.com", role: "SUPER_ADMIN", status: "ACTIVE", joined: "2024-01-15" },
        { _id: "2", fullName: "John Admin", email: "john@efoy.com", role: "ADMIN", status: "ACTIVE", joined: "2024-02-20" },
        { _id: "3", fullName: "Guest User", email: "guest@example.com", role: "REGULAR", status: "PENDING", joined: "2024-03-10" },
      ],
      stats: { totalUsers: 21, adminUsers: 3, superAdminUsers: 1 },
      pages: 3,
      page: 1
    };
  },
  updateUserRole: async (userId: string, newRole: UserRole): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Updated user ${userId} to role ${newRole}`);
  }
};

// ✅ Helper Functions
const getRoleLabel = (role?: UserRole): string => {
  switch (role) {
    case "SUPER_ADMIN": return "Super Admin";
    case "ADMIN": return "Admin";
    case "REGULAR": return "Regular";
    default: return "Unknown";
  }
};

const isSuperAdmin = (role?: UserRole): boolean => role === "SUPER_ADMIN";

const getRoleBadgeClass = (role: UserRole): string => {
  switch (role) {
    case "SUPER_ADMIN": return "bg-purple-50 text-purple-700 border-purple-200";
    case "ADMIN": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "REGULAR": return "bg-zinc-50 text-zinc-700 border-zinc-200";
    default: return "bg-zinc-50 text-zinc-700 border-zinc-200";
  }
};

const getStatusBadgeClass = (status: UserStatus): string => {
  switch (status) {
    case "ACTIVE": return "bg-emerald-50 text-emerald-700";
    case "SUSPENDED": return "bg-red-50 text-red-700";
    case "PENDING": return "bg-amber-50 text-amber-700";
    default: return "bg-zinc-50 text-zinc-700";
  }
};

const ROLE_OPTIONS: UserRole[] = ["REGULAR", "ADMIN", "SUPER_ADMIN"];

export function SuperAdmin() {
  // ✅ State
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | UserStatus>("ALL");
  const [pendingRoles, setPendingRoles] = useState<Record<string, UserRole>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ✅ Current user mock (replace with real auth)
  const currentUser = {
    _id: "1",
    email: "siham@efoy.com",
    role: "SUPER_ADMIN" as UserRole,
    fullName: "Siham Birhanu"
  };

  // ✅ Fetch users with debounce
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10"
      });
      
      if (search.trim()) params.set("search", search.trim());
      if (roleFilter !== "ALL") params.set("role", roleFilter);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      
      const res = await adminAPI.getUsers(params.toString());
      
      setUsers(res.users);
      setStats(res.stats);
      setTotalPages(res.pages);
      
      // Initialize pending roles
      setPendingRoles((prev) => {
        const next: Record<string, UserRole> = { ...prev };
        res.users.forEach((user) => {
          if (!next[user._id]) {
            next[user._id] = user.role;
          }
        });
        return next;
      });
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setErrorMsg("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter, statusFilter]);

  // ✅ Debounced fetch effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 350);
    
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  // ✅ Clear messages after 3 seconds
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(null);
        setErrorMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  // ✅ Stats cards data
  const summaryCards = useMemo(() => [
    { label: "TOTAL USERS", value: stats?.totalUsers || 0, icon: Users, color: "zinc" },
    { label: "ADMINS", value: stats?.adminUsers || 0, icon: Shield, color: "emerald" },
    { label: "SUPER ADMINS", value: stats?.superAdminUsers || 0, icon: Crown, color: "purple" }
  ], [stats]);

  // ✅ Handle role save
  const handleSaveRole = async (userId: string, currentRole: UserRole) => {
    const newRole = pendingRoles[userId];
    
    if (!newRole || newRole === currentRole) return;
    
    setSavingId(userId);
    setErrorMsg(null);
    
    try {
      await adminAPI.updateUserRole(userId, newRole);
      await fetchUsers(); // Refresh data
      setSuccessMsg(`Role updated to ${getRoleLabel(newRole)}`);
    } catch (err) {
      console.error("Role update failed:", err);
      setErrorMsg("Failed to update role. Please try again.");
      // Revert pending change
      setPendingRoles((prev) => ({ ...prev, [userId]: currentRole }));
    } finally {
      setSavingId(null);
    }
  };

  // ✅ Check if user can edit another user
  const canEditUser = (targetUser: AdminUser): boolean => {
    // Can't edit yourself
    if (targetUser._id === currentUser._id) return false;
    // Only super admins can edit roles
    return isSuperAdmin(currentUser.role);
  };

  // ✅ Loading skeleton
  if (loading && page === 1 && !search && roleFilter === "ALL" && statusFilter === "ALL") {
    return (
      <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            <p className="text-sm text-zinc-500">Loading Super Admin Console...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium tracking-widest text-purple-600 uppercase">
                Super Admin Mode
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">
              ADMIN TEAM & ACCESS CONTROL
            </h1>
            <p className="mt-1 text-xs tracking-widest text-zinc-500">
              Manage admin accounts and control platform-level access.
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-zinc-500">Signed in as</p>
            <p className="text-sm font-semibold text-zinc-900">{currentUser.fullName}</p>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${getRoleBadgeClass(currentUser.role)}`}>
              {getRoleLabel(currentUser.role)}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {(successMsg || errorMsg) && (
        <div className={`mb-6 rounded-lg border px-4 py-3 flex items-center gap-3 ${
          successMsg 
            ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {successMsg ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          <span className="text-sm font-medium">{successMsg || errorMsg}</span>
          <button 
            onClick={() => { setSuccessMsg(null); setErrorMsg(null); }}
            className="ml-auto p-1 hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const colorClasses: Record<string, string> = {
            zinc: "bg-zinc-50 text-zinc-600",
            emerald: "bg-emerald-50 text-emerald-600",
            purple: "bg-purple-50 text-purple-600"
          };
          
          return (
            <div key={card.label} className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[card.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium tracking-widest text-zinc-500">{card.label}</p>
                <p className="mt-2 text-4xl font-black text-zinc-900">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex items-center gap-3 text-zinc-400 flex-1 max-w-md">
            <Search className="h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium tracking-wide text-zinc-500">Role:</label>
              <select
                value={roleFilter}
                onChange={(e) => { setRoleFilter(e.target.value as any); setPage(1); }}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-400"
              >
                <option value="ALL">All roles</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>{getRoleLabel(role)}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium tracking-wide text-zinc-500">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-400"
              >
                <option value="ALL">All status</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl bg-white shadow-sm border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium tracking-wider text-zinc-500 border-b border-zinc-100">
                <th className="px-6 py-4">CUSTOMER</th>
                <th className="px-6 py-4">CURRENT ROLE</th>
                <th className="px-6 py-4">CHANGE ROLE</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">JOINED</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    {loading ? (
                      <div className="flex items-center justify-center gap-2 text-zinc-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500">No admin accounts found.</p>
                    )}
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isCurrentUser = user._id === currentUser._id;
                  const canEdit = canEditUser(user);
                  const selectedRole = pendingRoles[user._id] || user.role;
                  const isChanged = selectedRole !== user.role;
                  
                  return (
                    <tr key={user._id} className="hover:bg-zinc-50/50 transition-colors">
                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-zinc-900">{user.fullName}</span>
                          <span className="text-xs text-zinc-500">{user.email}</span>
                        </div>
                      </td>
                      
                      {/* Current Role */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getRoleBadgeClass(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      
                      {/* Change Role */}
                      <td className="px-6 py-4">
                        <select
                          value={selectedRole}
                          disabled={!canEdit || savingId === user._id}
                          onChange={(e) => setPendingRoles((prev) => ({ ...prev, [user._id]: e.target.value as UserRole }))}
                          className={`rounded-lg border px-3 py-2 text-xs font-medium outline-none focus:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                            canEdit ? "border-zinc-200 bg-zinc-50 text-zinc-700" : "border-zinc-100 bg-zinc-50 text-zinc-400"
                          }`}
                        >
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>{getRoleLabel(role)}</option>
                          ))}
                        </select>
                      </td>
                      
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusBadgeClass(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      
                      {/* Joined */}
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {user.joined || "—"}
                      </td>
                      
                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleSaveRole(user._id, user.role)}
                            disabled={!canEdit || savingId === user._id || !isChanged}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                              isChanged && canEdit
                                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                                : "border border-zinc-200 bg-zinc-50 text-zinc-400"
                            }`}
                          >
                            {savingId === user._id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Save className="h-3.5 w-3.5" />
                            )}
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4">
            <p className="text-xs text-zinc-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1 || loading}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages || loading}
                className="flex items-center gap-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default SuperAdmin;