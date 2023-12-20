import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminDashboard" element={<StatCards />} />
        <Route
          path="/AdminDashboard/UserValidation"
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
