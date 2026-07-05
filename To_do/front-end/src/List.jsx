import React from 'react'
import { useState, useEffect } from 'react'

const List = () => {
  const [taskData, setTaskData] = useState()

  useEffect(() => {
    getListData();

  }, [])

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks")
    list = await list.json()
    if (list.success) {
      setTaskData(list.result)
    }
    console.log(list)

  }
  const deleteTask = async (id) => {
    let item = await fetch('http://localhost:3200/delete-task/' +id, {
      method: "DELETE"
    })
    item = await item.json()
    if (item.success) {
      getListData()
      // console.log("Task deleted successfully")  

    }
  }

  return (
    <div className="  py-10 px-4 max-w-6xl mx-auto shadow-2xl rounded-2xl mt-16">
      <div className="text-center mb-5 ">
        <h1 className="text-2xl font-semibold text-slate-800">
          Task List
        </h1>

        <p className="text-gray-700 mt-2 text-lg">
          Organize and manage your daily tasks
        </p>
      </div>

      {/* <h1 className='text-4xl font-bold text-center mt-10'>List of Tasks</h1> */}
      <ul className="hidden md:grid grid-cols-14 bg-linear-to-r from-indigo-600 to-blue-500 text-white px-8 py-5 font-semibold text-lg">
        <li className='col-span-1'>S.No</li>
        <li className='col-span-4'>Title</li>
        <li className='col-span-7'>Description</li>
        <li className='col-span-2'>Actions</li>
      </ul>
      {taskData && taskData.length > 0 ? (
        taskData.map((item, index) => (
          <ul key={item._id} className="grid grid-cols-14 items-center px-8 py-6 border-b border-b-gray-700 hover:bg-indigo-50 hover:scale-[1.01] transition-all duration-300">
            <li className='col-span-1 bg-indigo-600 text-white h-9 w-9 rounded-full flex items-center justify-center font-bold'>{index + 1}</li>
            <li className='col-span-4 text-lg font-medium'>{item.title}</li>
            <li className='col-span-7 text-gray-700 font-normal text-lg'>{item.description}</li>
            <li className='col-span-2'>
              <button onClick={()=>deleteTask(item._id)} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">
                Delete
              </button>
            </li>
          </ul>

        ))

      ) :
        (
          <div className="py-20 text-center">
            <div className="text-7xl mb-5"></div>
            <h2 className="text-3xl font-bold text-gray-700">
              No Tasks Found
            </h2>
            <p className="text-gray-500 mt-2">
              Add your first task to get started.
            </p>
          </div>
        )}
    </div>

  )
}
export default List;
