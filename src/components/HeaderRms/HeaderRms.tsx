import React from 'react';
import { Link } from 'react-router-dom'
function AppHeader() {
  return (
    <header className="bg-yellow-500 py-4 mb-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold text-white">RMS</div>
        <nav className="space-x-4">

          <div className='flex items-center'>
            <Link to='/ResourceManagementSystem' className='mx-3 capitalize hover:text-white/70 text-white'>
              Resource Management System
            </Link>
            <Link to='/ProjectManager' className='mx-3 capitalize hover:text-white/70 text-white'>
              ProjectManager
            </Link>
            <Link to='/register' className='mx-3 capitalize hover:text-white/70 text-white'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-white/40 ' />
            <Link to='/login' className='mx-3 capitalize hover:text-white/70 text-white'>
              Đăng nhập
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
