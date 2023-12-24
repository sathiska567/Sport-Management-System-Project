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
import { useLocation, useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

  const handleStatus = async(id,status)=>{

      console.log(id,status);
      // const res = await axios.post("http://localhost:8080/api/v1/admin/handle-status")
      // navigate("/dashboad")
      
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
        {/* <a href="http://localhost:3000/AdminDashboard/UserValidation">
          <span className="UserApplicationCloseBtn">
            <CloseSquareOutlined />
          </span>
        </a> */}
      </div>
      <div className="UserApplicationFormApplication">
        <form>
          <label htmlFor="">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={location.state?.record?.FirstName}
            readOnly={true}
          />
          <label htmlFor="">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={location.state?.record?.LastName}
            readOnly={true}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly={true}
            value={location.state?.record?.Email}
          />
          <label htmlFor="">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            readOnly={true}
            value={location.state?.record?.Age}
          />

          <label htmlFor="">Experience:</label>
          <textarea
            id="experience"
            name="experience"
            rows="10"
            readOnly={true}
            value={location.state?.record?.Experience}

          ></textarea>
          {/* <label htmlFor="">Winning History:</label>
          <textarea
            id="winningHistory"
            name="winningHistory"
            rows="10"
            readOnly={true}
          ></textarea> */}
          {/* <label htmlFor="">UserLocation:</label>
          <input
            type="UserLocation"
            id="UserLocation"
            name="UserLocation"
            readOnly={true}
          /> */}
          <label htmlFor="">User Role:</label>
          <input
            type="UserRole"
            id="UserRole"
            name="UserRole"
            readOnly={true}
            value={location.state?.record?.UserRole}            
          />
          <div class="buttonSet">
            <button class="approve userAppBTn" onClick={()=>handleStatus(location.state?.record?._id,"Approve")}>
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
