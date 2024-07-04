import React from "react";
import adminStatStyles from "./PlayerStats.module.css";
import PlayerSideBar from "../../PlayerComponents/PlayerSideBar/PlayerSideBar";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import AssignedMatches from "./AssignedMatches.js";
import UpcomingEvents from "./upcomingEvents.js";
import EventResults from "./MyPerformance.js";
import TeamPerformance from "./TeamPerformance.js";


const PlayerStats = () => {
  const Navigate = useNavigate();

  const handleAssignedMatch = () => {
    Navigate("/AssignPlayerMatches");
  };

  return (
    <PlayerSideBar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card bordered={false} className={adminStatStyles.card1}>
                {/* Content for User Overview card */}
                <div>
                  <EventResults />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleAssignedMatch}
                  >
                    Assigned Matches
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingUsers}>
                  <AssignedMatches />
                </div>
              </Card>
            </div>
          </div>

          <div className={adminStatStyles.secondRow}>
            <div className={adminStatStyles.SfirstCard}>
              <Card className={adminStatStyles.card3}>
               <TeamPerformance />
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
                <div className={adminStatStyles.pendingUsers1}>
                  <UpcomingEvents />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PlayerSideBar>
  );
};

export default PlayerStats;
