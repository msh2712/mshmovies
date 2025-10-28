import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "./../Reduxtoolkit/userSlice"; // ✅ import your action
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(null);

  const validateEmail = useCallback((email) => {
    const basicValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const domainValid = email.toLowerCase().endsWith("@gmail.com");
    return basicValid && domainValid;
  }, []);

  const validatePassword = useCallback((pwd) => {
    const lengthCheck = pwd.length >= 6;
    const letterCheck = /[a-zA-Z]/.test(pwd);
    const numberCheck = /[0-9]/.test(pwd);
    const specialCharCheck = /[@#$%^&*!]/.test(pwd);
    return lengthCheck && letterCheck && numberCheck && specialCharCheck;
  }, []);

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

    const user = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (user) {
      try {
        dispatch(loginUser({ email, password }));
        toast.success("Login successful!");
         setTimeout(() => navigate("/", { replace: true }), 1500); 
      } catch (error) {
        toast.error(error.message || "Login failed!");
      }
    } else {
      toast.error("Email or password do not match!");
    }
  };

  return (
    <div
      className="relative w-full flex items-center justify-center md:justify-end p-4"
      style={{ height: "100dvh" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/netflix image.jpg')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      <div className="relative z-10 w-full max-w-md p-6 md:mr-20 md:p-8">
        <h2 className="text-3xl font-semibold font-kids mb-6 ps-3 text-white">
          Sign <span className="animate-colorChange">In</span>
        </h2>

        <form className="space-y-4">
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
              onClick={() => setShowPassword((prev) => !prev)}
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
            <Link to="/signup">
              <span className="cursor-pointer font-des font-semibold text-gray-400 hover:text-yellow-400">
                Sign Up
              </span>
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-yellow-400 font-kids py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Sign In
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Signin;
