import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './List'

const App = () => {
  return (
    <div className= ''>
      <NavBar/>
      <Routes>
        <Route path='/' element={<List/>} />
        <Route path='/add' element= {<AddTask/>} />
      </Routes>
    </div>
  )
}

export default App