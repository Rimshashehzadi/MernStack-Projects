import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'

import List from './List'
import UpdateTask from './components/UpdatTask'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Protected><List/></Protected>} />
        <Route path='/add' element= {<Protected><AddTask/></Protected>} />
        <Route path='/update/:id' element= {<UpdateTask/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App