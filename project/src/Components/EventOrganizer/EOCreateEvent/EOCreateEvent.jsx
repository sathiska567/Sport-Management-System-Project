import React, { useState } from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import "./EOCreateEvent.css";
import { Form, Input, DatePicker, TimePicker } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";

const EOCreateEvent = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(0);

  const [nameOfTheEvent, setNameOfTheEvent] = useState("");
  const [location, setLocation] = useState("");
  const [teamName, setTeamName] = useState([])
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")


  const handleNumberOfTeamsChange = (event) => {
    setNumberOfTeams(event.target.value);
  };

  const handleCreateEvent = async () => {
    console.log(nameOfTheEvent, location, teamName, numberOfTeams,eventDate,eventTime);
  }

  return (
    <div>
      <EOSidebar>
        <Form
          style={{
            margin: "auto",
            width: "75%",
          }}
          layout="verticle"
        >
          <div style={{}} className="CreateEventForm">
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="CreateEventFormHeader"
            >
              <h3
                style={{
                  color: "white",
                  letterSpacing: "1px",
                  fontWeight: "500",
                }}
              >
                Create Event
              </h3>
              <a href="#">
                <CloseSquareOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "10%",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "50px",
              }}
              className="CreateEventFormApplication"
            >
              <div className="InputData">
                <div className="DataIem">
                  <label htmlFor="eventName">Name of the Event:</label>
                  <Input type="text" id="eventName" name="eventName" required onChange={(e) => setNameOfTheEvent(e.target.value)} />
                </div>

                <div className="DataIem">
                  <label htmlFor="location">Location:</label>
                  <Input type="text" id="location" name="location" required onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    onChange={handleNumberOfTeamsChange}
                    required
                  />
                </div>

                {Array.from({ length: numberOfTeams }, (_, index) => (
                  <div className="DataIem" key={index}>
                    <label
                      className="DataItemTeamsLabel"
                      htmlFor={`teamName${index}`}
                    >
                      Team Name {index + 1}:
                    </label>
                    <Input
                      type="text"
                      id={`teamName${index}`}
                      name={`teamName${index}`}
                      className="DataItemTeamsInput"
                      allowClear
                      required
                      onChange={(e) => {
                        teamName[index] = e.target.value;
                        setTeamName(teamName);
                      }}
                    />
                  </div>
                ))}

                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker id="EventDate" name="EventDate" onChange={(date) => setEventDate(date)} />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker id="startingTime" name="startingTime" onChange={(time) => setEventTime(time)} />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B", width: "115px" }}
                      onClick={handleCreateEvent}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </EOSidebar>
    </div>
  );
};

export default EOCreateEvent;
