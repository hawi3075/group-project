import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, CheckCircle, Truck, Info } from "lucide-react"

const allOrders = [
  {
    id: "#QB-8291",
    guest: "JULIANNE MOORE",
    product: "CORE WATCH PRO, +1 ITEM",
    total: 1240,
    date: "Oct 24, 09:12 AM",
    status: "delivered",
  },
  {
    id: "#QB-8289",
    guest: "ADRIAN STERLING",
    product: "STUDIO HEADSETS V2",
    total: 350,
    date: "Oct 24, 08:45 AM",
    status: "shipped",
  },
  {
    id: "#QB-8285",
    guest: "ELENA KOSTIC",
    product: "AIR RUNNER X",
    total: 189,
    date: "Oct 23, 04:30 PM",
    status: "shipped",
  },
  {
    id: "#QB-8280",
    guest: "MARCUS THORNE",
    product: "OPTIC 35MM CAM",
    total: 2800,
    date: "Oct 23, 02:15 PM",
    status: "shipped",
  },
  {
    id: "#QB-8275",
    guest: "SARAH CHEN",
    product: "NEOWATCH SERIES 7",
    total: 799,
    date: "Oct 22, 11:30 AM",
    status: "delivered",
  },
  {
    id: "#QB-8270",
    guest: "JAMES WILSON",
    product: "PULSE RUNNER X",
    total: 180,
    date: "Oct 22, 09:15 AM",
    status: "shipped",
  },
]

const ITEMS_PER_PAGE = 4

export function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = allOrders.filter(
    (order) =>
      order.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const activeShipments = allOrders.filter((o) => o.status === "shipped").length
  const urgentOrders = 18

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <main className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-zinc-100">
          ORDER FULFILLMENT
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-400">
          EDITORIAL CONTROLS FOR EFOY GEBYA LOGISTICS.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-xs font-medium tracking-widest text-zinc-400">
            OPERATIONAL PULSE
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-zinc-900">{activeShipments}</span>
            <span className="text-sm font-semibold text-emerald-500">ACTIVE SHIPMENTS</span>
          </div>
        </div>
        <div className="rounded-xl bg-zinc-900 p-6">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium tracking-widest text-zinc-400">
              PRIORITY QUEUE
            </p>
            <Info className="h-5 w-5 text-zinc-400" />
          </div>
          <p className="mt-4 text-4xl font-black text-white">
            {urgentOrders} <span className="text-emerald-400">URGENT</span>
          </p>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-zinc-900">
            TRANSACTION LOG
          </h2>
          <div className="flex items-center gap-3 text-zinc-400">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium tracking-wider text-zinc-400">
              <th className="pb-4">ORDER ID</th>
              <th className="pb-4">GUEST</th>
              <th className="pb-4">TOTAL</th>
              <th className="pb-4">DATE</th>
              <th className="pb-4 text-right">STATUS ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-4 text-sm text-zinc-400">{order.id}</td>
                <td className="py-4">
                  <p className="text-sm font-bold text-zinc-900">{order.guest}</p>
                  <p className="text-xs text-zinc-400">{order.product}</p>
                </td>
                <td className="py-4 text-sm font-semibold text-zinc-900">
                  ${order.total.toLocaleString()}
                </td>
                <td className="py-4 text-sm text-zinc-400">{order.date}</td>
                <td className="py-4">
                  <div className="flex justify-end">
                    {order.status === "delivered" ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        DELIVERED
                        <CheckCircle className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        SHIPPED
                        <Truck className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            SHOWING {paginatedOrders.length} RESULTS
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
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