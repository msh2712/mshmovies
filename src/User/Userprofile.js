import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Userprofile = () => {
  const users = useSelector((state) => state.user.usernames);
  console.log(users);
  
   const usersemail = useSelector((state) => state.user.currentUser);
  const langCode = useSelector((state) => state.user.language);

  // Language mapping
  const languages = [
    { id: "hindi", label: "hi", name: "Hindi" },
    { id: "english", label: "en", name: "English" },
    { id: "japanese", label: "ja", name: "Japanese" },
    { id: "chinese", label: "zh", name: "Chinese" },
    { id: "korean", label: "ko", name: "Korean" },
    { id: "arabic", label: "ar", name: "Arabic" },
    { id: "spanish", label: "es", name: "Spanish" },
    { id: "french", label: "fr", name: "French" },
  ];

  const languageName = languages.find((l) => l.label === langCode)?.name || langCode;

  return (
    <section
      className="relative overflow-hidden font-inter bg-black dark:bg-green-50 text-white dark:text-black"
      style={{ height: "100dvh" }}
    >
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Right Content - Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl overflow-hidden border-2 border-gray-800 bg-gradient-to-br from-gray-900 to-gray-800">
              <img
                src="https://avatars.githubusercontent.com/u/124576166?v=4"
                alt={users || "User"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Left Content - Text */}
        <div className="h-full md:mt-3 text-center md:text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-gradient">{users || "User555"}</span>
          </h1>
           <p className="text-lg mt-1 sm:text-xl  font-des max-w-lg mx-auto md:mx-0">
            {usersemail}
          </p>
           <p className="text-l g sm:text-xl mt-2 font-des max-w-lg mx-auto md:mx-0">
            {users} interested in watching {languageName} movies.
          </p> 
          <hr className="mt-6  dark:border-stone-950" />
          <p className="text-lg animate-colorChange  dark:animate-none sm:text-xl my-2 font-des max-w-lg mx-auto md:mx-0">
            WEBSITE INFORMATION
          </p>
          <hr className="mb-5  dark:border-stone-950"/>
          <p className="text-lg sm:text-xl mt-3 font-des  mb-2 max-w-lg mx-auto md:mx-0">
            This website developed by Mahesh Patil using React, Tailwind Toolkit, and TMDb movies API.
          </p>
          <p className="text-lg sm:text-xl md:flex font-des max-w-lg mx-auto md:mx-0">
            Linked  <span className="hidden md:block mx-2">:</span>{" "}
            <p><Link to="https://www.linkedin.com/in/maheshpaatil/" className="text-blue-500">
              https://www.linkedin.com/in/maheshpaatil/
            </Link></p> 
          </p>
           <p className="text-lg sm:text-xl md:flex font-des  max-w-lg mx-auto md:mx-0">
            Email  <span className="hidden md:block mx-2">:</span>{" "}
            <p  className="text-blue-500 cursor-pointer">
               mshpatil369@gmail.com
           </p> 
          </p>
        </div>

      </div>
    </section>
  );
};

export default Userprofile;
