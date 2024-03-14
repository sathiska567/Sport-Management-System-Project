import React, { useState } from "react";
import "./TeamManagerCreateTeam.css";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import { Form, Input, InputNumber, Cascader, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";

const TeamManagerCreateTeam = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [cascaderError, setCascaderError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [teamsError, setTeamsError] = useState("");


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

  // Select Event validation
  const handleCascaderChange = (value) => {
    setSelectedOption(value);
    setCascaderError(
      value === undefined || value.length === 0
        ? "Event Name cannot be empty"
        : ""
    );
  };

  // Validate Team Name
  const handleEventNameChange = (e) => {
    const name = e.target.value;
    setEventName(name);
    setEventNameError(name === "" ? "Event name cannot be empty" : "");
  };

  // Validate Number of members in Teams
  const handleTeamsChange = (value) => {
    if (isNaN(value)) {
      setTeamsError("Input must be a number");
    } else {
      setNumberOfTeams(value);
      if (!value) {
        setTeamsError("Number of teams cannot be empty");
      } else if (value < 13 || value > 20) {
        setTeamsError("Number of teams should be between 13 and 20");
      } else {
        setTeamsError("");
      }
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
                  <div style={{ flex: "2.6" }}>
                    <Cascader
                      className="myCascader"
                      options={options}
                      onChange={handleCascaderChange}
                      placeholder="Please Select the Name of Event"
                      style={{ width: "100%" }}
                    />
                    {cascaderError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {cascaderError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="DataIem">
                  <label htmlFor="eventName">Name of the Team:</label>
                  <div style={{ flex: "2.6" }}>
                    <Input
                      type="text"
                      id="eventName"
                      required
                      name="eventName"
                      placeholder="Enter the Name of the Team"
                      onChange={handleEventNameChange}
                      allowClear
                    />
                    {eventNameError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {eventNameError}
                      </div>
                    )}
                  </div>
                </div>
                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Members:</label>
                  <div style={{flex : "2.6"}}>
                    <InputNumber
                      id="numberOfTeams"
                      name="numberOfTeams"
                      required
                      placeholder="Enter the Number of Teams"
                      onChange={handleTeamsChange}
                      style={{width : "100%"}}
                    />
                    {teamsError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {teamsError}
                      </div>
                    )}
                  </div>
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
