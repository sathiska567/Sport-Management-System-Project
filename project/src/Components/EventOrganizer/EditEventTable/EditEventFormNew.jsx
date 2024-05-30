import React, { useEffect, useState } from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import './EditEventFormNew.css'
import { Form, Input, DatePicker, TimePicker, message } from "antd";
import {
  CloseSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const EOEditEventForm = () => {
  const [nameOfTheEvent, setEventName] = useState("");
  const [numberOfTeams, setNoOfTeams] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startingTime, setStartingTime] = useState("");

  const { id } = useParams()

  const handleCreate = async () => {

  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/EditEventTable/get-single-create/' + id);
      console.log(response.data);
      setEventName(response.data.data.nameOfTheEvent)
      setLocation(response.data.data.location)
      setNoOfTeams(response.data.data.numberOfTeams)
      setEventDate(response.data.data.eventDate)
      setStartingTime(response.data.data.startingTime)
     
      // if (response.data.success) {
      //   setDataSource(response.data.data);
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const editEventData = async (newData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/EditEventTable/update-event')
      console.log(response.data);
    } catch (error) {
      console.log('Error updating data:', error);
    }
  }

  useEffect(() => {
    fetchEventData();
  }, [id])

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
                Edit Event
              </h3>
              <a href="/eo-edit-event">
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
                    value={nameOfTheEvent}
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    value={numberOfTeams}
                    onChange={(e) => setNoOfTeams(e.target.value)}
                    required
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker
                    id="EventDate"
                    name="EventDate"
                    placeholder={eventDate}
                    onChange={(date) => setEventDate(date)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker
                    id="startingTime"
                    name="startingTime"
                    placeholder={startingTime}
                    onChange={(time) => setStartingTime(time)}
                  />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B", width: "80pxx" }}
                      onClick={handleCreate}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Edit Event
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

export default EOEditEventForm;