import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';

import Navbar from './components/Layout/Navbar';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      fetchStats();
    }
  }, []);

  const handleLogout = () => {
    // logic here
  };

  const fetchStats = async () => {
    try {
      // logic here
    } catch (error) {

    }
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    fetchStats();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <Navbar user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        {!user ? (
          isLogin ? (
            <LoginForm
              onToggleAuth={() => setIsLogin(true)}
              onLoginSuccess={handleAuthSuccess}
            />
          ) : (
            <RegisterForm
              onToggleAuth={() => setIsLogin(true)}
              onRegisterSuccess={handleAuthSuccess}
            />
          )
        ) : (
          <Dashboard stats={stats} />
        )}
      </main>
    </div>
  );
}

export default App
