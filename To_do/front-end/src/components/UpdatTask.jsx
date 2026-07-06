import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const UpdateTask = () => {
    const [taskData, setTaskData] = useState()
    //  const nevigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        getTask(id)

    }, [])

    const getTask = async (id) => {
        let task = await fetch("http://localhost:3200/task/" + id);
        task = await task.json()
        if (task.result) {
            setTaskData(task.result)
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                    Update Task
                </h1>


                {/* Task */}
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="task"
                        className="block mb-2 text-sm sm:text-base font-medium text-gray-700"
                    >
                        Task
                    </label>

                    <input
                        type="text"
                        value={taskData?.title}
                        onChange={(event) => setTaskData({ ...taskData, title: event.target.value })}
                        id="task"
                        name="task"
                        placeholder="Enter task title"
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm sm:text-base font-medium text-gray-700"
                    >
                        Description
                    </label>

                    <textarea
                        rows={5}
                        value={taskData?.description}
                        onChange={(event) => setTaskData({ ...taskData, description: event.target.value })}
                        id="description"
                        name="description"
                        placeholder="Enter task description..."
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>

                {/* Button */}
                <button
                    type="submit"

                    className="w-full rounded-lg bg-blue-600 py-3 text-white text-sm sm:text-base font-semibold transition duration-300 hover:bg-blue-700 active:scale-95"
                >
                    Update Task
                </button>

            </div>
        </div>
    );
};

export default UpdateTask;