// Importing necessary libraries and components
import "./RefereeSideBar.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChartLine,
  faUsers,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  BellOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { useLocation } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Space, Badge, message } from "antd";
import axios from "axios";
// Destructuring components from Ant Design's Layout
const { Header, Sider } = Layout;

// Navbar component
const RefereeSideBar = ({ children }) => {
  // State variables for managing component state
  const [collapsed, setCollapsed] = useState(false);
  const [isHoveredButton1, setIsHoveredButton1] = useState(false);
  const [isHoveredButton2, setIsHoveredButton2] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const location = useLocation();
  // set name
  const [currentUserName, setCurrentUsername] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [positionNotification, setPositionNotification] = useState();
  const [isEventOrganizer, setIsEventOrganizer] = useState(false);
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
      "/player-stats": "Dashboard",
      "/player-matches": "Matches",
      "/player-availability": "Availability",
      "/player-reviews": "My Reviews",
      "/player-search": "Search Players",
      "/player-profile": "My Profile",
    };

    return <p>{text[selectedMenuItem]}</p>;
  };

  //GET CURRENT USER DATA
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

      console.log(res.data.user.isEventOrganizer);

      setPositionNotification(res.data.user.notification.length);
      setCurrentUsername(res.data.user.username);
      setIsAdmin(res.data.user.isAdmin);
      setIsEventOrganizer(res.data.user.isEventOrganizer);

      console.log("Is event organizer is : ", isEventOrganizer);
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

  const handleLogOut = async () => {
    try {
      localStorage.clear();
      window.location.reload();

      message.success("Logout Successfully");
    } catch (error) {
      message.error("Logout failed");
    }
  };

  // get admin or not status

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
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/eo-stats"]}
          selectedKeys={[location.pathname]}
          style={{
            backgroundColor: "#15295E",
            width: "100%",
            height: "100vh",
            fontSize: "16px",
          }}
        >
          <Menu.Item key="/referee-stats" icon={<DashboardOutlined />}>
            <NavLink to="/referee-stats">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item
            key="/referee-availability"
            icon={<FontAwesomeIcon icon={faCalendarCheck} />}
          >
            <NavLink to="/referee-availability">Availability</NavLink>
          </Menu.Item>
          <Menu.Item
            key="/referee-matches"
            icon={<FontAwesomeIcon icon={faTrophy} />}
          >
            <NavLink to="/referee-matches">Matches</NavLink>
          </Menu.Item>
          <Menu.Item key="/referee-profile" icon={<UserOutlined />}>
            <NavLink to="/referee-profile">My Profile</NavLink>
          </Menu.Item>
          <Menu.Item
            key="logoff"
            icon={<PoweroffOutlined />}
            onMouseEnter={handleHoverButton1}
            onMouseLeave={handleMouseLeaveButton1}
          >
            <NavLink onClick={handleLogOut}>Log Off</NavLink>
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
            GameSync Pro - Event Organizer
          </span>
          <span style={{ color: "white" }} className="notificaiton">
            <a href="/UserValidation">
              <Space size={24}>
                {/* Notification badge */}
                <Badge count={positionNotification}>
                  <Avatar
                    shape="square"
                    icon={
                      <BellOutlined
                        style={{
                          fontSize: "22px",
                        }}
                      />
                    }
                  />
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
          <Text className="menuTitle" selectedMenuItem={location.pathname} />
        </div>
        {/* Main content */}
        {children}
      </Layout>
    </Layout>
  );
};

// Exporting the Navbar component
export default RefereeSideBar;
