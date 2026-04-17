import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { OverviewPage } from "./components/overview"
import { ProductsPage } from "./components/ProductPage"
import { OrdersPage } from "./components/OrdersPage"
import { ProfilePage } from "./components/ProfilePage"

export default function App() {
  const [activeItem, setActiveItem] = useState("overview")

  const renderPage = () => {
    switch (activeItem) {
      case "overview":
        return <OverviewPage />
      case "products":
        return <ProductsPage />
      case "orders":
        return <OrdersPage />
      case "guests":
        return <div className="p-8 text-white text-2xl">Guests Page</div>
      case "analytics":
        return <div className="p-8 text-white text-2xl">Analytics Page</div>
      case "profile":
        return <ProfilePage />
      default:
        return <OverviewPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0f1419]">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <main className="ml-64 flex-1">
        {renderPage()}
      </main>
    </div>
  )
}