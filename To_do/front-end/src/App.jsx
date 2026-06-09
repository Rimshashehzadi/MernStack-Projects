import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className= ''>
      <NavBar/>
      <Routes>
        <Route path='/' element={<h1 className='text-4xl font-bold text-center mt-10'>Welcome to To Do App</h1>} />
        <Route path='/add' element={<h1 className='text-4xl font-bold text-center mt-10'>Add Task Page</h1>} />
      </Routes>
    </div>
  )
}

export default App