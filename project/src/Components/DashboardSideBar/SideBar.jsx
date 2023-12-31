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

import { Layout, Menu, Button, Avatar, Space, Badge, message } from "antd";
import ManageUser from "../icons/ManageUser.jsx";
import PendingActions from "../icons/PendingActions.jsx";
import axios from "axios";
import { adminMenu, userMenu } from "../../Data/Data.js";

// Destructuring components from Ant Design's Layout
const { Header, Sider } = Layout;

// Navbar component
const SideBar = ({ children }) => {
  // State variables for managing component state
  const [collapsed, setCollapsed] = useState(false);
  const [isHoveredButton1, setIsHoveredButton1] = useState(false);
  const [isHoveredButton2, setIsHoveredButton2] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  // set name
  const [currentUserName, setCurrentUsername] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [positionNotification, setPositionNotification] = useState();

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

      console.log(res.data.user.notification[0]);

      setPositionNotification(res.data.user.notification.length);

      setCurrentUsername(res.data.user.username);
      setIsAdmin(res.data.user.isAdmin);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
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
    //  call getCurrentUser function
    currentUserData();

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

  // get admin or not status
  const sideBarMenu = isAdmin ? adminMenu : userMenu;

  // JSX structure for the Navbar component
  return (
    <>
      {isAdmin ? (
        <Layout className="ant-layout-sider-children">
          {/* Sidebar component */}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={100} // Adjusted collapsed width
          >
            {/* Profile section */}
            <div style={{ backgroundColor: "#15295E" }} className="profile">
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
                  <div style={{ color: "white" }} className="Username">
                    {currentUserName}
                  </div>
                </>
              )}
            </div>

            {/* Other sections of the sidebar, such as menu items */}
            <div style={{ color: "white" }} className="welcome">
              Welcome
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              onSelect={handleMenuItemClick}
              selectedKeys={[selectedMenuItem]}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "#15295E",
                width: "100%",
                height: "82.5vh",
                fontSize: "16px",
              }}
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/dashboad">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PendingActions />}>
                <Link to="/UserValidation">User Validation</Link>
              </Menu.Item>
              {/* <Menu.Item key="3" icon={<ManageUser />}>
                <Link to="/Manage">Notification</Link>
              </Menu.Item> */}
              <Menu.Item
                key="4"
                icon={<PoweroffOutlined />}
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: isHoveredButton1 ? "#D94D34" : "#15295E",
                  color: isHoveredButton1 ? "white" : "white",
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
                  backgroundColor: isHoveredButton2 ? "#526CAE" : "#15295E",
                  color: isHoveredButton2 ? "white" : "white",
                }}
                onMouseEnter={handleHoverButton2}
                onMouseLeave={handleMouseLeaveButton2}
              />
              {/* Title and notification sections */}
              <span
                className="title"
                style={{
                  color: "white",
                  marginLeft: "75px",
                  letterSpacing: "1px",
                  fontSize: "22px",
                  fontWeight: "regular",
                }}
              >
                GameSync Pro
              </span>
              <span style={{ color: "white" }} className="notificaiton">
                <a href="/UserValidation">
                  <Space size={24}>
                    {/* Notification badge */}
                    <Badge count={positionNotification}>
                      <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>
                  </Space>
                </a>
              </span>
              {/* Email communication section */}
              <a href="www">
                <span style={{ color: "white" }} className="emailCommunication">
                  <MailOutlined />
                </span>
              </a>
            </Header>

            {/* Title bar displaying the selected menu item */}
            <div
              className="title_bar"
              style={{ color: "white", backgroundColor: "#1D5596" }}
            >
              <Text className="menuTitle" selectedMenuItem={selectedMenuItem} />
            </div>
            {/* Main content */}
            {children}
          </Layout>
        </Layout>
      ) : (
        <Layout className="ant-layout-sider-children">
          {/* Sidebar component */}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={100} // Adjusted collapsed width
          >
            {/* Profile section */}
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="profile"
            >
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
                  <div style={{ color: "white" }} className="Username">
                    {currentUserName}
                  </div>
                </>
              )}
            </div>

            {/* Other sections of the sidebar, such as menu items */}
            <div style={{ color: "white" }} className="welcome">
              Welcome
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              onSelect={handleMenuItemClick}
              selectedKeys={[selectedMenuItem]}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                backgroundColor: "#15295E",
                width: "100%",
                height: "82.5vh",
                fontSize: "16px",
              }}
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/dashboad">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PendingActions />}>
                <Link to="/apply-position">Apply Position</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<ManageUser />}>
                <Link to="/player-profile">Profile</Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<PoweroffOutlined />}
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: isHoveredButton1 ? "#D94D34" : "#15295E",
                  color: isHoveredButton1 ? "white" : "white",
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
                  backgroundColor: isHoveredButton2 ? "#526CAE" : "#15295E",
                  color: isHoveredButton2 ? "white" : "white",
                }}
                onMouseEnter={handleHoverButton2}
                onMouseLeave={handleMouseLeaveButton2}
              />
              {/* Title and notification sections */}
              <span
                className="title"
                style={{
                  color: "white",
                  marginLeft: "75px",
                  letterSpacing: "1px",
                  fontSize: "22px",
                  fontWeight: "regular",
                }}
              >
                GameSync Pro
              </span>
              <span style={{ color: "white" }} className="notificaiton">
                <a href="www">
                  <Space size={24}>
                    {/* Notification badge */}
                    {/* <Badge count={5}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge> */}
                  </Space>
                </a>
              </span>
              {/* Email communication section */}
              <a href="www">
                <span className="emailCommunication" style={{ color: "white" }}>
                  <MailOutlined />
                </span>
              </a>
            </Header>

            {/* Title bar displaying the selected menu item */}
            <div
              className="title_bar"
              style={{ color: "white", backgroundColor: "#1D5596" }}
            >
              <Text className="menuTitle" selectedMenuItem={selectedMenuItem} />
            </div>
            {/* Main content */}
            {children}
          </Layout>
        </Layout>
      )}
    </>
  );
};

// Exporting the Navbar component
export default SideBar;
