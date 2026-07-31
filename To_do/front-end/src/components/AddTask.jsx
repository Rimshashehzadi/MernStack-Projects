import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!taskData.title || !taskData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      let result = await fetch("http://localhost:3200/add-task", {
        method: "POST",
        body: JSON.stringify(taskData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (result.success) {
        alert("Task Added Successfully");
        navigate("/");
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-800"
        >
          Add New Task
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-gray-500 mt-3 mb-8 text-sm sm:text-base"
        >
          Create and organize your daily tasks.
        </motion.p>

        <div className="space-y-6">

          {/* Task Title */}

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block mb-2 text-gray-700 font-semibold">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </motion.div>

          {/* Description */}

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block mb-2 text-gray-700 font-semibold">
              Description
            </label>

            <textarea
              rows={6}
              placeholder="Enter task description..."
              value={taskData.description}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-300 p-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </motion.div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 25px rgba(79,70,229,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Add Task
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default AddTask;