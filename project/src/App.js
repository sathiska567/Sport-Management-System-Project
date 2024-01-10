import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";
import Register from "./Pages/user/Register.jsx";
import ForgotPassword from "./Components/Login/ForgetPassword.jsx";
import OTPPage from "./Components/Login/OTPPage.jsx"
import ResetPassword from "./Components/Login/CreateNewPassword.jsx"
import ApplyPosition from "./Components/ApplyPosition/ApplyPosition.jsx";
import NewLogin from "./Components/Login/Login.jsx";
import PlayerProfile from "./Components/PlayerComponents/PlayerProfile.jsx";
import PublicRoute from "./Components/PublicRoute/PublicRoute.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.js";
import SignUp from "./Components/Login/SignUp.jsx";
import Fixture from "./Components/Fixture/Fixture.jsx";
import AddTeam from "./Components/Fixture/AddTeam.jsx"


function App() {

  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn, 'login');

  return (
    <BrowserRouter>
      <Routes>
        {/* user login and registration */}
        <Route path="/register" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />

        {/* <Route 
      path="/" 
      element={<Login />} 
      /> */}

        <Route

          path="/" element={
            <PublicRoute>
              <NewLogin />
            </PublicRoute>

          }

        />

        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>

        } />

        <Route path="/otp-reset-pass" element={
        
        <PublicRoute>
          <OTPPage />
        </PublicRoute>
        
        } />

        <Route path="/reset-pass" element={
          <PublicRoute>
            <ResetPassword/>
          </PublicRoute>

        } />

        {/* Apply position routes */}
        <Route path="/apply-position" element={
          <ProtectedRoute>
            <ApplyPosition />
          </ProtectedRoute>
        } />

        {/* after login routes */}
        <Route path="/dashboad" element={
          <ProtectedRoute>
            <StatCards />
          </ProtectedRoute>
        } />

        <Route path="/UserValidation" element={
          <ProtectedRoute>
            <UserApplicationTable />
          </ProtectedRoute>
        } />
        <Route
          // Need to change after add table of application
          path="/Applying-Details"
          element={
            <ProtectedRoute>
              <UserApplication />
            </ProtectedRoute>
          }
        />
        <Route
          // Need to change after add table of application
          path="/fixture"
          element={
            <ProtectedRoute>
               <Fixture />
            </ProtectedRoute>
          }
        />
        <Route
          // Need to change after add table of application
          path="/addTeam"
          element={
            <ProtectedRoute>
               <AddTeam />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/create-new-password"
          element={
            <ProtectedRoute>
              
            </ProtectedRoute>
          }

        /> */}


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
