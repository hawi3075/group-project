

import { useState, useRef } from "react"
import { Mail, Phone, MapPin, Calendar, Shield, Edit, Camera, X } from "lucide-react"

export function ProfilePage() {
  const [user, setUser] = useState({
    name: "SIHAM BIRHANU",
    role: "SYSTEM ADMIN",
    email: "siham.birhanu@efoygebya.com",
    phone: "+251 912 345 678",
    location: "Addis Ababa, Ethiopia",
    joinDate: "March 2024",
    department: "Operations",
    accessLevel: "Full Access",
    profileImage: null,
    stats: {
      ordersProcessed: 1248,
      productsManaged: 156,
      revenueHandled: "$2.4M",
    },
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState(user)
  const fileInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profileImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleEditProfile = () => {
    setEditForm(user)
    setIsEditDialogOpen(true)
  }

  const handleSaveProfile = () => {
    setUser(editForm)
    setIsEditDialogOpen(false)
  }

  const recentActivity = [
    { action: "Updated product VAPORMAX FLYKNIT 3", time: "2 hours ago" },
    { action: "Processed order #QB-8291", time: "5 hours ago" },
    { action: "Added new product CHRONOS GEN-Z", time: "1 day ago" },
  ]

  return (
    <main className="flex-1 p-8 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-white">
          ADMIN PROFILE
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-400">
          SYSTEM ADMINISTRATOR CREDENTIALS AND METRICS.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl bg-[#1a1f2e] p-6 lg:col-span-1">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
              <button
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 rounded-full bg-zinc-800 p-2 text-white transition-colors hover:bg-zinc-700"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Name & Role */}
            <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
            <span className="mt-2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              {user.role}
            </span>

            {/* Contact Info */}
            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Mail className="h-4 w-4 text-zinc-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Phone className="h-4 w-4 text-zinc-500" />
                {user.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <MapPin className="h-4 w-4 text-zinc-500" />
                {user.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Calendar className="h-4 w-4 text-zinc-500" />
                Joined {user.joinDate}
              </div>
            </div>

            <button
              onClick={handleEditProfile}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2a3142] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a4152]"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Department and Access Level */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-[#1a1f2e] p-6">
              <p className="text-xs tracking-wider text-zinc-400">DEPARTMENT</p>
              <p className="mt-1 text-2xl font-bold text-white">{user.department}</p>
            </div>
            <div className="rounded-xl bg-[#1a1f2e] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-wider text-zinc-400">ACCESS LEVEL</p>
                  <p className="mt-1 text-2xl font-bold text-white">{user.accessLevel}</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-xl bg-[#1a1f2e] p-6">
            <h3 className="text-sm font-bold tracking-wider text-white">PERFORMANCE METRICS</h3>
            <p className="mb-4 text-xs text-zinc-400">Lifetime statistics</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-zinc-700 p-4">
                <p className="text-xs text-zinc-400">ORDERS PROCESSED</p>
                <p className="mt-1 text-3xl font-bold text-white">{user.stats.ordersProcessed.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-zinc-700 p-4">
                <p className="text-xs text-zinc-400">PRODUCTS MANAGED</p>
                <p className="mt-1 text-3xl font-bold text-white">{user.stats.productsManaged}</p>
              </div>
              <div className="rounded-lg border border-zinc-700 p-4">
                <p className="text-xs text-zinc-400">REVENUE HANDLED</p>
                <p className="mt-1 text-3xl font-bold text-emerald-400">{user.stats.revenueHandled}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-[#1a1f2e] p-6">
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white">RECENT ACTIVITY</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-zinc-700 pb-4 last:border-0 last:pb-0"
                >
                  <p className="text-sm text-zinc-300">{activity.action}</p>
                  <p className="text-xs text-zinc-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsEditDialogOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md rounded-xl bg-[#1a1f2e] p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Edit Profile</h2>
                <p className="text-sm text-zinc-400">Update your profile information below.</p>
              </div>
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-[#252b3b] px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-[#252b3b] px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-300">
                  Phone
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-[#252b3b] px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-300">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-[#252b3b] px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-300">
                  Department
                </label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full rounded-lg border border-zinc-600 bg-[#252b3b] px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
