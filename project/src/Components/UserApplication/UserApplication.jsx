// Importing necessary libraries and components
import "./UserApplication.css";
import React, { useState, useEffect } from "react";
import SideBar from "../DashboardSideBar/SideBar";
import {
  CloseSquareOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useLocation } from "react-router-dom";


// Navbar component
const UserApplication = () => {
  // add data to back end
  // Start
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [dob, setDob] = useState();
  const [experience, setExperience] = useState();
  const [winningHistory, setWinningHistory] = useState();
  const [UserLocation, setUserLocation] = useState();
  const [userRole, setUserRole] = useState();
  const [userApplicationData, setUserApplicationData] = useState([]);

  const location = useLocation();
  console.log(location);

const handleApprove = async()=>{

}


  // End

  // Get the data from the backend
  // Start
  useEffect(() => {
    
  }, []);
  // End

  // JSX structure for the Navbar component
  return (
    <SideBar>
    <div className="UserApplicationForm">
      <div className="UserApplicationFormHeader">
        <h3>Application</h3>
        <a href="http://localhost:3000/AdminDashboard/UserValidation">
          <span className="UserApplicationCloseBtn">
            <CloseSquareOutlined />
          </span>
        </a>
      </div>
      <div className="UserApplicationFormApplication">
        <form>
          <label htmlFor="">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={location.state.record.userName}
            readOnly={true}
          />
          <label htmlFor="">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            readOnly={true}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly={true}
          />
          <label htmlFor="">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            readOnly={true}
          />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            readOnly={true}
          />

          <label htmlFor="">Experience:</label>
          <textarea
            id="experience"
            name="experience"
            rows="10"
            readOnly={true}
          ></textarea>
          <label htmlFor="">Winning History:</label>
          <textarea
            id="winningHistory"
            name="winningHistory"
            rows="10"
            readOnly={true}
          ></textarea>
          <label htmlFor="">UserLocation:</label>
          <input
            type="UserLocation"
            id="UserLocation"
            name="UserLocation"
            readOnly={true}
          />
          <label htmlFor="">User Role:</label>
          <input
            type="UserRole"
            id="UserRole"
            name="UserRole"
            readOnly={true}
          />
          <div class="buttonSet">
            <button class="approve userAppBTn">
              <UserAddOutlined className="UserApplicationIcon" />
              Accept
            </button>
            <button class="pending userAppBTn">
              <ClockCircleOutlined className="UserApplicationIcon" />
              Pending
            </button>
            <button class="reject userAppBTn">
              <CloseCircleOutlined className="UserApplicationIcon" />
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
    </SideBar>
  );
};

// Exporting the Navbar component
export default UserApplication;
