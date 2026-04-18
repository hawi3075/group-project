import { X } from "lucide-react"

export function OrderModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black tracking-tight text-zinc-900">ORDER SPECS</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">PRODUCT COLOR</p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{order.productColor}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">ITEM AMOUNT</p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{order.items}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">SIZE</p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{order.size || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">LOCATION</p>
            <p className="mt-1 text-sm font-bold text-zinc-900">{order.location}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">URGENT DELIVERY</p>
            <p className={`mt-1 text-sm font-bold ${order.urgentDelivery ? "text-emerald-500" : "text-zinc-900"}`}>
              {order.urgentDelivery ? "YES" : "NO"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-500">TOTAL PAYMENT</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{order.amount}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium tracking-wide text-zinc-500">METHOD</p>
            <span className="mt-1 inline-block rounded border border-emerald-500 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {order.paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}