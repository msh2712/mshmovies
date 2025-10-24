import React from 'react';

export default function Loading() {
  return (
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
  );
}
