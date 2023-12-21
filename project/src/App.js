import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.js";
import PublicRoute from "./Components/PublicRoute/PublicRoute.js";
import Login from "./Pages/LoginPage.jsx";
import Register from "./Pages/RegisterPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
                <StatCards />
          </ProtectedRoute>
            
        
        } />

       {/* All user Login */}
       <Route path="/login" element={
              <PublicRoute>
                    <Login />
              </PublicRoute>
               
             
          } />
          
          {/* All user registration */}
          <Route path="/register" element={
             
               <PublicRoute>
                 <Register />
               </PublicRoute>
            
          } /> 



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
