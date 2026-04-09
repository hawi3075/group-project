import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'; // Import your new Login component

// The Layout component handles the "Smart Footer" logic
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Define which pages should NOT have a footer
  const hideFooterOn = ['/register', '/login'];
  const shouldShowFooter = !hideFooterOn.includes(location.pathname);

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {/* Footer is visible on Home (/), but hidden on Register/Login */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;