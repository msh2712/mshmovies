import React from 'react';
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";


export default function Loading() {
  return (
   <div className="relative dark:bg-white">
      {/* Swiper Skeleton — single slide placeholder */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[500px] lg:h-screen overflow-hidden">
        {/* Background Placeholder */}
        <div className="w-full h-full animate-pulse"></div>

        {/* Overlay Content Placeholder */}
        <div className="absolute bottom-12 md:bottom-[120px] left-10 md:left-40 text-white max-w-2xl rounded-md">
          {/* Title */}
          <div className="h-10 md:h-14 w-60 md:w-96 bg-gray-500 dark:bg-gray-400 rounded-md mb-4 animate-pulse"></div>

          {/* Date */}
          <div className="flex items-center space-x-3 mb-3">
            <FaRegCalendarAlt className="text-gray-400 text-sm md:text-xl" />
            <div className="h-4 w-32 bg-gray-500 dark:bg-gray-400 rounded-md animate-pulse"></div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2 md:mb-4">
            <FaStar className="text-gray-400 text-lg" />
            <div className="h-4 w-16 bg-gray-500 dark:bg-gray-400 rounded-md animate-pulse"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-32 bg-gray-500 dark:bg-gray-400 rounded-md mt-4 animate-pulse"></div>
        </div>
      </div>

      {/* Navigation Buttons Skeleton */}
      <div className="absolute bottom-5 md:bottom-10 right-[100px] md:right-[150px] bg-gray-700 dark:bg-gray-400 p-3 rounded-full animate-pulse"></div>
      <div className="absolute bottom-5 md:bottom-10 right-[50px] md:right-[90px] bg-gray-700 dark:bg-gray-400 p-3 rounded-full animate-pulse"></div>
    </div>
  );
}



 <div className="loading w-screen h-screen flex justify-center items-center bg-black/70  dark:bg-green-50">
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-12"
      >
        <polyline
          id="back"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
        <polyline
          id="front"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
      </svg>
    </div>
