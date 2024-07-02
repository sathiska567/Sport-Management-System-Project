import React from "react";
import adminStatStyles from "./EOStats.module.css";
import EOStatStyles from "./EOStats.module.css";
import EOSideBar from "../../EventOrganizer/EOSideBar/EOSideBar";
import { Card, Statistic } from "antd";
import CountUp from "react-countup";
import FixtureSummery from "./FixtureSummery";
import UpcomingEvents from "./upcomingEvents";
import AvailableReferees from "./availableReferees";
import { useNavigate } from "react-router-dom";

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

const EOStats = () => {
  const Navigate = useNavigate();
  const handleAvailabilityClick = () => {
    Navigate("/EO-EventView");
  };
  const handleEventSummeryClick = () => {
    Navigate("/eo-create-event");
  };

  const handleUpcommingClick = () => {
    Navigate("/EditEventTable");
  }

  return (
    <EOSideBar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card bordered={false} className={adminStatStyles.card1}>
                {/* Content for User Overview card */}
                <AvailableReferees />
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleAvailabilityClick}
                  >
                    Referee Availability
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingPlayers1}>
                  <Statistic
                    title="Available Referees"
                    value={5}
                    formatter={formatter}
                    className={adminStatStyles.ppStat1}
                  />
                  <Statistic
                    title="Assigned Referees "
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
              {/* Content for Player Overview card */}

              <Card
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleEventSummeryClick}
                  >
                    Event Summary
                  </span>
                }
                className={adminStatStyles.card3}
              >
                <div className={adminStatStyles.pendingPlayers2}>
                  <Statistic
                    title="Created"
                    value={5}
                    formatter={formatter}
                    className={adminStatStyles.ppStat2}
                  />
                  <Statistic
                    title="Ongoing"
                    value={1}
                    formatter={formatter}
                    className={adminStatStyles.ppStat2}
                  />
                  <Statistic
                    title="Cancelled"
                    value={3}
                    formatter={formatter}
                    className={adminStatStyles.ppStat2}
                  />
                </div>
              </Card>
            </div>
            <div className={adminStatStyles.SsecondCard}>
              <Card bordered={false} className={adminStatStyles.card4}>
                {/* Content for Current Users card */}
                <FixtureSummery createdFixtures={12} deletedFixtures={5} />
              </Card>
            </div>

            <div className={adminStatStyles.SthirdCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title={
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleUpcommingClick}
                  >
                    Upcoming Events
                  </span>
                }
              >
                {/* Use ApplicationStatus (uppercase) here  */}
                <div className={adminStatStyles.pendingUsers}>
                  <UpcomingEvents />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      );
    </EOSideBar>
  );
};

export default EOStats;
