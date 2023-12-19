// Importing necessary libraries and components
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Button,
  Avatar,
  Space,
  Badge,
  Col,
  Statistic,
} from "antd";
import ManageUser from "../icons/ManageUser.jsx";
import PendingActions from "../icons/PendingActions.jsx";
import Profile from "../icons/Profile.jsx";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Header, Sider, Content } = Layout;

// Navbar component
const Navbar = () => {
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

  // Formatter function for CountUp component
  const formatter = (value) => <CountUp end={value} separator="," />;

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
          {/* Stats section */}
          <div className="stats">
            {/* ... (individual Statistic components) */}
            <div className=" sRow">
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Finished Events"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Scheduled Events"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Cancelled Events"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
            </div>
            <div className=" sRow">
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Delayed Events"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Event Organizers"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Coaches"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
            </div>
            <div className=" sRow">
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Finished Events"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic
                    title="Players"
                    value={456}
                    formatter={formatter}
                  />
                </Col>
              </div>
              <div className="sItem">
                <Col span={12}>
                  <Statistic title="Teams" value={456} formatter={formatter} />
                </Col>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Exporting the Navbar component
export default Navbar;
