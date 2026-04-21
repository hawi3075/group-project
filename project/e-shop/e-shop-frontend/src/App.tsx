import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile'; 
import AdminLayout from './components/AdminLayout';

// ✅ FIX: Use named imports { } for all admin pages
import { OverviewPage } from './components/admin/overview';
import { ProductsPage } from './components/admin/ProductPage';
import { OrdersPage } from './components/admin/OrdersPage';
import { GuestsPage } from './components/admin/GuestsPage';
import { AnalyticsPage } from './components/admin/AnalyticsPage';

import './App.css';

const AppContent = () => {
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith('/admin');
  const isProductsPage = location.pathname === '/products';
  const isDetailPage = location.pathname.startsWith('/product/');
  const hideFooterPaths = ['/cart', '/login', '/register', '/about', '/profile'];

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="guests" element={<GuestsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
          
        </Routes>
      </main>

      {!isAdminPage && 
       !isProductsPage && 
       !isDetailPage && 
       !hideFooterPaths.includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;