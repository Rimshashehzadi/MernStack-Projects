import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
// import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>} />
          {/* <Route path='/contact' element={<Contact/>} /> */}
      </Routes>
    </div>
  )
}

export default App