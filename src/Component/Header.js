// Header.jsx
import React from 'react';
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from './DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, closeSidebar } from './../Reduxtoolkit/sidebarSlice';
import { logoutUser } from '../Reduxtoolkit/userSlice';

function Header() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate()

  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      dispatch(closeSidebar());
    }
  };
const handleLogout = () => {
  dispatch(closeSidebar());
  dispatch(logoutUser());
  navigate('/');
};

 

  return (
    <>
      <div
        className="fixed top-8 right-8 z-50 text-white dark:text-black p-1.5 rounded md:hidden cursor-pointer"
        onClick={() => dispatch(toggleSidebar())}
      >
        <div className="flex flex-col gap-[3px] w-5">
          <div
            className={`h-[4px] w-[10px] bg-white dark:bg-black rounded-full transition-all duration-300 origin-right
              ${isOpen ? 'rotate-[225deg] -translate-x-[6px] -translate-y-[1px]' : ''}
            `}
          ></div>
          <div
            className={`h-[4px] w-full bg-yellow-500  rounded-full transition-all duration-300
              ${isOpen ? '-rotate-45' : ''}
            `}
          ></div>
          <div
            className={`h-[4px] w-[10px] bg-white dark:bg-black rounded-full transition-all duration-300 place-self-end origin-left
              ${isOpen ? 'rotate-[225deg] translate-x-[6px] translate-y-[1px]' : ''}
            `}
          ></div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[60px] rounded-e-xl bg-black dark:bg-green-50 flex flex-col justify-between py-4 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className='flex flex-col items-center space-y-6 mt-2 gap-y-3'>
          <Link to='/Home'><img className='size-10' src='/MshLogo.png' alt='Logo' /></Link>

          <Link to='/Home' onClick={handleMobileClick}>
            <FaHome className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <Link to='/search' onClick={handleMobileClick}>
            <FaSearch className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <Link to='/likedatas' onClick={handleMobileClick}>
            <FaHeart className='text-white hover:text-red-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <div onClick={handleMobileClick}>
            <DarkMode />
          </div>
        </div>

        <div className='flex flex-col items-center space-y-6 mb-4'>
            <Link to='/userprofile' onClick={handleMobileClick}>
            <FaUser
              onClick={handleMobileClick}
              className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer'
            />
          </Link>

          <Link>
            <FaSignOutAlt
              onClick={handleLogout}
              className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer'
            />
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black dark:bg-green-50 dark:bg-opacity-40 bg-opacity-50 z-30 md:hidden'
          onClick={() => dispatch(closeSidebar())}
        ></div>
      )}
    </>
  );
}

export default Header;
