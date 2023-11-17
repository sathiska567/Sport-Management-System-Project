import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './admin/Register'
import Login from './admin/Login'
import AdminDashboard from './admin/AdminDashboard'


export default function App() {
  const a = window.localStorage.getItem("isLoggedIn");
  console.log(a, "login");
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path='/admin/register' element={<Register/>}></Route>
          <Route path='/admin/login' element={<Login/>} ></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
