// Header.jsx
import React from 'react';
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaBars,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DarkMode from './DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, closeSidebar } from './../Reduxtoolkit/sidebarSlice';

function Header() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      dispatch(closeSidebar());
    }
  };

  return (
    <>
      <button
        className='fixed top-7 right-7 z-50 text-white  dark:text-black p-2 rounded md:hidden'
        onClick={() => dispatch(toggleSidebar())}
      >
        <FaBars />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-[60px] rounded-e-xl bg-black dark:bg-green-50 flex flex-col justify-between py-4 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className='flex flex-col items-center space-y-6 mt-2 gap-y-3'>
          <img className='size-10' src='./MshLogo.png' alt='Logo' />

          <Link to='/' onClick={handleMobileClick}>
            <FaHome className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <Link to='/search' onClick={handleMobileClick}>
            <FaSearch className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <Link to='/likedatas' onClick={handleMobileClick}>
            <FaHeart className='text-white hover:text-red-500 dark:text-black text-2xl cursor-pointer' />
          </Link>
          <div onClick={handleMobileClick}>
          <DarkMode/>
          </div>
        </div>

        <div className='flex flex-col items-center space-y-6 mb-4'>
          <Link >
            <FaUser  onClick={handleMobileClick} className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>

          <Link>
            <FaSignOutAlt   onClick={handleMobileClick} className='text-white hover:text-neutral-500 dark:text-black text-2xl cursor-pointer' />
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => dispatch(closeSidebar())}
        ></div>
      )}
    </>
  );
}

export default Header;
