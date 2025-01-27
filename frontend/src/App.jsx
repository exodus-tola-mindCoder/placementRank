import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { getStats } from './lib/api';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Layout/Navbar';


function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
     try {
       setUser(JSON.parse(userData));
       fetchStats();
     } catch (error) {
       console.log('error', error.message);
      
     }
    }
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
      console.log(data)
    } catch (error) {
      toast.error('failed to fetch statics')
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setStats({});
    toast.success('successfully logged out!');
  };


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
              onToggleAuth={() => setIsLogin(false)}
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
