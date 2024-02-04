import React, { useState } from "react";
import "./EOCreateFixture.css";
import EOSidebar from "../EOSideBar/EOSideBar";
import { Form, Input, DatePicker, TimePicker, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const EOCreateFixture = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [nameOfTheEvent, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");

  const handleNumberOfTeamsChange = (event) => {
    setNumberOfTeams(event.target.value);
  };

  const handleCreate = async () => {
    console.log(
      nameOfTheEvent,
      nameOfTheTeam,
      location,
      eventDate,
      startingTime
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/create/create-fixture",
        {
          nameOfTheEvent: nameOfTheEvent,
          nameOfTheTeam: nameOfTheTeam,
          location: location,
        }
      );
      console.log(response);

      if (response.data.success) {
        message.success("Fixture Created Successfully");
      } else {
        message.error("Fixture Create Have some error");
      }
    } catch (error) {
      message.error("Fixture Create Have some error", error.message);
    }
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
                Create Fixture
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
                  <Input
                    type="text"
                    id="eventName"
                    required
                    name="eventName"
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="location">Location:</label>
                  <Input
                    type="text"
                    id="location"
                    required
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                  />
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
                      onChange={(e) =>
                        setTeamName(() => {
                          nameOfTheTeam[index] = e.target.value;
                          return nameOfTheTeam;
                        })
                      }
                    />
                  </div>
                ))}

                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker
                    id="EventDate"
                    name="EventDate"
                    onChange={(date) => setEventDate(date)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker
                    id="startingTime"
                    name="startingTime"
                    onChange={(time) => setStartingTime(time)}
                  />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B" }}
                      onClick={handleCreate}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Create Fixture
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

export default EOCreateFixture;
