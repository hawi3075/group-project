import { useState } from "react"
import { Info } from "lucide-react"
import { OrderModal } from "./OrderModal"

const orders = [
  { 
    id: "1", 
    customerId: "#8214", 
    items: 2, 
    location: "ADAMA, ET", 
    amount: "$1,120.00",
    productColor: "MIDNIGHT BLACK",
    urgentDelivery: true,
    paymentMethod: "TELEBIRR"
  },
  { 
    id: "2", 
    customerId: "#8224", 
    items: 1, 
    location: "ADAMA, ET", 
    amount: "$1,120.00",
    productColor: "SILVER GRAY",
    urgentDelivery: false,
    paymentMethod: "CBE BIRR"
  },
  { 
    id: "3", 
    customerId: "#8234", 
    items: 1, 
    location: "ADDIS ABABA, ET", 
    amount: "$850.00",
    productColor: "OCEAN BLUE",
    urgentDelivery: true,
    paymentMethod: "TELEBIRR"
  },
]

export function RecentOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900">RECENT ORDERS</h2>
          <button className="text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-600">
            VIEW ALL
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                  <span className="text-xs font-medium text-zinc-500">
                    {order.customerId.slice(1, 3)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    CUSTOMER {order.customerId}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {order.items} ITEMS - {order.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-900">
                  {order.amount}
                </span>
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderModal 
        order={selectedOrder}
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  )
}