import React, { useState, useEffect } from "react";
import Heading from "../Component/Heading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./../Reduxtoolkit/userSlice";
import { toast } from "react-toastify";

function UserInterest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("tempUserData");

    if (!savedData) {
      toast.error("No user data found, redirecting to signup.");
      setTimeout(() => navigate("/create-account"), 1500);
      return;
    }

    const parsed = JSON.parse(savedData);
    console.log(parsed);
    
    setUserData(parsed);
  }, [navigate, users]);

  const handleSelectLanguage = (label) => {
    if (!userData) {
      toast.error("User data not found!");
      return;
    }

    const existingUser = users.find((u) => u.email === userData.email);

    if (existingUser && existingUser.language) {
      toast.info("Your Interest is already selected!");
      setTimeout(() => navigate("/Home"), 1500);
      return;
    }

    const userObj = { ...userData, language: label };
    console.log(userObj);
    

    try {
      dispatch(signupUser(userObj));
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.message || "Signup failed!");
    }
  };

  const languages = [
    { id: "hindi", label: "hi", img: "/Poster/hindi.jpg" },
    { id: "english", label: "en", img: "/Poster/english.jpg" },
    { id: "japanese", label: "ja", img: "/Poster/japanies.jpg" },
    { id: "chinese", label: "zh", img: "/Poster/Chinese.jpg" },
    { id: "korean", label: "ko", img: "/Poster/Korean.jpg" },
    { id: "arabic", label: "ar", img: "/Poster/arab.jpg" },
    { id: "spanish", label: "es", img: "/Poster/spanish.jpeg" },
    { id: "french", label: "fr", img: "/Poster/french.jpg" },
  ];

  return (
    <div className="relative min-h-screen w-full flex justify-start md:ps-16 p-4 overflow-hidden bg-gray-950 dark:bg-green-50 dark:text-green-50 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/netflix image.jpg')" }}
      />
<div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/90 to-black dark:from-green-50 dark:via-green-50/90 dark:to-green-50 dark:opacity-0 opacity-90 z-0" />

      <div className="relative z-10 w-full md:px-8">
        <Heading heading="Choose Your Interest" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:px-9 mt-6">
          {languages.map(({ id, label, img }) => (
            <div
              key={id}
              onClick={() => handleSelectLanguage(label)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/40 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(255,0,0,0.3)] hover:border-red-500/70"
            >
              <img
                src={img}
                alt={label}
                className="w-full h-44 sm:h-52 object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 w-full text-center py-2 bg-black/60 backdrop-blur-md">
                <p className="text-lg font-kids font-semibold tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                  {id.toUpperCase()}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-tr from-red-500/10 via-transparent to-red-600/20 blur-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInterest;
