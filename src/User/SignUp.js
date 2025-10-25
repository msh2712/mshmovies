import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../redux/userSlice"; // example action

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);

  // ---------------- Validation functions ----------------
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

  // ---------------- Handlers ----------------
  const handleEmailChange = (e) => {
    const input = e.target.value.toLowerCase();
    setEmail(input);
    setEmailValid(validateEmail(input));
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    setPasswordValid(validatePassword(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!emailValid) {
      toast.error("Enter a valid email (must end with @gmail.com).");
      return;
    }

    if (!passwordValid) {
      toast.error(
        "Password must be at least 6 characters and include a letter, number, and special character."
      );
      return;
    }

    const userExists = users.some((u) => u.email.toLowerCase() === email);
    if (userExists) {
      toast.error("User already exists!");
      return;
    }

    dispatch(addUser({ email, password }));
    toast.success("Signup successful!");
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  return (
    <div
      className="relative w-full flex items-center justify-center md:justify-end p-4"
      style={{ height: "100dvh" }} // dynamic viewport height to avoid scroll
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/netflix image.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md p-6 md:p-8">
        <h2 className="text-3xl font-semibold font-kids mb-6 ps-3 text-white">
          Sign <span className="animate-colorChange">Up</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Type your e-mail"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-3 ps-6 font-des bg-black border ${
                emailValid === false
                  ? "border-red-500"
                  : emailValid
                  ? "border-green-500"
                  : "border-gray-700"
              } rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                emailValid === false
                  ? "focus:ring-red-500"
                  : emailValid
                  ? "focus:ring-green-500"
                  : "focus:ring-yellow-400"
              } pr-10`}
            />
            <span className="absolute right-4 top-3.5 text-xl">
              {email && emailValid && <FaCheckCircle className="text-green-500" />}
              {email && emailValid === false && <FaTimesCircle className="text-red-500" />}
            </span>
          </div>
          {email && emailValid === false && (
            <p className="text-red-500 ps-2 text-sm font-medium">
              Enter a valid Gmail address.
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
              Password must be at least 6 characters and include a letter, number, and special character.
            </p>
          )}

          <div className="flex justify-end pr-6 w-auto items-start ps-5 space-x-2">
            <Link to="/signin">
              <span className="cursor-pointer font-des font-semibold text-gray-400 hover:text-yellow-400">
                Sign In
              </span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 font-kids py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Signup;
