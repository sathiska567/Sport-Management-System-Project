// Importing necessary libraries and components
import "./SideBar.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Avatar, Space, Badge } from "antd";
import ManageUser from "../icons/ManageUser.jsx";
import PendingActions from "../icons/PendingActions.jsx";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Header, Sider } = Layout;

// Navbar component
const SideBar = ({ children }) => {
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

  useEffect(() => {
    // Replace 'your_backend_api/user_data' with your actual API endpoint for fetching user data
    axios
      .get("http://localhost:8080/demo")
      .then((response) => {
        const data = response.data;
        setUserData({
          avatarUrl: data.avatarUrl,
          username: data.username,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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
          selectedKeys={[selectedMenuItem]}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: "#022C3B",
            width: "100%",
            height: "82.5vh",
            fontSize: "16px",
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PendingActions />}>
            <Link to="/UserValidation">User Validation</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ManageUser />}>
            <Link to="/Manage">Manage</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<PoweroffOutlined />}
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: isHoveredButton1 ? "#D94D34" : "#022C3B",
              color: isHoveredButton1 ? "#E0F7FF" : "#E0F7FF",
              fontSize: "16px",
            }}
            onMouseEnter={handleHoverButton1}
            onMouseLeave={handleMouseLeaveButton1}
          >
            <Link to="/LogOff">Log Off</Link>
          </Menu.Item>
        </Menu>
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
        {/* Main content */}
        {children}
      </Layout>
    </Layout>
  );
};

// Exporting the Navbar component
export default SideBar;
