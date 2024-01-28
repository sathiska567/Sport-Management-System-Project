// Importing necessary libraries and components
import "./EOSideBar.css";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  FormOutlined,
  BellOutlined,
  UserAddOutlined,
  EditOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { ReactComponent as Bracket } from "../../icons/tournament.svg";
import { ReactComponent as Profile } from "../../icons/Profile.svg";

import { Layout, Menu, Button, Avatar, Space, Badge, message } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Header, Sider } = Layout;

// Navbar component
const EOSizeBar = ({ children }) => {
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
      2: "Create Event",
      3: "Edit Event",
      4: "Assign Staff",
      5: "Fixture",
      6: "Bracket",
      7: "My Profile",
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

  // handle logout
  const handleLogOut = async()=>{
     localStorage.clear();
     window.location.reload()
  }

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
            <NavLink to="/eo-stats">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<EditOutlined />}>
            <NavLink to="/create-event">Create Event</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<FormOutlined />}>
            <NavLink to="#">Edit Event</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserAddOutlined />}>
            <NavLink to="#">Assign Staff</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <NavLink to="/fixture">Fixture</NavLink>
          </Menu.Item>

          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <NavLink to="/update-fixture">Update Fixture</NavLink>
          </Menu.Item>

          <Menu.Item key="6" icon={<Bracket />}>
            <NavLink to="#">Bracket</NavLink>
          </Menu.Item>
          <Menu.Item key="7" icon={<Profile />}>
            <NavLink to="#">My Profile</NavLink>
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
            <NavLink to="/" onClick={handleLogOut}>Log Off</NavLink>
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
          <Text className="menuTitle" selectedMenuItem={selectedMenuItem} />
        </div>
        {/* Main content */}
        {children}
      </Layout>
    </Layout>
  );
};

// Exporting the Navbar component
export default EOSizeBar;
