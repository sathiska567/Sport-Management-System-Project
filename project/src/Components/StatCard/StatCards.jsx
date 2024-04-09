// Importing necessary libraries and components
import "./StatCards.css";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import SideBar from "../DashboardSideBar/SideBar.jsx";
import { Layout, Col, Statistic } from "antd";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Clock } from "@sujitsimon/react-flipclock";
import Calendar from "react-calendar";
import { message } from 'antd';
// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const StatCards = () => {
  const [allApplyingForm , setAllApplyingForm] = useState([])
  let count = 0
  const [pendingArray, setPendingArray] = useState([]);
  const [ApproveArray, setApprove] = useState([]);
  // const pendingArray = []

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


  const getAllApplyingUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/admin/get-all-details");
      console.log(response.data.allApplyingDetails.length);
      setAllApplyingForm(response.data.allApplyingDetails);
    
      const pendingRequests = response.data.allApplyingDetails.filter((item) => item.status === "pending");
      setPendingArray(pendingRequests);

      const ApproveRequests = response.data.allApplyingDetails.filter((item) => item.status === "Approve");
      setApprove(ApproveRequests);
  


      console.log(pendingArray);

    } catch (error) {
      console.error('Error fetching user data:', error); 
    }
  };
  
  useEffect(() => {
    getAllApplyingUser();
  }, []);



  // JSX structure for the Navbar component
  return (
    <SideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <div className="Stats flex-container">
            <div className="dataCard flex-container1st " >
              <div className="flex-item1st">
                <h3>Date</h3>
                <Calendar className="my-calendar" />
              </div>
              <div className="flex-item1st">
                <h3>Time</h3>
                <Clock
                  config={{
                    height: "48px",
                    backgroundColor: "#241623",
                    textColor: "#fff",
                  }}
                />
              </div>
            </div>
            <div className="dataCard PositionCard">
              <Bar
                data={{
                  labels: ["All Requests", "Pending Request", "Approve Request", "Deleted"],
                  datasets: [
                    {
                      label: "All Form Submition",
                      data: [allApplyingForm.length,pendingArray.length, ApproveArray.length, 50],
                      backgroundColor: ["red", "blue", "green", "orange"],
                    },
                  ],
                }}
              />
            </div>
            <div className="dataCard categoryCard">
              <Doughnut
                data={{
                  labels: [
                    "Event Organizers",
                    "Players",
                    "Team Managers",
                    "Coaches",
                    "Referees",
                  ],
                  datasets: [
                    {
                      data: [10, 20, 30, 25, 15],
                      backgroundColor: [
                        "red",
                        "blue",
                        "green",
                        "yellow",
                        "purple",
                      ],
                    },
                  ],
                }}
              />
            </div>
            <div className="dataCard categoryCard">
              <Line
                className="chart"
                data={{
                  labels: ["January", "February", "March", "April"],
                  datasets: [
                    {
                      label: "Created Events",
                      data: [10, 20, 15, 35],
                      borderColor: "green",
                      fill: false,
                    },
                    {
                      label: "Cancelled Events",
                      data: [5, 10, 5, 26],
                      borderColor: "red",
                      fill: false,
                    },
                    {
                      label: "Delayed Events",
                      data: [7, 14, 21, 28],
                      borderColor: "blue",
                      fill: false,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Layout>
      </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default StatCards;
