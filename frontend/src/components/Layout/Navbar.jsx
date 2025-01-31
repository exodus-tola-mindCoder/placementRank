import React from 'react'

function Navbar({user, onLogout}) {
  return (
    <nav className='bg-indigo-600 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <img src="/logo.jpeg" alt="Logo" className="h-10 w-10" />
          <span className='text-xl font-bold'>Haramaya University Freshman Placement System</span>
        </div>
        {user && (
          <button
            onClick={onLogout}
            className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-400"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;