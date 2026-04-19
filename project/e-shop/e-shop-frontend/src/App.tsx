import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; // 1. IMPORT the new detail page
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile'; 
import AdminLayout from './components/AdminLayout';

import './App.css';

const AppContent = () => {
  const location = useLocation();
  
  const isAdminPage = location.pathname.startsWith('/admin');
  const isProductsPage = location.pathname === '/products';
  
  // 2. We check if the current path starts with /product/ to manage the footer for details
  const isDetailPage = location.pathname.startsWith('/product/');

  const hideFooterPaths = ['/cart', '/login', '/register', '/about', '/profile'];

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          
          {/* 3. ADD the dynamic route for product details */}
          {/* The ":id" allows the page to know which product was clicked */}
          <Route path="/product/:id" element={<ProductDetail />} /> 

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/admin" element={<AdminLayout />} />
          
        </Routes>
      </main>

      {/* 4. UPDATED Footer logic to ensure it shows on the detail page if you want it to */}
      {!isAdminPage && 
       !isProductsPage && 
       !isDetailPage && // Remove this line if you WANT the footer on the detail page
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