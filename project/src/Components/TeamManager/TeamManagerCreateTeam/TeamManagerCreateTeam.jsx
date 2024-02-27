import React, { useState } from "react";
import "./TeamManagerCreateTeam.css";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import { Form, Input, Cascader, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";

const TeamManagerCreateTeam = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);

  const options = [
    {
      value: "event1",
      label: "Event 1",
    },
    {
      value: "event2",
      label: "Event 2",
    },
    {
      value: "event3",
      label: "Event 3",
    },
  ];

  const onChange = (value, selectedOptions) => {
    if (selectedOptions) {
      const eventName = selectedOptions[selectedOptions.length - 1].label;
      setEventName(eventName);
    } else {
      setEventName("");
    }
  };

  return (
    <div>
      <TeamManagerSideBar>
        <Form
          style={{
            marginTop: "6%",
            marginLeft: "auto",
            marginRight: "auto",
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
                Create Team
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
                  <label htmlFor="eventName">Select the Event :</label>
                  <Cascader
                    className="myCascader"
                    options={options}
                    onChange={onChange}
                    placeholder="Please Select the Name of Event"
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="eventName">Name of the Team:</label>
                  <Input
                    type="text"
                    id="eventName"
                    required
                    name="eventName"
                    placeholder="Enter the Name of the Team"
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Members:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    required
                    placeholder="Enter the Number of Teams"
                  />
                </div>
                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#52c41a", width: "115px" }}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Create Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </TeamManagerSideBar>
    </div>
  );
};

export default TeamManagerCreateTeam;
