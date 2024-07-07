import React, { useEffect, useState } from "react";
import TeamManagerStatsStyles from "./TeamManagerStatsStyles.module.css";
import TeamManagerSideBar from "../../TeamManager/TeamManagerSideBar/TeamManagerSideBar";
import { Card, Statistic, message } from "antd";
import CountUp from "react-countup";
import UpcomingEvents from "./upcomingEvents"; // Fix the component name typo
import AvailableCoaches from "./availableCoaches";
import EventResults from "./EventResults";
import axios from "axios";

const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    style={{
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#000000",
    }}
  />
);

const TeamManagerStats = () => {
  const [availableCoaches, setAvailableCoaches] = useState([]);

  const getAvailableCoaches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/availability/get-available-coach");
      // console.log(response.data.data);
      setAvailableCoaches(response.data.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAvailableCoaches();
  }, []);

  return (
    <TeamManagerSideBar>
      <div className="admin-stats">
        <div className={TeamManagerStatsStyles.divContainer}>
          <div className={TeamManagerStatsStyles.firstRow}>
            <div className={TeamManagerStatsStyles.firstCard}>
              <Card bordered={false} className={TeamManagerStatsStyles.card1}>
                <AvailableCoaches />
              </Card>
            </div>
            <div className={TeamManagerStatsStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span style={{ cursor: "pointer" }}>Coach Availability</span>
                }
                className={TeamManagerStatsStyles.card2}
              >
                <div className={TeamManagerStatsStyles.pendingPlayers1}>
                  <Statistic
                    title="Available Coaches"
                    value={availableCoaches.length}
                    formatter={formatter}
                    className={TeamManagerStatsStyles.ppStat1}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className={TeamManagerStatsStyles.secondRow}>
            <div className={TeamManagerStatsStyles.SfirstCard}>
              <Card className={TeamManagerStatsStyles.card3}>
                <EventResults />
              </Card>
            </div>
            <div className={TeamManagerStatsStyles.SthirdCard}>
              <Card
                bordered={false}
                className={TeamManagerStatsStyles.card5}
                title={
                  <span style={{ cursor: "pointer" }}>
                    Upcoming Events
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "300",
                        marginLeft: "10px",
                      }}
                    >
                      [ Event Name | Location ]
                    </span>
                  </span>
                }
              >
                <div className={TeamManagerStatsStyles.pendingUsers}>
                  <UpcomingEvents />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TeamManagerSideBar>
  );
};

export default TeamManagerStats;
