import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

      axios.get('http://localhost:5050/admin/dashboard')
        .then(result => {
          if (token) {
            var mess = "This is a protected route!";
          }else{
            mess = result.data.message;
          }
          console.log(result);
          if (mess !== "This is a protected route!") {
            navigate('/admin/login');
          } else {
            // Set loading to false when the data is fetched successfully
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
          // You can choose whether to set loading to false here or not
          // setLoading(false);
        });
  }, [navigate]);

  useEffect(() => {
    // Define your function here
    const myFunction = () => {
      console.log('Running myFunction');
      // Add your logic here
      if(!localStorage.getItem('token')){
        window.location.reload();
      }

    };

    // Set up an interval to run the function every 1000 milliseconds (1 second)
    const intervalId = setInterval(myFunction, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div className='dash d-flex justify-content-center vh-100'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Your dashboard content goes here */}
          <h1 style={{color:'white'}}>Welcome to the Admin Dashboard!</h1>
          <br/><br/>
          <center><button className='btn btn-danger' onClick={()=>{localStorage.removeItem('token'); window.location.reload()}}>Logout</button></center>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
