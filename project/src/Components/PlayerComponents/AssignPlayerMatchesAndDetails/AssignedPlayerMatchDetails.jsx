import React, { useState } from "react";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import './AssignedPlayerMatchDetails.css'
import { Form, Input, DatePicker, TimePicker } from "antd";
import {
  CloseSquareOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AssignedPlayerMatchDetails = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [numberOfTeams, setNoOfTeams] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const eventLocation = useLocation()
  const navigate = useNavigate()

  console.log(eventLocation);

  const { id } = useParams();

  const handleCreate = async () => {
    // Implement handleCreate functionality if needed
  };

  return (
    <div>
      <PlayerSideBar>
        <Form
          style={{
            margin: "auto",
            width: "75%",
          }}
          layout="vertical"
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
                Edit Event
              </h3>
              <a href="/EditEventTable">
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
                    placeholder={eventLocation.state.record.nameOfTheEvent}
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
                    placeholder={eventLocation.state.record.location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    placeholder={eventLocation.state.record.numberOfTeams}
                    onChange={(e) => setNoOfTeams(e.target.value)}
                    required
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker
                    id="EventDate"
                    name="EventDate"
                    placeholder={eventLocation.state.record.eventNewDate}
                    onChange={(date) => setEventDate(date)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker
                    id="startingTime"
                    name="startingTime"
                    placeholder={eventLocation.state.record.formattedTime}
                    onChange={(time) => setStartingTime(time)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </PlayerSideBar>
    </div>
  );
};

export default AssignedPlayerMatchDetails;