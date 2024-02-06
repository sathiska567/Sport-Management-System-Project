import React, { useEffect, useState } from "react";
import "./EOViewFixture.css";
import EOSiderBar from "../EOSideBar/EOSideBar";
import { Layout, Button, Input, Table, message, DatePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const EOViewFixture = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [createdFixture, setCreatedFixture] = useState([]);
  const navigate = useNavigate();

  // Filter userApplicationData based on userRole and Userlocation
  const filteredData = dataSource.filter((data) => {
    return (
      (!eventLocation ||
        data.eventLocation
          .toLowerCase()
          .includes(eventLocation.toLowerCase())) &&
      (!userLocation ||
        data.eventDate.toLowerCase().includes(userLocation.toLowerCase()))
    );
  });


//  GET ALL CREATED FIXTURE 
const getFixtureData = async()=>{

  try {
    const response = await axios.get("http://localhost:8080/api/v1/get/get-fixture")
    // console.log(response.data.data);
    setCreatedFixture(response.data.data)
    
  } catch (error) {
     message.error("Error fetching fixture data");
  }

}



const handleView = async(id)=>{
   console.log(id);
   navigate("/shuffle-fixture",{state:{id:id}})

}


useEffect(()=>{
   getFixtureData();
},[])


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
                onSearch={(value) => setEventLocation(value)}
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={(date, dateString) => setUserLocation(dateString)}
              />
            </div>
            <Table
              columns={[
                {
                  title: "Event Name",
                  dataIndex: "eventName",
                  width: "20%",
                  align: "center",
                  render: (text,record) => (
                    <span>{record.nameOfTheEvent}</span>
                  )
                },
                {
                  title: "Event Location",
                  dataIndex: "eventLocation",
                  width: "20%",
                  align: "center",
                  render: (text,record) => (
                    <span>{record.location}</span>
                  )
                },
                {
                  title: "Event Date",
                  dataIndex: "eventDate",
                  width: "20%",
                  align: "center",
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
                      <Button
                        type="primary"
                        className="Button"
                        style={{
                          backgroundColor: "#52c41a",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                        onClick={() => handleView(record._id) }
                      >
                        View
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#13c2c2",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                      >
                        Shuffle
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#faad14",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#f5222d",
                          color: "#fff",
                          fontSize: "14px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                      >
                        Delete
                      </Button>
                    </span>
                  ),
                },
              ]}
              dataSource={createdFixture}
            />
          </Content>
        </Layout>
      </Layout>
    </EOSiderBar>
  );
};

export default EOViewFixture;
