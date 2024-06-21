import React, { useEffect, useState } from "react";
import {
  Cascader,
  InputNumber,
  Button,
  Col,
  Form,
  Input,
  Row,
  message,
} from "antd";
import SideBar from "../DashboardSideBar/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApplyPosition.css";
import { UserAddOutlined } from "@ant-design/icons";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

console.log(socket);

// For Text Area
const { TextArea } = Input;

const ApplyPosition = () => {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAge, setNewAge] = useState();
  const [userRole, setUserRole] = useState();
  const [experience, setExperience] = useState();
  const [distric, setDistric] = useState();
  const [selectedUserRole, setSelectedUserRole] = useState([]);
  const [showAgeError, setAgeError] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [userRoleError, setUserRoleError] = useState(false);
  const [districtError, setDistrictError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);

// fetch role values
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await fetch("/userRoles.json");
        const data = await response.json();
        setUserRoles(data);
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, []);

  // fetch distric values
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/District.json");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  // User Role Validation
  const onUserRoleChange = (value, selectedOptions) => {
    setUserRoleError(!value || value.length === 0);
    setUserRole(value);
    setDistrictError(false);
    if (selectedOptions && selectedOptions[0]) {
      console.log(value, selectedOptions[0].value);
    } else {
      console.log(value, "No options selected");
    }
  };

  // District Validation
  const onDistrictChange = (value, selectedOptions) => {
    setUserRoleError(false);
    setDistrict(value);
    setDistrictError(!value || value.length === 0);
    console.log(value, selectedOptions);
    if (selectedOptions && selectedOptions[0]) {
      setDistric(selectedOptions[0].value);
    } else {
      setDistric(null);
      console.log(value, "No options selected");
    }
  };

  // Age Validation
  const handleAgeChange = (value) => {
    setNewAge(value);
    if (value === undefined || value === null) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
  };

  //Experience Validation
const handleExperienceChange = (e) => {
  const value = e.target.value;
  setExperience(value);
  setExperienceError(value ? value.trim() === "" : true);
};

  const userRoleFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const districtFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //   // GET CURRENT USER DATA
  const currentUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.user.messages.length > 0) {
        // console.log(res.data.user.messages[0]);
        message.success(res.data.user.messages[0]);
        // console.log(res.data.user);
      }

      console.log(res.data.user);
      setNewEmail(res.data.user.email);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

  // handle position registration
  const handleSubmit = async (values) => {

    if (
      FirstName === "" ||
      LastName === "" ||
      !newEmail ||
      !newAge ||
      userRoleError ||
      districtError ||
      experience.trim() === ""
    ) {
      alert("Please fill all the fields correctly!");
    } else {

    const messageData = {
      message: "Apply Position",
    };

    console.log(messageData);
    socket.emit("send_message", messageData);

    console.log(
      FirstName,
      LastName,
      newEmail,
      userRole ? userRole[0] : null,
      experience,
      district ? district[0] : null,
      newAge
    );

    try {
      // pass submit data to the backend
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/apply-position",

        {
          FirstName: FirstName,
          LastName: LastName,
          Email: newEmail,
          Age: newAge,
          UserRole: userRole ? userRole[0] : null,
          Experience: experience,
          Distric: district ? district[0] : null,
        }
      );

      message.success("Position Applying successfull");
      navigate("/dashboad");
    } catch (error) {
      message.error(error);
    }
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  return (
    <div>
      <SideBar>
        <div 
        style={{
          marginTop: "3vh",
        }}
        className="UserApplicationForm">
          <div
            className="UserApplicationFormHeader"
            style={{
              backgroundColor: "#15295E",
            }}
          >
            <h3
              style={{
                color: "white",
              }}
            >
              Application
            </h3>
          </div>

          <div className="UserApplicationFormApplication">
            <Form
              layout="verticle"
              onFinish={handleSubmit}
              className="m-3"
              style={{
                padding: "50px",
                backgroundColor: "white",
              }}
            >
              <label htmlFor="">First Name:</label>
              <Input
                type="text"
                id="FirstName"
                name="FirstName"
                className="formInput"
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
              {FirstName === "" && (
                <span style={{ color: "red", fontSize: "13px" }}>
                  First name cannot be empty!
                </span>
              )}
              <label htmlFor="">Last Name:</label>
              <Input
                type="text"
                id="LastName"
                name="LastName"
                className="formInput"
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
              {LastName === "" && (
                <span style={{ color: "red", fontSize: "13px" }}>
                  Last name cannot be empty!
                </span>
              )}

              <label htmlFor="">Email:</label>
              <Input
                type="email"
                id="Email"
                name="Email"
                className="formInput"
                // onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {newEmail ? " " : "Please Enter Your Email ! "}
              </p>

              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "50px" }}>
                  <label htmlFor="">Age:</label>
                  <InputNumber
                    type="number"
                    id="Age"
                    name="Age"
                    className="formInput"
                    value={newAge}
                    onChange={handleAgeChange}
                    min={16}
                    max={70}
                    required
                    style={{ width: "100%" }}
                  />
                  {showAgeError && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      Age cannot be empty!
                    </span>
                  )}
                </div>
                <div style={{ flex: 2 }}>
                  <label htmlFor="userRole">User Role:</label>
                  <Cascader
                    id="userRole"
                    options={userRoles}
                    onChange={onUserRoleChange}
                    placeholder="Select user role"
                    showSearch={{ filter: userRoleFilter }}
                    onSearch={(value) => console.log(value)}
                    className={userRoleError ? "ant-cascader-error" : ""}
                    required
                    style={{ width: "100%" }}
                  />
                  {userRoleError && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      User role cannot be empty!
                    </span>
                  )}
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <label htmlFor="district">District:</label>
                <Cascader
                  id="district"
                  options={districts}
                  onChange={onDistrictChange}
                  placeholder="Select district"
                  showSearch={{ filter: districtFilter }}
                  onSearch={(value) => console.log(value)}
                  className={districtError ? "ant-cascader-error" : ""}
                  required
                  style={{ width: "100%" }}
                />
                {districtError && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    District cannot be empty!
                  </span>
                )}
              </div>

              <label htmlFor="">Experience:</label>
              <div>
                <textarea
                  id="experience"
                  name="experience"
                  rows={10}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                  value={experience}
                  onChange={handleExperienceChange}
                />
                {experienceError && (
                  <span style={{ color: "red", fontSize: "13px" }}>
                    Experience cannot be empty!
                  </span>
                )}
              </div>

              <div className="buttonSet">
                <button className="approve userAppBTn">
                  <UserAddOutlined className="UserApplicationIcon" />
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default ApplyPosition;
