import React, { useState } from "react";
import adminStatStyles from "./CoachStats.module.css";
import CoachSidebar from "../../Coach/CoachSidebar/CoachSidebar";
import { Card } from "antd";
import CountUp from "react-countup";
import PlayerReview from "./PlayerReview";
import MyTeams from "./myTeams";
import TeamOverview from "./teamOverview";
import CreatedTeams from "./createdTeams";
import MyPerformance from "./myPerformance";
import { useNavigate } from "react-router-dom";


const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    style={{
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#000000",
    }}
  />
);

const CoachStats = () => {

  const Navigate = useNavigate();

  const handleLoadReview = () => {
    Navigate("/coach-review-players");
  }

  const handleMyAvailability = () => {
    Navigate("/coach-availability");
  }

  const handleTeamOverview = () => {
    // Here need to add the coach ID like below
    // -->  /create-team?coach_id=65df8e909b1ea523e6444f53

    Navigate("/create-team");
  }

  const handleCreatedTeams = () => {
    // Here need to add the coach ID like below
    // --> /edit-team?coach_id=65df8e909b1ea523e6444f53

    Navigate("/edit-team");
  };

  return (
    <CoachSidebar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card
                title={
                  <span style={{ cursor: "pointer" }}>My Performance</span>
                }
                bordered={false}
                className={adminStatStyles.card1}
              >
                {/* Content for User Overview card */}
                <MyPerformance />
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleCreatedTeams}
                  >
                    Created Teams
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "300",
                        marginLeft: "10px",
                      }}
                    >
                      [ Event Name | No of Teams | Location ]
                    </span>
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingUsers}>
                  <CreatedTeams />
                </div>
              </Card>
            </div>
          </div>

          <div className={adminStatStyles.secondRow}>
            <div className={adminStatStyles.SfirstCard}>
              <Card
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleMyAvailability}
                  >
                    Assigned Teams
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "300",
                        marginLeft: "10px",
                      }}
                    >
                      [ Event No | Name of Teams]
                    </span>
                  </span>
                }
                className={adminStatStyles.card3}
              >
                <div className={adminStatStyles.pendingUsers}>
                  <MyTeams />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.SthirdCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleTeamOverview}
                  >
                    Team Overview
                  </span>
                }
              >
                {/* Use ApplicationStatus (uppercase) here  */}
                <TeamOverview createdCount={12} rejectedCount={5} />
              </Card>
            </div>
            <div className={adminStatStyles.SthirdCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleLoadReview}
                  >
                    Need to Review
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "300",
                        marginLeft: "10px",
                      }}
                    >
                      [ Name of Player]
                    </span>
                  </span>
                }
              >
                <div className={adminStatStyles.pendingUsers}>
                  <PlayerReview />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CoachSidebar>
  );
};

export default CoachStats;
