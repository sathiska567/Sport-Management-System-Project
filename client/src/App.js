import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './user/Register';
import Login from './user/Login';
import ForgotPassword from './user/ForgotPass';
import OTPPage from './user/Otp';
import ResetPassword from './user/ResetPass';
import Dashboard from './user/userDashboard';

export default function App() {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn, 'login');

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path='/user/forgot-password' element={<ForgotPassword/>} />
          <Route path='/user/otp-reset-pass' element={<OTPPage/>} />
          <Route path='/user/reset-pass' element={<ResetPassword/>} />

          <Route path='/user/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
