import React, { useEffect, useState } from "react";
import adminStatStyles from "./EOStats.module.css";
import EOSideBar from "../../EventOrganizer/EOSideBar/EOSideBar";
import { Card, message, Statistic } from "antd";
import CountUp from "react-countup";
import FixtureSummery from "./FixtureSummery";
import UpcomingEvents from "./upcomingEvents";
import AvailableReferees from "./availableReferees";
import axios from "axios";
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
  const [createEvent, setCreateEvent] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);

  const Navigate = useNavigate();

  const handleAvailabilityClick = () => {
    Navigate("/EO-EventView");
  };

  const handleEventSummeryClick = () => {
    Navigate("/eo-create-event");
  };

  const handleUpcomingClick = () => {
    Navigate("/EditEventTable");
  };

  const getCreatedEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );

      if (response.data.success) {
        setCreateEvent(response.data.data);
        const eventIds = response.data.data.map(event => event._id);

        const refereesPromises = eventIds.map(id =>
          axios.post("http://localhost:8080/api/v1/availability/event-available-referee", { eventId: id })
        );

        const refereesResponses = await Promise.all(refereesPromises);
        const availableReferees = refereesResponses.map(response => {
          if (response.data.success) {
            return response.data.data;
          }
          return []; // Handle the case where data fetching was not successful
        });

        setAvailableEvents(availableReferees.flat()); // Flatten the array of arrays

        console.log(availableEvents);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getCreatedEvents();
  }, []);

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
                    value={availableEvents.length} // Display the count of available referees
                    formatter={formatter}
                    className={adminStatStyles.ppStat1}
                  />
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
                    value={createEvent.length} // Replace with actual value
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
                    onClick={handleUpcomingClick}
                  >
                    Upcoming Events
                  </span>
                }
              >
                <div className={adminStatStyles.pendingUsers}>
                  <UpcomingEvents />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </EOSideBar>
  );
};

export default EOStats;
