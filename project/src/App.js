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
import FinalizeFixture from "./Components/Fixture/FinalizeFixture.jsx";
import FinalizeFixtureUpdate from "./Components/Fixture/FinalizeFixtureUpdate.jsx";
import FinalUpdate from "./Components/Fixture/FinalUpdate.jsx";
import SetFixtureRound from "./Components/Fixture/SetFixtureRound.jsx";
import AddTeam from "./Components/Fixture/AddTeam.jsx";
import EOStats from "./Components/EventOrganizer/EOStats/EOStats.jsx"
import CreateFixture from "./Components/EventOrganizer/EOCreateFixture/EOCreateFixture.jsx";

function App() {

  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn, 'login');

  return (
    <BrowserRouter>
      <Routes>
        {/* user login and registration */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* <Route 
      path="/" 
      element={<Login />} 
      /> */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <NewLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/otp-reset-pass"
          element={
            <PublicRoute>
              <OTPPage />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-pass"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Apply position routes */}
        <Route
          path="/apply-position"
          element={
            <ProtectedRoute>
              <ApplyPosition />
            </ProtectedRoute>
          }
        />

        {/* after login routes */}
        <Route
          path="/dashboad"
          element={
            <ProtectedRoute>
              <StatCards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/UserValidation"
          element={
            <ProtectedRoute>
              <UserApplicationTable />
            </ProtectedRoute>
          }
        />
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
          path="/profile"
          element={
            <ProtectedRoute>
              <PlayerProfile />
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
          path="/final-fixture"
          element={
            <ProtectedRoute>
              <FinalizeFixture />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/update-fixture"
          element={
            <ProtectedRoute>
              <FinalizeFixtureUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/final-update-fixture"
          element={
            <ProtectedRoute>
              <FinalUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/test-fixture"
          element={
            <ProtectedRoute>
              <SetFixtureRound />
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
      </Routes>

      <Routes>
        <Route
          path="/create-fixture"
          element={
            <ProtectedRoute>
              <CreateFixture />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/eo-stats"
          element={
            <ProtectedRoute>
              <EOStats />
            </ProtectedRoute>
          }
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
