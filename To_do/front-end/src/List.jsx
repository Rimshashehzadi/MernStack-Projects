import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const List = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks", {
      credentials: "include",
    });

    list = await list.json();

    if (list.success) {
      setTaskData(list.result);
    } else {
      alert("Try again later");
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch("http://localhost:3200/delete-task/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    item = await item.json();

    if (item.success) {
      getListData();
    } else {
      alert("Try again later");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Heading */}

        <div className="bg-linear-to-r from-indigo-600 to-blue-600 text-white text-center py-8 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Task List
          </motion.h1>

          <p className="mt-2 text-sm md:text-lg">
            Organize and manage your daily tasks
          </p>
        </div>

        {/* Desktop Header */}

        <div className="hidden lg:grid grid-cols-12 bg-gray-100 px-6 py-4 font-semibold text-gray-700">
          <div>Sr.</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-6">Description</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {taskData.length > 0 ? (
          taskData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {/* Desktop */}

              <div className="hidden lg:grid grid-cols-12 items-center gap-4 px-6 py-5 border-b hover:bg-indigo-50 transition">

                <div>
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="col-span-3 font-semibold">
                  {item.title}
                </div>

                <div className="col-span-6 text-gray-600">
                  {item.description}
                </div>

                <div className="col-span-2 flex justify-center gap-2">

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTask(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={"update/" + item._id}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block"
                    >
                      Update
                    </Link>
                  </motion.div>

                </div>
              </div>

              {/* Mobile Card */}

              <div className="lg:hidden p-4 border-b">

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white shadow-lg rounded-2xl p-5"
                >
                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <h2 className="font-bold text-lg">
                        {item.title}
                      </h2>

                    </div>

                  </div>

                  <p className="text-gray-600 mt-4">
                    {item.description}
                  </p>

                  <div className="flex gap-3 mt-5">

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => deleteTask(item._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Link
                        to={"update/" + item._id}
                        className="block text-center bg-green-600 text-white py-2 rounded-lg"
                      >
                        Update
                      </Link>
                    </motion.div>

                  </div>

                </motion.div>

              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-700">
              No Tasks Found
            </h2>

            <p className="mt-3 text-gray-500">
              Add your first task to get started.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default List;