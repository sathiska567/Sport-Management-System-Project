// Importing necessary libraries and components
import "./TeamManagerStats.css";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import { Layout, Col, Statistic, message } from "antd";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Clock } from "@sujitsimon/react-flipclock";
import Calendar from "react-calendar";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const TeamManagerStats = () => {
  const [createdFixture, setCreatedFixture] = useState([]);
  const [deletedEvent, setDeletedEvent] = useState([]);
  const [eventOrganizers, setEventOrganizers] = useState([]);
  const [teamManagers, setTeamManagers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [playerDetails, setPlayerDetails] = useState([]);
  const [refereeDetails, setRefereeDetails] = useState([]);
  const [userApplicationData, setUserApplicationData] = useState([]);
  const [pendingCount, setPendingCount] = useState("");
  const [approvedCount, setApprovedCount] = useState("");

  const pending = [];
  const approvedPosition = [];

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

  // get current applying user data
  const ApplyingUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/get-all-details"
      );
      console.log(res.data.allApplyingDetails);

      if (res.data.success) {
        setUserApplicationData(res.data.allApplyingDetails);

        for (let i = 0; i < res.data.allApplyingDetails.length; i++) {
          if (res.data.allApplyingDetails[i].status == "pending") {
            pending.push(res.data.allApplyingDetails[i]);
            // console.log(res.data.allApplyingDetails[i]);
          }
        }

        for (let i = 0; i < res.data.allApplyingDetails.length; i++) {
          if (res.data.allApplyingDetails[i].status == "Approve") {
            approvedPosition.push(res.data.allApplyingDetails[i]);
            // console.log(res.data.allApplyingDetails[i]);
          }
        }

        console.log(pending.length);
        setPendingCount(pending.length);
        setApprovedCount(approvedPosition.length);
      } else {
        message("Error found in applying details section");
      }
    } catch (error) {
      message.error("Error while fetching data");
    }
  };

  const getAllCreatedEvents = async () => {
    try {
      const createdEvent = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );
      console.log(createdEvent);
      setCreatedFixture(createdEvent.data.data);
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const getAllDeletedEvents = async () => {
    try {
      const deletedEvent = await axios.get(
        "http://localhost:8080/api/v1/delete/get-deleted-event"
      );
      console.log(deletedEvent);
      setDeletedEvent(deletedEvent.data.deletedEvents);
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  //  get all event organizers
  const getOnlyEventOrganizers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event-organizer/details"
      );
      // console.log(response);
      if (response.data.success) {
        setEventOrganizers(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  //  get all event organizers
  const getOnlyTeamManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/team-manager/details"
      );
      // console.log(response);
      if (response.data.success) {
        setTeamManagers(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  //  get all event organizers
  const getOnlyCoach = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/coach/details"
      );
      // console.log(response);
      if (response.data.success) {
        setCoaches(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  const handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/player/player-details"
      );
      console.log(response.data.players);

      if (response.data.success) {
        // message.success(response.data.message)
        setPlayerDetails(response.data.players);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const getAllRefereeDetails = async () => {
    try {
      const refereeResponse = await axios.get(
        "http://localhost:8080/api/v1/referee/referee-details"
      );
      if (refereeResponse.data.success) {
        // message.success(response.data.message)
        setRefereeDetails(refereeResponse.data.referee);
      }
    } catch (error) {
      message.error("Error fetching referee details");
    }
  };

  useEffect(() => {
    getAllCreatedEvents();
    getAllDeletedEvents();
    getOnlyEventOrganizers();
    getOnlyTeamManagers();
    getOnlyCoach();
    handleGetAllPlayerDetails();
    getAllRefereeDetails();
    ApplyingUser();
  }, []);

  const approved =
    eventOrganizers.length +
    playerDetails.length +
    teamManagers.length +
    coaches.length +
    refereeDetails.length;

  // JSX structure for the Navbar component
  return (
    <TeamManagerSideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <div className="Stats flex-container">
            <div className="dataCard flex-container1st ">
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
                  labels: ["Requested", "Approved", "Pending"],
                  datasets: [
                    {
                      label: "Number of Positions",
                      data: [
                        userApplicationData.length,
                        approvedCount,
                        pendingCount,
                        userApplicationData.length - approvedCount,
                      ],
                      backgroundColor: ["red", "blue", "green"],
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      min: 0,
                      beginAtZero: true,
                    },
                  },
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
                      data: [
                        eventOrganizers.length,
                        playerDetails.length,
                        teamManagers.length,
                        coaches.length,
                        refereeDetails.length,
                      ],
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
            <div className="dataCard PositionCard">
              <Bar
                data={{
                  labels: ["Created Events", "Cancelled Events"],
                  datasets: [
                    {
                      label: "Event Summery",
                      data: [createdFixture.length, deletedEvent.length],
                      backgroundColor: ["red", "blue", "green", "orange"],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
};

// Exporting the Navbar component
export default TeamManagerStats;
