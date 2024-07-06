import React, { useEffect, useState } from "react";
import adminStatStyles from "./RefereeStats.module.css";
import RefereeSideBar from "../../Referee/RefereeSideBar/RefereeSideBar";
import { Card, message, Statistic } from "antd";
import CountUp from "react-countup";
import UpcomingEvents from "./upcomingEvents";
import AssignedMatches from "./AssignedMatches";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    style={{
      fontSize: "3.5rem",
      fontWeight: "bold",
      color: "#000000",
    }}
  />
);

const RefereeStats = () => {
  const Navigate = useNavigate();
  const [allReferee , setAllReferee] = useState([])
  const [createdEvent , setCreateEvent] = useState([])

  const handleAssignTeams = () => {
    Navigate("/referee-matches");
  };

  const handleUpcomingEvents = () => {
    Navigate("/referee-availability");
  };

  const handleTeamOverview = () => {
    // Here need to add the coach ID like below
    // -->  /create-team?coach_id=65df8e909b1ea523e6444f53

    Navigate("/create-team");
  };

  const handleCreatedTeams = () => {
    // Here need to add the coach ID like below
    // --> /edit-team?coach_id=65df8e909b1ea523e6444f53

    Navigate("/edit-team");
  };


  const getAllReferee = async()=>{
    try {
      const getReferee = await axios.get("http://localhost:8080/api/v1/referee/referee-details")
        // console.log(getReferee.data.referee);
        setAllReferee(getReferee.data.referee)
      
    } catch (error) {
      message.error("Error while fetching referee data");
    }
  }

    // GET ALL CREATE EVENT 
const getAllCreateEvent = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/event/get-all-events"
    );

    if (response.data.success) {
      setCreateEvent(response.data.data);
    }
  } catch (error) {
    message.error("Error fetching data");
  }
};

  useEffect(()=>{
    getAllReferee()
    getAllCreateEvent()
  },[])

  return (
    <RefereeSideBar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleAssignTeams}
                  >
                    Assigned Events
                  </span>
                }
                bordered={false}
                className={adminStatStyles.card1}
              >
                {/* Content for User Overview card */}
                <div className={adminStatStyles.pendingUsers1}>
                  <AssignedMatches />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleUpcomingEvents}
                  >
                    Upcoming Events
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingUsers1}>
                  <UpcomingEvents />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.thirdCard}>
              <Card
                bordered={false}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleUpcomingEvents}
                  >
                    Total Referees in the system
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingPlayers2}>
                  <Statistic
                    title="Referees Count"
                    value={allReferee.length} // Replace with actual value
                    formatter={formatter}
                    className={adminStatStyles.ppStat2}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className={adminStatStyles.secondRow}>
            <div className={adminStatStyles.SfirstCard}>
              <Card></Card>
            </div>
            <div className={adminStatStyles.SSecondCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    
                  >
                    Total Participated Events as a Referee
                  </span>
                }
              >
                {/* Use ApplicationStatus (uppercase) here  */}
                <div className={adminStatStyles.pendingPlayers3}>
                  <Statistic
                    title="Event Count"
                    value={createdEvent.length} // Replace with actual value
                    formatter={formatter}
                    className={adminStatStyles.ppStat2}
                  />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.SthirdCard}>
              <Card bordered={false} className={adminStatStyles.card5}></Card>
            </div>
          </div>
        </div>
      </div>
    </RefereeSideBar>
  );
};

export default RefereeStats;
