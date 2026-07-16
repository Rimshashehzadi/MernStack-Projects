import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [taskData, setTaskData] = useState({
        _id: "",
        title: "",
        description: "",
    });

    useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        try {
            let response = await fetch(`http://localhost:3200/task/${id}`);
            let result = await response.json();

            if (result.success) {
                setTaskData(result.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async () => {
        try {
            let response = await fetch("http://localhost:3200/update-task", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            let result = await response.json();

            if (result.success) {
                alert("Task Updated Successfully");
                navigate("/");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Update Task
                </h1>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
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
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-medium">
                        Description
                    </label>

                    <textarea
                        rows="5"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                description: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    onClick={updateTask}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                    Update Task
                </button>
            </div>
        </div>
    );
};

export default UpdateTask;