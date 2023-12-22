// Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to clear the error message
  const clearError = () => {
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear the error message on form submission
    clearError();

    // Validation checks
    if (!values.username || !values.password || !values.cpassword) {
      setError('All fields must be filled out');
      return;
    }

    if (values.password !== values.cpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/admin/register', values);

      // Check if registration was successful based on the response from the server
      if (response.data.success) {
        //setError(response.data.message)
        console.log('Admin registered successfully!')
        // Redirect to the login page after successful registration
        navigate('/admin/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
      //console.error('Registration error:', error.message);
      setError(error.response.data.message); // Set the error message state
    }
  };

  return (
    <div className='dash d-flex justify-content-center align-items-center  vh-100'>
      <div className='bg-white p-3 rounded w-md-50 w-lg-25'>
        <center><h2>Admin Sign-Up</h2></center>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>User Name</strong></label>
            <input
              onChange={(e) => {
                setValues({ ...values, username: e.target.value });
                clearError(); // Clear the error on input change
              }}
              className='form-control rounded-0'
              type="text"
              placeholder='Enter Name'
              name='name'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                clearError(); // Clear the error on input change
              }}
              type="email"
              placeholder='Enter Email'
              name='email'
              className='form-control rounded-0'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
                clearError(); // Clear the error on input change
              }}
              className='form-control rounded-0'
              type="password"
              placeholder='Enter Password'
              name='password'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="cpassword"><strong>Confirm Password</strong></label>
            <input
              onChange={(e) => {
                setValues({ ...values, cpassword: e.target.value });
                clearError(); // Clear the error on input change
              }}
              className='form-control rounded-0'
              type="password"
              placeholder='Confirm Password'
              name='cpassword'
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>

          {/* Display the error message if it exists */}
          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <p>You agree to our terms and conditions</p>
          <Link to='/admin/login' type='submit' className='btn btn-primary  btn-default border text-decoration-none w-100 rounded-0'>Log In</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
