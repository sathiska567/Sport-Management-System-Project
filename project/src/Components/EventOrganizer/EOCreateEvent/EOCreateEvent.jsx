import React, { useState } from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import "./EOCreateEvent.css";
import { Form, Input, DatePicker, TimePicker } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";

const EOCreateEvent = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const handleNumberOfTeamsChange = (event) => {
    setNumberOfTeams(event.target.value);
  };

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
                  <Input type="text" id="eventName" name="eventName" required />
                </div>

                <div className="DataIem">
                  <label htmlFor="location">Location:</label>
                  <Input type="text" id="location" name="location" required />
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
                    />
                  </div>
                ))}

                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker id="EventDate" name="EventDate" />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker id="startingTime" name="startingTime" />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B", width: "115px" }}
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
