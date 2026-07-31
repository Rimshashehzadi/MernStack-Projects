import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const login = localStorage.getItem("login");

    if (login) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3200/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.success) {
        document.cookie = `token=${result.token}; path=/; max-age=432000`;

        localStorage.setItem("login", userData.email);

        // Notify other components
        window.dispatchEvent(new Event("storage"));

        alert(result.msg);

        navigate("/");
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-indigo-100 px-4 py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800"
        >
          Welcome Back 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base"
        >
          Login to your account
        </motion.p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full mt-2 rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full mt-2 rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </motion.button>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-600 mt-7 text-sm sm:text-base"
        >
          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;