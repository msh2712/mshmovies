import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true"; 
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // localStorage me value save kar rahe hain
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="text-white dark:text-black hover:text-neutral-500 text-3xl cursor-pointer"
    >
      {darkMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}

export default DarkMode;
