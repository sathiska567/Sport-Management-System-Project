// Importing necessary libraries and components
import "./UserApplication.css";

import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  CloseSquareOutlined,
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Avatar, Space, Badge } from "antd";
import ManageUser from "../icons/ManageUser.jsx";
import PendingActions from "../icons/PendingActions.jsx";
import Profile from "../icons/Profile.jsx";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Header, Sider, Content } = Layout;

// Navbar component
const UserValidation = () => {
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
    .post(
      "http://localhost:5000/addUserApplicationData",
      {
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

  // State variables for managing component state
  const [collapsed, setCollapsed] = useState(false);
  const [isHoveredButton1, setIsHoveredButton1] = useState(false);
  const [isHoveredButton2, setIsHoveredButton2] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  // Event handlers for mouse hover events
  const handleHoverButton1 = () => {
    setIsHoveredButton1(true);
  };

  const handleMouseLeaveButton1 = () => {
    setIsHoveredButton1(false);
  };

  const handleHoverButton2 = () => {
    setIsHoveredButton2(true);
  };

  const handleMouseLeaveButton2 = () => {
    setIsHoveredButton2(false);
  };

  // Event handler for menu item click
  const handleMenuItemClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  // Functional component to display text based on selected menu item
  const Text = ({ selectedMenuItem }) => {
    const text = {
      1: "Dashboard",
      2: "User Validation",
      3: "Search",
      4: "Manage",
      5: "My Profile",
    };

    return <p>{text[selectedMenuItem]}</p>;
  };

  // URL for the profile avatar
  const url =
    "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png";

  // Event handler for trigger button click
  const handleTriggerButtonClick = () => {
    setCollapsed(!collapsed);
  };

  // Get Database from the backend using Axios
  const [userData, setUserData] = useState({
    avatarUrl:
      "https://static.vecteezy.com/system/resources/previews/009/383/461/non_2x/man-face-clipart-design-illustration-free-png.png",
    username: "John Doe",
  });

  // JSX structure for the Navbar component
  return (
    <Layout className="ant-layout-sider-children">
      {/* Sidebar component */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={100} // Adjusted collapsed width
      >
        {/* Profile section */}
        <div className="profile">
          {collapsed ? (
            <Avatar
              className="profileAvatar"
              src={<img src={userData.avatarUrl} alt="avatar" />}
            />
          ) : (
            <>
              <Avatar
                className="profileAvatar"
                src={<img src={url} alt="avatar" />}
              />
              <div className="Username">{userData.username}</div>
            </>
          )}
        </div>

        {/* Other sections of the sidebar, such as menu items */}
        <div className="welcome">Welcome</div>
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={handleMenuItemClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#022C3B",
            onMouseEnter: "backgroundColor: red",
            width: "100%",
            height: "82.5vh",
            fontSize: "16px",
          }}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <PendingActions />,
              label: "User Validation",
            },
            {
              key: "4",
              icon: <ManageUser />,
              label: "Manage",
            },
            {
              key: "5",
              icon: <Profile />,
              label: "My Profile",
            },
            {
              key: "6",
              icon: <PoweroffOutlined />,
              label: "Log off",
              style: {
                position: "absolute",
                bottom: 0,
                backgroundColor: isHoveredButton1 ? "#D94D34" : "#022C3B",
                color: isHoveredButton1 ? "#E0F7FF" : "#E0F7FF",
                fontSize: "16px",
              },
              onMouseEnter: handleHoverButton1,
              onMouseLeave: handleMouseLeaveButton1,
            },
          ]}
        />
      </Sider>

      {/* Main content layout */}
      <Layout>
        {/* Header component */}
        <Header className="ant-layout-header">
          {/* Trigger button */}
          <Button
            className="trigger-button ant-btn"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleTriggerButtonClick}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              backgroundColor: isHoveredButton2 ? "#022C3B" : "#E0F7FF",
              color: isHoveredButton2 ? "#E0F7FF" : "#022C3B",
            }}
            onMouseEnter={handleHoverButton2}
            onMouseLeave={handleMouseLeaveButton2}
          />
          {/* Title and notification sections */}
          <span className="title">Sports Management System</span>
          <span className="notificaiton">
            <a href="www">
              <Space size={24}>
                {/* Notification badge */}
                <Badge count={1}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </Space>
            </a>
          </span>
          {/* Email communication section */}
          <a href="www">
            <span className="emailCommunication">
              <MailOutlined />
            </span>
          </a>
        </Header>

        {/* Title bar displaying the selected menu item */}
        <div className="title_bar">
          <Text className="menuTitle" selectedMenuItem={selectedMenuItem} />
        </div>

        {/* Content section with statistics */}
        <Content
          className="ant-layout-content"
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
            height: "100%",
            background: "#E9F9FF",
          }}
        >
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
        </Content>
      </Layout>
    </Layout>
  );
};

// Exporting the Navbar component
export default UserValidation;
