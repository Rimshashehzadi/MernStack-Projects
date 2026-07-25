import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState();

  const handleSignUp = async () =>{
    console.log(userData);
    let result = await fetch('http://localhost:3200/signup' ,{
       method: 'Post',
      body:JSON.stringify(userData),
      headers:{
        'Content-Type': 'Application/json'
      }
    })
      
     
    
  }

 

 

  return (
    // <div className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">
     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-100 via-white to-indigo-100">

     <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign up to continue
        </p>

        <form  className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="" className="text-gray-700 font-medium">Name</label>

            <input
              type="text"
              name="name"
               onChange={(event) => setUserData({...userData,name:event.target.value})}
              placeholder="Enter your name"
              // value={userData.name}
              // onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}

          <div>
            <label htmlFor="" className="text-gray-700 font-medium">Email</label>

            <input
              type="email"
              name="email"
               onChange={(event) => setUserData({...userData,email:event.target.value})}
              placeholder="Enter your email"
              // value={userData.email}
              // onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div>
            <label htmlFor="" className="text-gray-700 font-medium">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(event) => setUserData({...userData,password:event.target.value})}
              // value={userData.password}
              // onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
          onClick={handleSignUp}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 ml-2 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;