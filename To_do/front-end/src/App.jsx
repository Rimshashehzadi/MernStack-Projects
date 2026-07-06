import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'

import List from './List'
import UpdateTask from './components/UpdatTask'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<List/>} />
        <Route path='/add' element= {<AddTask/>} />
        <Route path='/update/:id' element= {<UpdateTask/>} />
      </Routes>
    </div>
  )
}

export default App