import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (token && userStr && userStr !== 'undefined' && userStr !== 'null') {
        try {
          const user = JSON.parse(userStr);
          if (user.email && user.role) {
            setIsAuthenticated(true);
            setIsAdmin(user.role.toLowerCase() === 'admin');
            return;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
      
      // Clear invalid data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setIsAdmin(false);
    };
    
    checkAuth();
  }, []);

  // Show loading while checking
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto mb-4"></div>
          <p className="text-sm text-zinc-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if not admin but trying to access admin area
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}