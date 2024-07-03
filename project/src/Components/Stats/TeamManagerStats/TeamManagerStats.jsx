import React, { useState } from "react";
import adminStatStyles from "./TeamManagerStatsStyles.module.css";
import TeamManagerStatsStyles from "./TeamManagerStatsStyles.module.css";
import TeamManagerSideBar from "../../TeamManager/TeamManagerSideBar/TeamManagerSideBar";
import { Card, Statistic, Dropdown, Menu } from "antd";
import CountUp from "react-countup";
import UpcommingEvents from "./upcomingEvents";
import AvailableCoaches from "./availableCoaches";
import EventResults from "./EventResults";

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
  
  return (
    <TeamManagerSideBar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card bordered={false} className={adminStatStyles.card1}>
                {/* Content for User Overview card */}
                <AvailableCoaches />
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span style={{ cursor: "pointer" }}>Coach Availability</span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingPlayers1}>
                  <Statistic
                    title="Available Coaches"
                    value={5}
                    formatter={formatter}
                    className={adminStatStyles.ppStat1}
                  />
                  <Statistic
                    title="Assigned Coaches "
                    value={6}
                    formatter={formatter}
                    className={adminStatStyles.ppStat1}
                  />
                </div>
              </Card>
            </div>
          </div>

          <div className={adminStatStyles.secondRow}>
            <div className={adminStatStyles.SfirstCard}>
              <Card className={adminStatStyles.card3}>
                <div >
                  <EventResults />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.SthirdCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title={
                  <span style={{ cursor: "pointer" }}>Upcoming Events</span>
                }
              >
                <div className={adminStatStyles.pendingUsers}>
                  <UpcommingEvents />
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
