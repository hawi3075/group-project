import { useState } from "react";
import { Info } from "lucide-react";
import { OrderModal, type Order } from "./OrderModal";

// Define the order type (matching what OrderModal expects)
type RecentOrder = {
    id: string;
    customerId: string;
    items: number;
    location: string;
    amount: string;
    productColor: string;
    size?: string; // Made optional since not all orders might have size
    urgentDelivery: boolean;
    paymentMethod: string;
};

// Fixed orders array with all required properties
const orders: RecentOrder[] = [
    { 
        id: "1", 
        customerId: "#8214", 
        items: 2, 
        location: "ADAMA, ET", 
        amount: "$1,120.00", 
        productColor: "Grey",
        size: "L",
        urgentDelivery: true,
        paymentMethod: "TELEBIRR"
    },
    { 
        id: "2", 
        customerId: "#8215", 
        items: 1, 
        location: "ADDIS ABABA, ET", 
        amount: "$850.00", 
        productColor: "Blue",
        size: "M",
        urgentDelivery: false,
        paymentMethod: "CBE BIRR"
    },
    { 
        id: "3", 
        customerId: "#8216", 
        items: 3, 
        location: "DIRE DAWA, ET", 
        amount: "$2,340.00", 
        productColor: "Midnight Black",
        size: "XL",
        urgentDelivery: true,
        paymentMethod: "TELEBIRR"
    },
];

export function RecentOrders() {
    const [selectedOrder, setSelectedOrder] = useState<RecentOrder | null>(null);

    return (
        <>
            <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-zinc-900">RECENT ORDERS</h2>
                    <button className="text-xs font-medium tracking-wide text-zinc-500 hover:text-zinc-700">
                        VIEW ALL
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                                    <span className="text-xs font-medium text-zinc-600">
                                        {order.customerId.slice(1, 3)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900">
                                        CUSTOMER {order.customerId}
                                    </p>
                                    <p className="text-xs text-zinc-500">
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
    );
}