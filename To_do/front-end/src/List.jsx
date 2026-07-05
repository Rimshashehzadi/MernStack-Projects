import React from 'react'
import { useState } from 'react'

const List = () => {
    const[taskData,setTaskData] = useState()
  return (
    <div>
        <h1 className='text-4xl font-bold text-center mt-10'>List of Tasks</h1>
        <ul>
            <li>S.No</li>
            <li>Title</li>
            <li>Description</li>
            {
taskdata && taskData.map((task,index)=>(
    <>
    <li>{index+1}</li>
    <li>{item.title}</li>
    <li>{item.description}</li>
    </>
            }
        </ul>

    </div>
  )
}

export default List