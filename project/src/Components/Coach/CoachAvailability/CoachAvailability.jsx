import React, { useEffect, useState } from "react";
import "./CoachAvailability.css";
import EOSiderBar from "../CoachSidebar/CoachSidebar";
import { Layout, Checkbox, Input, Table, message, DatePicker } from "antd";
import axios from "axios";

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    eventLocation: "Galle",
    eventName: "Event 1",
    eventDate: "2022-01-01",
    Actions: "Action 1",
  },
  {
    key: "2",
    eventLocation: "Galle",
    eventName: "Event 2",
    eventDate: "2022-02-01",
    Actions: "Action 2",
  },
  {
    key: "3",
    eventLocation: "Galle",
    eventName: "Event 3",
    eventDate: "2022-03-01",
    Actions: "Action 3",
  },
];

const CoachAvailability = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [coachId,setCoachId] = useState([])
  const [createEvent, setCreateEvent] = useState([]);
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
      setCoachId(res.data.user._id)

    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };


  // GET ALL CREATE EVENT 
const getAllCreateEvent = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/event/get-all-events"
    );

    if (response.data.success) {
      setCreateEvent(response.data.data);
    }
  } catch (error) {
    message.error("Error fetching data");
  }
};


  // Filter userApplicationData based on userRole and Userlocation

  const handleCheckboxChange = async(id,key, isChecked) => {
    // Update your state or data here based on the checkbox state
    console.log("Event Id",id);
    console.log("Coach Id",coachId);
    console.log(isChecked);

    try {
      const availabilityResponse = await axios.post("http://localhost:8080/api/v1/availability/save-coach-availability",{eventId:id,coachId:coachId,availability:isChecked})
      console.log(availabilityResponse.data);
      
      if(availabilityResponse.data.success){
         message.success(availabilityResponse.data.message)
      }

      else{
        message.error(availabilityResponse.data.message)
      }

    } catch (error) {
      message.error("Error adding availability");
    }

  };
  useEffect(()=>{
    getAllCreateEvent()
    currentUserData()
  },[])


  //filter data
  const handleEventLocationSearch = (value) => {
    console.log("Event Location Searched: ", value);
  };

  const handleDateChange = (date, dateString) => {
    console.log("Date Selected: ", dateString);
  };


  return (
    <EOSiderBar>
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
                  render: (text, record) => <span>{"2024-02-03"}</span>,
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "40%",
                  align: "center",
                  render: (text, record) => (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        onChange={(e) =>
                          handleCheckboxChange(
                            record._id,
                            record.key,
                            e.target.checked
                          )
                        }
                      />
                    </span>
                  ),
                },
              ]}
              dataSource={createEvent}
            />
          </Content>
        </Layout>
      </Layout>
    </EOSiderBar>
  );
};

export default CoachAvailability;
