import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";
import Register from "./Pages/Aatheek/user/Register.jsx";
import Login from "./Pages/Aatheek/user/Login.jsx";
import ForgotPassword from "./Pages/Aatheek/user/ForgotPass.jsx";
import OTPPage from "./Pages/Aatheek/user/Otp.jsx";
import ResetPassword from "./Pages/Aatheek/user/ResetPass.jsx";
import Dashboard from "./Pages/Aatheek/user/userDashboard.jsx";



function App() {

  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn, 'login');



  return (
    <BrowserRouter>
  <Routes>
      {/* user login and registration */}
      <Route 
      path="/register" 
      element={<Register/>} 
      />

      <Route 
      path="/" 
      element={<Login />} 
      />

      <Route 
      path='/forgot-password' 
      element={<ForgotPassword />} 
      />

      <Route 
      path='/otp-reset-pass' 
      element={<OTPPage />} 
      />

      <Route 
      path='/reset-pass' 
      element={<ResetPassword />} 
      />


    {/* after login routes */}
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />

        <Route
          path="/UserValidation"
          element={<UserApplicationTable />}
        />
        <Route
          // Need to change after add table of application
          path="/AdminDashboard/UserValidation/view"
          element={<UserApplication />}
        />









      </Routes>
    </BrowserRouter>

    // <div className="App">

    //   <header className="App-header">
    //     <Navbar/>

    //   </header>
    // </div>
  );
}

export default App;
