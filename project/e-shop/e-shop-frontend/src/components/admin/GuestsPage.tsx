// GuestsPage.tsx
import { useState } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, User, UserX } from "lucide-react"

type GuestRole = "REGULAR" | "PRIVILEGED" | "ADMIN"
type GuestStatus = "ACTIVE" | "INACTIVE"

type Guest = {
  id: string
  userId: string
  fullName: string
  email: string
  joined: string
  role: GuestRole
  status: GuestStatus
}

const initialGuests: Guest[] = [
  { id: "1", userId: "INVALID", fullName: "Hana Belete", email: "sarahbelete@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "2", userId: "INVALID", fullName: "John Doe", email: "man@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "3", userId: "INVALID", fullName: "Siham Birhanu", email: "sihambirhanu90@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "4", userId: "INVALID", fullName: "do jo", email: "john.doe@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "5", userId: "INVALID", fullName: "Alex User", email: "apitest_buyNow@efoy.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "6", userId: "INVALID", fullName: "Sara Belete", email: "sarawaynu@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "7", userId: "INVALID", fullName: "sam sa", email: "sam@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
  { id: "8", userId: "INVALID", fullName: "sami g", email: "sa@gmail.com", joined: "—", role: "REGULAR", status: "ACTIVE" },
]

const ITEMS_PER_PAGE = 8

export function GuestsPage() {
  const [guests] = useState<Guest[]>(initialGuests)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const filteredGuests = guests.filter(
    (guest) =>
      guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.userId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredGuests.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedGuests = filteredGuests.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const totalUsers = guests.length
  const privilegedUsers = guests.filter((g) => g.role === "PRIVILEGED").length
  const activeNow = 0
  const newToday = 0

  return (
    <main className="flex-1 p-8 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900">
          GUEST DIRECTORY
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-500">
          Manage and curate your guest list. High-tier privileged accounts and regular users.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <p className="text-xs font-medium tracking-widest text-zinc-500">TOTAL USERS</p>
          <p className="mt-2 text-4xl font-black text-zinc-900">{totalUsers}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <p className="text-xs font-medium tracking-widest text-zinc-500">PRIVILEGED</p>
          <p className="mt-2 text-4xl font-black text-zinc-900">{privilegedUsers}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <p className="text-xs font-medium tracking-widest text-zinc-500">ACTIVE NOW</p>
          <p className="mt-2 text-4xl font-black text-emerald-500">{activeNow}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <p className="text-xs font-medium tracking-widest text-zinc-500">NEW TODAY</p>
          <p className="mt-2 text-4xl font-black text-zinc-900">{newToday}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-zinc-400 flex-1">
            <Search className="h-5 w-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Guests Table */}
      <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium tracking-wider text-zinc-500">
                <th className="pb-4">User ID</th>
                <th className="pb-4">Full Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Joined</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedGuests.map((guest) => (
                <tr key={guest.id}>
                  <td className="py-4 text-sm text-zinc-500">{guest.userId}</td>
                  <td className="py-4">
                    <p className="text-sm font-bold text-zinc-900">{guest.fullName}</p>
                  </td>
                  <td className="py-4 text-sm text-zinc-500">{guest.email}</td>
                  <td className="py-4 text-sm text-zinc-500">{guest.joined}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700">
                      {guest.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {guest.status === "ACTIVE" ? (
                        <User className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-zinc-400" />
                      )}
                      <span className={`text-sm font-medium ${guest.status === "ACTIVE" ? "text-emerald-600" : "text-zinc-500"}`}>
                        {guest.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end">
                      <select className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-400">
                        <option>User</option>
                        <option>Edit</option>
                        <option>Deactivate</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500">SHOWING {paginatedGuests.length} RESULTS</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="flex items-center gap-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}