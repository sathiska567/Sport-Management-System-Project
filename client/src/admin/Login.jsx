// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await axios.post('http://localhost:5050/admin/login', values)
    .then(res => {
        console.log('Login successful');
        console.log(res.data);
        localStorage.setItem('username', values.username);
        localStorage.setItem('token', res.data.token);
      // Redirect to the admin dashboard or another page after successful login
      navigate('/admin/dashboard');
      })
    .catch (error=> {
      // Handle login error (display error message, etc.)
      console.error('Login error:', error.response.data.message);
      setError(error.response.data.message); // Set the error message state
    
  })}

  return (
    <div className='dash d-flex justify-content-center align-items-center  vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <center><h2>Admin Log-In</h2></center>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>User Name</strong></label>
            <input onChange={e => setValues({ ...values, username: e.target.value })} className='form-control rounded-0' type="text" placeholder='Enter Name' name='name' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' type="password" placeholder='Enter Password' name='password' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
          {/* Display the error message if it exists */}
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          <p> </p>
          <Link to="/admin/register" type='submit' className='btn btn-primary btn-default  border w-100 rounded-0'>Sign Up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;