import React, { useState } from 'react';
import { Sidebar } from "./admin/sidebar";
import { OverviewPage } from "./admin/overview";
import { ProductsPage } from "./admin/ProductPage";
import { OrdersPage } from "./admin/OrdersPage";
import { GuestsPage } from "./admin/GuestsPage";

const AdminLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState("overview");

  const renderPage = () => {
    switch (activeItem) {
      case "overview":
        return <OverviewPage />;
      case "products":
        return <ProductsPage />;
      case "orders":
        return <OrdersPage />;
      case "guests":
        return <GuestsPage/>;
      case "analytics":
        return <div className="p-8 text-white text-2xl">Analytics Page</div>;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <main className="ml-64 flex-1 bg-white">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminLayout;