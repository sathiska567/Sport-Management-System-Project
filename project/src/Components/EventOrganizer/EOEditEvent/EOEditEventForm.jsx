import React, { useState ,useEffect} from "react";
import EOSidebar from "../EOSideBar/EOSideBar";
import "./EOEditEventForm.css";
import { Form, Input, DatePicker, TimePicker } from "antd";
import {
  CloseSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import moment from 'moment'

const EOEditEventForm = () => {

  const getOneEvent = async (id) => {
    try{
      const urls = "http://localhost:8080/api/v1/Edit/get-create/" + id
      console.log(urls);
      const response = await fetch(urls)

      const resData = await response.json()

      const event = resData.data

      console.log("EVENT", event);

      setEventName(event.name)
      setLocation(event.location)
      setTeams(event.teams)
      setEventDate(event.date)
      setTime(event.time)
    } catch (error) {
      console.log(error)

    }
  } 

  const updateEvent = async (id) => {
    try{
      const resposne  = await fetch("http://localhost:8080/api/v1/Edit/update-event/", {
        method: "PUT",
        body: JSON.stringify({
          _id: id,
          name: nameOfTheEvent,
          location: location,
          teams:teams,
          date: eventDate,
          time:  time,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOneEvent("65e6fccc2608695dfd6f4fde")
  }, [])

  const [nameOfTheEvent, setEventName] = useState("");
   const [location, setLocation] = useState("");
   const[teams,setTeams] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [ time, setTime] = useState("");

  useEffect(() => {
    console.log("Time",  time)
    console.log("Date", eventDate)
  }, [eventDate,  time])
 

  const handleCreate = async () => {


    
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
                    onChange={(e) => setEventName(e.target.value)}
                    value = {nameOfTheEvent}
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
                    value = {location}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="numberOfTeams">Number of Teams:</label>
                  <Input
                    type="number"
                    id="numberOfTeams"
                    name="numberOfTeams"
                    required
                    onChange={(e) => setTeams(e.target.value)}
                    value = {teams}
                  />
                </div>
                <div className="DataIem">
                  <label htmlFor="EventDate">Event Date:</label>
                  <DatePicker
                    id="EventDate"
                    name="EventDate"
                    onChange={(date) => setEventDate(date)}
                    value = {moment(eventDate)}
                  />
                </div>

                <div className="DataIem">
                  <label htmlFor="startingTime">Starting Time:</label>
                  <TimePicker
                    id="startingTime"
                    name="startingTime"
                    onChange={(time) => setTime(time )}
                    value ={moment( time)}
                  />
                </div>

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve CreateEventBTn"
                      style={{ backgroundColor: "#05AD1B", width: "80pxx" }}
                      onClick={() => {updateEvent("65e6fccc2608695dfd6f4fde")}}
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
