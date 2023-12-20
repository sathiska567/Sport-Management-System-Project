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
  const [location, setLocation] = useState();
  const [userRole, setUserRole] = useState();
  const [userApplicationData, setUserApplicationData] = useState([]);
  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/addUserApplicationData", {
        fname,
        lname,
        email,
        age,
        dob,
        experience,
        winningHistory,
        location,
        userRole,
      })
      .then((result) => {
        console.log(result);
        alert("Data successfully inserted into the database!");
      })
      .catch((err) => console.error("Axios Error:", err));
  };
  // End

  // Get the data from the backend
  // Start
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUserApplicationData")
      .then((result) => {
        const userApplicationData = result.data; // Assuming result.data contains the user data

        // Update state variables with data from the backend
        setUserApplicationData(userApplicationData);
        setFname(userApplicationData.firstName);
        setLname(userApplicationData.lastName);
        setEmail(userApplicationData.email);
        setAge(userApplicationData.age);
        setDob(userApplicationData.dob);
        setExperience(userApplicationData.experience);
        setWinningHistory(userApplicationData.winningHistory);
        setLocation(userApplicationData.location);
        setUserRole(userApplicationData.userRole);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
      });
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
        <form onSubmit={Submit}>
          <label htmlFor="">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={(e) => setFname(e.target.value)}
          />
          <label htmlFor="">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={(e) => setLname(e.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
          />

          <label htmlFor="">Experience:</label>
          <textarea
            id="experience"
            name="experience"
            rows="10"
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
          <label htmlFor="">Winning History:</label>
          <textarea
            id="winningHistory"
            name="winningHistory"
            rows="10"
            onChange={(e) => setWinningHistory(e.target.value)}
          ></textarea>
          <label htmlFor="">Location:</label>
          <input
            type="Location"
            id="Location"
            name="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="">User Role:</label>
          <input
            type="UserRole"
            id="UserRole"
            name="UserRole"
            onChange={(e) => setUserRole(e.target.value)}
          />
          <div class="buttonSet">
            <button class="submit userAppBTn">
              <CheckCircleOutlined className="UserApplicationIcon" />
              Submit
            </button>
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
