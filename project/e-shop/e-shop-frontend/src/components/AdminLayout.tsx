import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from "./admin/sidebar";
import { OverviewPage } from "./admin/overview";
import { ProductsPage } from "./admin/ProductPage";
import { OrdersPage } from "./admin/OrdersPage";
import { GuestsPage } from "./admin/GuestsPage";
import { AnalyticsPage } from "./admin/AnalyticsPage";
import AdminProfile from "./admin/AdminProfile";

const AdminLayout: React.FC = () => {
  const [activeItem, setActiveItem] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Sync URL path to activeItem state
  useEffect(() => {
    const path = location.pathname.split("/").pop() || "overview";
    if (["overview", "products", "orders", "guests", "analytics", "profile"].includes(path)) {
      setActiveItem(path);
    }
  }, [location.pathname]);

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    navigate(`/admin/${itemId}`);
  };

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
        return <AnalyticsPage/>;
      case "profile":
        return <AdminProfile />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeItem={activeItem} onItemClick={handleNavigation} />
      <main className="ml-64 flex-1 bg-white">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminLayout;