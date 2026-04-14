import { X } from "lucide-react"

export function OrderModal({ order, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black tracking-tight text-zinc-100">
            ORDER SPECS
          </h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              PRODUCT COLOR
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-400">
              {order.productColor}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              ITEM AMOUNT
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-400">
              {order.items}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              LOCATION
            </p>
            <p className="mt-1 text-sm font-bold text-zinc-400">
              {order.location}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              URGENT DELIVERY
            </p>
            <p className={`mt-1 text-sm font-bold ${order.urgentDelivery ? "text-emerald-500" : "text-zinc-900"}`}>
              {order.urgentDelivery ? "YES" : "NO"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              TOTAL PAYMENT
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-400">
              {order.amount}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs font-medium tracking-wide text-zinc-400">
              METHOD
            </p>
            <span className="mt-1 inline-block rounded border border-zinc-400 px-3 py-1 text-xs font-bold text-zinc-900">
              {order.paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}