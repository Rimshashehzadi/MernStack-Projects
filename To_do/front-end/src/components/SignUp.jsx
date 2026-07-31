import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/signup", {
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

        alert("Signup Successfully");

        navigate("/");
      } else {
        alert(result.msg || "Signup Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-10 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800"
        >
          Create Account 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base"
        >
          Sign up to continue
        </motion.p>

        <form onSubmit={handleSignUp} className="space-y-5">

          {/* Name */}

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <label className="font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          {/* Email */}

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
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
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          {/* Password */}

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
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
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
            }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Create Account
          </motion.button>
        </form>

        {/* Footer */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-gray-600 mt-7 text-sm sm:text-base"
        >
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;