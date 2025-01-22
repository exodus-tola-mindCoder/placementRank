import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';

import Navbar from './components/Navbar';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

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
    <>
      <div className='min-h-screen bg-gray-50'>
        <Toaster position="top-center" />
        <Navbar user={user} onLogout={handleLogout} />

        <main className='container mx-auto px-4 py-8'>
          {!user} ? ( isLogin ? (
          <LoginForm onToggleAuth={() => setIsLogin(true)} onLoginSuccess={handleAuthSuccess} />
          ): (
          <RegisterForm onToggleAuth={() => setIsLogin(false)} onRegisterSuccess={handleAuthSuccess} />
          ))

        </main>

      </div>
    </>
  )
}

export default App
