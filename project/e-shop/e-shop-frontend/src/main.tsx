import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ✅ CLEAR STALE SESSION ON APP START
const clearStaleSession = () => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  // Only clear if there's no valid token or user
  if (!token || !userStr || userStr === 'undefined' || userStr === 'null') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    console.log('🔒 Cleared stale session data');
  }
};

clearStaleSession();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)