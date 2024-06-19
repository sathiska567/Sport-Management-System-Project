import React, { useState, useEffect } from "react";
import "./EOCreateFixture.css";
import EOSidebar from "../EOSideBar/EOSideBar";
import { Form, Input, DatePicker, TimePicker, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";

const EOCreateFixture = () => {
  const locationData = useLocation();

  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [nameOfTheEvent, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [teamNameError, setTeamNameError] = useState({});
  const [eventNameError, setEventNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberOfTeamsError, setNumberOfTeamsError] = useState("");
  const [eventDateError, setEventDateError] = useState("");
  const [startingTimeError, setStartingTimeError] = useState("");

  useEffect(() => {
    if (locationData.state) {
      const { record } = locationData.state;
      setEventName(record.nameOfTheEvent);
      setLocation(record.location);
    }
  }, [locationData.state]);

  // Event Name First Input Validation
  const handleEventNameChange = (e) => {
    const eventName = e.target.value;
    setEventName(eventName);
    if (eventName === "") {
      setEventNameError("This field cannot be empty");
    } else {
      setEventNameError("");
    }
  };

  // Location Validation
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setLocation(location);
    if (location === "") {
      setLocationError("Location cannot be empty");
    } else {
      setLocationError("");
    }
  };

  // Team name Validation
  const handleTeamNameChange = (e, index) => {
    const teamName = e.target.value;
    setTeamName((prevTeamNames) => {
      const updatedTeamNames = [...prevTeamNames];
      updatedTeamNames[index] = teamName;
      return updatedTeamNames;
    });

    setTeamNameError((prevErrors) => ({
      ...prevErrors,
      [index]: teamName.trim() === "",
    }));
  };

  // Number of Teams Validation
  const handleNumberOfTeamsChange = (e) => {
    const value = e.target.value;
    setNumberOfTeams(value);
    if (value === "") {
      setNumberOfTeamsError("Number of teams cannot be empty");
    } else if (value < 4) {
      setNumberOfTeamsError("Minimum number of teams is 4");
    } else if (value > 25) {
      setNumberOfTeamsError("Maximum number of teams is 25");
    } else {
      setNumberOfTeamsError("");
    }
  };

  // Event Date Validation
  const handleDateChange = (date) => {
    setEventDate(date);
    if (!date) {
      setEventDateError("Event date cannot be empty");
    } else {
      setEventDateError("");
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and more than three years in the future
    return (
      current &&
      (current < moment().endOf("day") ||
        current > moment().endOf("day").add(3, "years"))
    );
  };

  // Start Time Validation
  const handleTimeChange = (time) => {
    if (!time) {
      setStartingTimeError("Starting time cannot be empty");
    } else if (
      time.isBefore(moment().hour(7).minute(30)) ||
      time.isAfter(moment().hour(14))
    ) {
      setStartingTimeError("Starting time must be between 7:30 AM and 2:00 PM");
    } else {
      setStartingTimeError("");
      setStartingTime(time);
    }
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 7; i++) hours.push(i);
    for (let i = 15; i < 24; i++) hours.push(i);
    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    if (selectedHour === 7) {
      const minutes = [];
      for (let i = 0; i < 30; i++) minutes.push(i);
      return minutes;
    }
  };

  const handleCreate = async () => {
    // Check if any required fields are empty
    const isAnyFieldEmpty =
      !nameOfTheEvent ||
      !location ||
      !eventDate ||
      !startingTime ||
      nameOfTheTeam.some((teamName) => !teamName);

    if (isAnyFieldEmpty) {
      message.error("Please fill in all required fields");
      return;
    }

    console.log(
      nameOfTheEvent,
      nameOfTheTeam,
      location,
      eventDate,
      startingTime
    );

    // get date
    const date = new Date(eventDate.$d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const eventNewDate = `${year}-${month}-${day}`;

    // get time
    const time = new Date(startingTime.$d);
    const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/create/create-fixture",
        {
          nameOfTheEvent,
          nameOfTheTeam,
          location,
          eventNewDate,
          formattedTime
        }
      );
      console.log(response);

      if (response.data.success) {
        message.success("Fixture Created Successfully");
        window.location.reload();
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
          layout="vertical"
        >
          <div className="CreateEventForm">
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
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="eventName"
                      required
                      name="eventName"
                      value={nameOfTheEvent}
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
                  <label htmlFor="location">Location:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="location"
                      required
                      name="location"
                      value={location}
                      onChange={handleLocationChange}
                      allowClear
                    />
                    {locationError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {locationError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="number"
                      id="numberOfTeams"
                      required
                      name="numberOfTeams"
                      value={numberOfTeams}
                      onChange={handleNumberOfTeamsChange}
                    />
                    {numberOfTeamsError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {numberOfTeamsError}
                      </div>
                    )}
                  </div>
                </div>

                {numberOfTeams >= 4 &&
                  Array.from(
                    { length: Math.min(numberOfTeams, 25) },
                    (_, index) => (
                      <div className="DataIem" key={index}>
                        <label
                          className="DataItemTeamsLabel"
                          htmlFor={`teamName${index}`}
                        >
                          Team Name {index + 1}:
                        </label>
                        <div style={{ flex: 2.6 }}>
                          <Input
                            type="text"
                            id={`teamName${index}`}
                            name={`teamName${index}`}
                            className="DataItemTeamsInput"
                            allowClear
                            required
                            onChange={(e) => handleTeamNameChange(e, index)}
                          />
                          {teamNameError[index] && (
                            <div
                              className="error"
                              style={{ fontSize: "13px", color: "red" }}
                            >
                              Team name cannot be empty
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}

                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <div
                    style={{
                      flex: 2.6,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <DatePicker
                      id="EventDate"
                      name="EventDate"
                      required
                      onChange={handleDateChange}
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                    />
                    {eventDateError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {eventDateError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <div
                    style={{
                      flex: 2.6,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TimePicker
                      id="startingTime"
                      name="startingTime"
                      onChange={handleTimeChange}
                      disabledHours={disabledHours}
                      disabledMinutes={disabledMinutes}
                    />
                    {startingTimeError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {startingTimeError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="buttonSet">
                  <div>
                    <button
                      className="CreateFixtureBTn"
                      style={{ backgroundColor: "#52c41a", width: "200px" }}
                      onClick={handleCreate}
                      disabled={
                        eventNameError ||
                        locationError ||
                        numberOfTeamsError ||
                        eventDateError ||
                        startingTimeError ||
                        Object.values(teamNameError).some(Boolean)
                      }
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
