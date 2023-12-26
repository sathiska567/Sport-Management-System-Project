// Importing necessary libraries and components
import "./StatCards.css";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import SideBar from "../DashboardSideBar/SideBar.jsx";

import { Layout, Col, Statistic } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const StatCards = () => {
  // Formatter function for CountUp component
  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    // Replace 'your_backend_api/user_data' with your actual API endpoint for fetching user data
    axios
      .get("http://localhost:8080/demo")
      .then((response) => {
        const data = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  
  // JSX structure for the Navbar component
  return (

    
    <SideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 280,
              height: "100%",
              background: "white",
            }}
          >
            {/* Stats section */}
            <div className="stats">
              {/* ... (individual Statistic components) */}
              <div className=" sRow">
                <div className="sItem">
                  <Col span={12}>
                    <Statistic
                      className="statistic"
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
                    <Statistic
                      title="Teams"
                      value={456}
                      formatter={formatter}
                    />
                  </Col>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default StatCards;
