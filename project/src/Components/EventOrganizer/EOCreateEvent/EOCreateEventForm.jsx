import React, { useState, useEffect } from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import "./EOCreateEventForm.css";
import { Form, Input, DatePicker, TimePicker, message, Cascader } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const EOCreateEventForm = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [error, setError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [teamsError, setTeamsError] = useState(false);
  const [teamsErrorMessage, setTeamsErrorMessage] = useState("");
  const [eventDateError, setEventDateError] = useState(false);
  const [startingTimeError, setStartingTimeError] = useState(false);
  // Event Name Validation
  const handleInputChange = (e) => {
    if (e.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    setEventName(e.target.value);
  };

  // Location Validation
  const handleLocationChange = (value) => {
    setLocation(value);
    if (value === undefined || value.length === 0) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  };

  // Fetch the districts from the json file
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/District.json");
        const data = await response.json();

        // Filter function
        const filteredData = data.filter((item) => {
          // Add your filter condition here
          return item.name !== "Unwanted District";
        });

        setDistricts(filteredData);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  // Cascader filter function
  const districtFilter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  // Validate Number of Teams
  const validateNumberOfTeams = (value) => {
    if (value === "") {
      setTeamsError(true);
      setTeamsErrorMessage("Number of teams cannot be empty!");
    } else if (value < 2 || value > 25) {
      setTeamsError(true);
      setTeamsErrorMessage("Number of teams must be between 2 and 25!");
    } else {
      setTeamsError(false);
    }
  };

  const handleTeamsChange = (e) => {
    const value = e.target.value;
    setNumberOfTeams(value);
    validateNumberOfTeams(value);
  };

  // Validate Event Date
  const handleDateChange = (date) => {
    setEventDate(date);
    if (!date) {
      setEventDateError(true);
    } else {
      setEventDateError(false);
    }
  };

  // Validate Starting Time
  const handleTimeChange = (time) => {
    setStartingTime(time);
    if (!time) {
      setStartingTimeError(true);
    } else {
      setStartingTimeError(false);
    }
  };

  const handleCreate = async () => {
    console.log(
      nameOfTheEvent,
      // nameOfTheTeam,
      location,
      // eventDate.$d,
      numberOfTeams
    );
   
  // get date
    const date = new Date(eventDate.$d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const eventNewDate = `${day}-${month}-${year}`;


    // get time
    const time = new Date(startingTime.$d);
    const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/event/create-event",
        { nameOfTheEvent, location, numberOfTeams ,eventNewDate ,formattedTime }
      );
      console.log(response);

      if (response.data.success) {
        message.success(response.data.message);
        window.location.reload();
      } else {
        message.success(response.data.message);
        // window.location.reload();
      }
    } catch (error) {
      message.error("Error creating event");
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
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="eventName"
                      required
                      name="eventName"
                      onChange={handleInputChange}
                    />
                    {error && (
                      <p style={{ fontSize: "12px", color: "red" }}>
                        Team Name Required!
                      </p>
                    )}
                  </div>
                </div>

                <div className="DataIem">
                  <label htmlFor="location">Location:</label>
                  <div style={{ flex: 2.6 }}>
                    <Cascader
                      id="location"
                      options={districts}
                      onChange={handleLocationChange}
                      placeholder="Select location"
                      showSearch={{ filter: districtFilter }}
                      className={locationError ? "ant-cascader-error" : ""}
                      required
                      style={{ width: "100%" }}
                    />
                    {locationError && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        Location cannot be empty!
                      </span>
                    )}
                  </div>
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="number"
                      id="numberOfTeams"
                      name="numberOfTeams"
                      required
                      onChange={handleTeamsChange}
                    />
                    {teamsError && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {teamsErrorMessage}
                      </span>
                    )}
                  </div>
                </div>
                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <div style={{ flex: 2.6 }}>
                    <div style={{ width: "100%" }}>
                      <DatePicker
                        id="EventDate"
                        name="EventDate"
                        onChange={handleDateChange}
                        style={{ width: "100%" }}
                        disabledDate={(current) =>
                          current && current < moment().endOf("day")
                        }
                      />
                    </div>
                    {eventDateError && (
                      <div>
                        <span style={{ color: "red", fontSize: "13px" }}>
                          Event date cannot be empty!
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <div style={{ flex: 2.6 }}>
                    <TimePicker
                      id="startingTime"
                      name="startingTime"
                      onChange={handleTimeChange}
                      style={{ width: "100%" }}
                      disabledHours={() => [
                        ...Array.from({ length: 8 }, (_, i) => i),
                        ...Array.from({ length: 12 }, (_, i) => i + 12),
                      ]}
                    />
                    {startingTimeError && (
                      <div>
                        <span style={{ color: "red", fontSize: "13px" }}>
                          Starting time cannot be empty!
                        </span>
                      </div>
                    )}{" "}
                  </div>
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#52c41a", width: "115px" }}
                      onClick={handleCreate}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Create Event
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

export default EOCreateEventForm;
