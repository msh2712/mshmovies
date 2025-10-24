import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAccount() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users); 

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(null);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [emailExists, setEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);
  const [agree, setAgree] = useState(false);

  const validateUsername = (name) => name.trim() !== "" && !/\s/.test(name);

  const validateEmail = (email) => {
    const basicValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const domainValid = email.toLowerCase().endsWith("@gmail.com");
    return basicValid && domainValid;
  };

  const validatePassword = (pwd) => {
    const lengthCheck = pwd.length >= 6;
    const letterCheck = /[a-zA-Z]/.test(pwd);
    const numberCheck = /[0-9]/.test(pwd);
    const specialCharCheck = /[@#$%^&*!]/.test(pwd);
    return lengthCheck && letterCheck && numberCheck && specialCharCheck;
  };

  // --- HANDLERS ---
  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    setUsernameValid(validateUsername(input));
  };

  const handleEmailChange = (e) => {
    const input = e.target.value.toLowerCase();
    setEmail(input);

    if (input === "") {
      setEmailValid(null);
      return;
    }

    if(emailExists){
      toast.success("Email exist!");
    }

    setEmailValid(validateEmail(input));

    // Check in Redux users array
    const exists = users.some((user) => user.email.toLowerCase() === input);
    setEmailExists(exists);
  };

   useEffect(() => {
    if(emailExists){
      toast.success("User Exist!");
    }
     
   },[emailExists])

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setPasswordValid(validatePassword(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !agree) {
       toast.warn("Please fill all fields !");
      return;
    }

    if (!usernameValid) {
      alert("Please enter a valid username (no spaces, not empty).");
      return;
    }

    if (emailExists) {
      toast.error("Email already exists!"); 
      return;
    }

    if (!passwordValid) {
      alert(
        "Password must have at least 6 characters, one letter, one number, and one special character."
      );
      return;
    }

    // Save user data in localStorage (as temp data)
    const userData = { username, email, password };
    localStorage.setItem("tempUserData", JSON.stringify(userData));

    toast.success("User created successfully!");
    setTimeout(() => {
      navigate("/userintrest");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-start md:ps-28 p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: "url('/netflix image.jpg')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0" />

      <div className="relative z-10 w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold font-kids mb-6 ps-3 text-white">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full p-3 ps-6 font-des bg-black border ${
                usernameValid === false
                  ? "border-red-500"
                  : usernameValid
                  ? "border-green-500"
                  : "border-gray-700"
              } rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                usernameValid === false
                  ? "focus:ring-red-500"
                  : usernameValid
                  ? "focus:ring-green-500"
                  : "focus:ring-yellow-400"
              }`}
            />
          </div>
          {username && usernameValid === false && (
            <p className="text-red-500 ps-2 text-sm font-medium">
              Username cannot be empty or contain spaces.
            </p>
          )}

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Type your e-mail"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-3 ps-6 font-des bg-black border ${
                emailExists
                  ? "border-red-500"
                  : emailValid === false
                  ? "border-red-500"
                  : emailValid
                  ? "border-green-500"
                  : "border-gray-700"
              } rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                emailExists
                  ? "focus:ring-red-500"
                  : emailValid === false
                  ? "focus:ring-red-500"
                  : emailValid
                  ? "focus:ring-green-500"
                  : "focus:ring-yellow-400"
              } pr-10`}
            />
            <span className="absolute right-4 top-3.5 text-xl">
              {email && emailExists && <FaTimesCircle className="text-red-500" />}
              {email && emailValid && !emailExists && (
                <FaCheckCircle className="text-green-500" />
              )}
            </span>
          </div>

          {email && !emailValid && (
            <p className="text-red-500 ps-2 text-sm font-medium">
              Please enter a valid Gmail address.
            </p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full p-3 ps-6 font-des bg-black border ${
                passwordValid === false
                  ? "border-red-500"
                  : passwordValid
                  ? "border-green-500"
                  : "border-gray-700"
              } rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                passwordValid === false
                  ? "focus:ring-red-500"
                  : passwordValid
                  ? "focus:ring-green-500"
                  : "focus:ring-yellow-400"
              } pr-10`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-yellow-400 cursor-pointer text-xl"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {password && passwordValid === false && (
            <p className="text-red-500 ps-2 text-sm font-medium">
              Password must include a letter, number, and special character.
            </p>
          )}

          {/* Agree */}
          <div className="flex justify-between items-start ps-5 space-x-2 font-semibold text-gray-400 text-sm">
            <div className="flex">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 me-2 accent-yellow-400"
              />
              <span className="text-gray-600">Remember me</span>
            </div>
             <Link to='/'><div className="pe-8 font-des text-base cursor-pointer hover:text-yellow-400">
              Sign In
            </div></Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 font-kids text-black py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default CreateAccount;
