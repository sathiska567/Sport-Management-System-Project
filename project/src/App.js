import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";
import Register from "./Pages/user/Register.jsx";
import ForgotPassword from "./Pages/user/ForgotPass.jsx";
import OTPPage from "./Pages/user/Otp.jsx"
import ResetPassword from "./Pages/user/ResetPass.jsx"
import ApplyPosition from "./Components/ApplyPosition/ApplyPosition.jsx";
import NewLogin from "./Components/Login/Login.jsx"



function App() {

  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn, 'login');

  return (
    <BrowserRouter>
  <Routes>
      {/* user login and registration */}
      <Route 
      path="/register" 
      element={<Register />} 
      />

      {/* <Route 
      path="/" 
      element={<Login />} 
      /> */}

      <Route 
      path="/" 
      element={<NewLogin />} 
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



    {/* Apply position routes */}
    <Route 
     path="/apply-position"
     element={<ApplyPosition/>} 
     />


    {/* after login routes */}
        <Route
          path="/dashboad"
          element={<StatCards />}
        />

        <Route
          path="/UserValidation"
          element={<UserApplicationTable />}
        />
        <Route
          // Need to change after add table of application
          path="/Applying-Details"
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
