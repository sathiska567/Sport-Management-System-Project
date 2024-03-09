import React, { useEffect, useState } from "react";
import "./PlayerAvailability.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Checkbox, Input, Table, message, DatePicker, Button } from "antd";
import axios from "axios";

const { Content } = Layout;

// const dataSource = [
//   {
//     key: "1",
//     eventLocation: "Galle",
//     eventName: "Event 1",
//     eventDate: "2022-01-01",
//     Actions: "Action 1",
//   },
//   {
//     key: "2",
//     eventLocation: "Galle",
//     eventName: "Event 2",
//     eventDate: "2022-02-01",
//     Actions: "Action 2",
//   },
//   {
//     key: "3",
//     eventLocation: "Galle",
//     eventName: "Event 3",
//     eventDate: "2022-03-01",
//     Actions: "Action 3",
//   },
// ];

const PlayerAvailability = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [createdEvent, setCreateEvent] = useState([]);
  const [playerId, setPlayerId] = useState([]);
  // const [available, setAvailable] = useState();
  var available;

  const currentUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res);
      setPlayerId(res.data.user._id);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

  const hanldeAvailability = async (id, isChecked) => {
    // Update your state or data here based on the checkbox state
    console.log("Event Id : ", id);
    console.log("Player Id : ", playerId);
    console.log("isChecked : ", isChecked);

    try {
      const availabilityResponse = await axios.post(
        "http://localhost:8080/api/v1/player-availability/save-player-availability",
        { eventId: id, playerId: playerId, availability: isChecked }
      );

      console.log(availabilityResponse.data.setAvailability.availability);

      if (availabilityResponse.data.success) {
        message.success(availabilityResponse.data.message);

      } else {
        message.error(availabilityResponse.data.message);
      }
    } catch (error) {
      message.error("Error adding availability");
    }
  };


  const removeAvailability = async (id, isChecked) => {
    console.log(id, isChecked);
    console.log("Player Id : ", playerId);

  try {
      const removeResponse = await axios.post(
        "http://localhost:8080/api/v1/player-availability/save-player-availability",
        { eventId: id, playerId: playerId, availability: isChecked }
      );
      console.log(removeResponse.data);

      if (removeResponse.data.success) {
        available = removeResponse.data.setAvailability.availability;
        console.log("current available", available);
        message.success("Availability Remove Successfull !");

      } else {
        message.error(removeResponse.data.message);
      }
    } catch (error) {
      message.error("Error removing availability");
    }
  }

  // GET ALL CREATE EVENT
  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );

      if (response.data.success) {
        setCreateEvent(response.data.data);
        //  console.log(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllCreateEvent();
    currentUserData();
  }, []);

  // Filter userApplicationData based on userRole and Userlocation
  const handleEventLocationSearch = async (value) => {
    console.log("Event Location Searched: ", value);
    try {
      const searchResponse = await axios.post("http://localhost:8080/api/v1/search/search-location", { value })
      console.log(searchResponse.data.data);
      setCreateEvent(searchResponse.data.data)

    } catch (error) {
      message.error("Error searching event location");
    }


    setEventLocation(value);
  };

  const handleDateChange = (date, dateString) => {
    console.log("Date Selected: ", dateString);
    setUserLocation(dateString);
  };

  return (
    <PlayerSideBar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Event Location..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={handleEventLocationSearch}
                // onChange={(e) => handleEventLocationSearch(e.target.value)}
                allowClear
              />
              <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={handleDateChange}
              />
            </div>
            <Table
              columns={[
                {
                  title: "Event Name",
                  dataIndex: "eventName",
                  width: "20%",
                  align: "center",
                  render: (text, record) => (
                    <span>{record.nameOfTheEvent}</span>
                  ),
                },
                {
                  title: "Event Location",
                  dataIndex: "eventLocation",
                  width: "20%",
                  align: "center",
                  render: (text, record) => <span>{record.location}</span>,
                },
                {
                  title: "Event Date",
                  dataIndex: "eventDate",
                  width: "20%",
                  align: "center",
                  render: (text, record) => <span>2024-03-02</span>,
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "20%",
                  align: "center",
                  render: (text, record) => (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        paddingLeft: "50px"
                      }}
                    >
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#05AD1B",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                        onClick={() => hanldeAvailability(record._id, true)}
                      >
                        Add
                      </Button>


                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#05AD1B",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "90px",
                        }}
                        onClick={() => removeAvailability(record._id, false)}
                      >
                        Remove
                      </Button>
                    </span>
                  ),
                },


              ]}
              dataSource={createdEvent}
            />
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

export default PlayerAvailability;
