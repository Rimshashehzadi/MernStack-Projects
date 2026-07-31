import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    _id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    getTask();
  }, [id]);

  const getTask = async () => {
    try {
      const response = await fetch(`http://localhost:3200/task/${id}`, {
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setTaskData(result.result);
      } else {
        alert(result.message || "Task not found");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load task");
    }
  };

  const updateTask = async () => {
    try {
      const response = await fetch("http://localhost:3200/update-task", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Task Updated Successfully");
        navigate("/");
      } else {
        alert(result.message || "Update Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800"
        >
          Update Task
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 mt-2 mb-8 text-sm sm:text-base"
        >
          Edit your task information below.
        </motion.p>

        {/* Title */}

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-5"
        >
          <label className="block mb-2 font-semibold text-gray-700">
            Task Title
          </label>

          <input
            type="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                title: e.target.value,
              })
            }
            placeholder="Enter task title"
            className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Description */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>

          <textarea
            rows={6}
            value={taskData.description}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                description: e.target.value,
              })
            }
            placeholder="Enter task description"
            className="w-full rounded-xl border border-gray-300 p-3 outline-none resize-none transition focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Button */}

        <motion.button
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 10px 25px rgba(79,70,229,0.3)",
          }}
          whileTap={{ scale: 0.96 }}
          onClick={updateTask}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
        >
          Update Task
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UpdateTask;