import React, { useState, useEffect } from 'react'
import "./AssignCoachesFinal.css";
import axios from "axios";
import { Layout, Button, Input, Table, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;

export default function AssignCoachesFinal() {
    const [userRole, setUserRole] = useState("");
    const [Userlocation, setUserLocation] = useState("");
    const [userApplicationData, setUserApplicationData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation([]);
    const [teamname, setTeamName] = useState("");
    const [evedate, setEventDate] = useState("");

    const [createdEvent , setCreateEvent] = useState([]);
    const [addedEvents, setAddedEvents] = useState(false);

    const [dataSource, setDataSource] = useState([]);

  console.log(location);
    // Filter userApplicationData based on userRole and Userlocation
    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setEventDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };


    const getAvailableCoaches = async () => {
         try {
            const availabilityEventResponse = await axios.post("http://localhost:8080/api/v1/coach/assign",{eventId:location.state.eventId})
        //     console.log(availabilityEventResponse);   
            if(availabilityEventResponse.data.success){
                setDataSource(availabilityEventResponse.data.data);
            } 
         } catch (error) {
               message.error("Error fetching data");
         }   
    }

    const handleCoachAdd = async(coachId)=>{
        try {
                const addCoaches = await axios.post("http://localhost:8080/api/v1/event/assignCoaches",{eventId:location.state.eventId ,coachId:coachId})
                console.log(addCoaches);
                if(addCoaches.data.success){
                    message.success("Coach Assigned Successfully");
                    setAddedEvents(addCoaches.data.success);
                }

                console.log(addedEvents);
        
             } catch (error) {
                   message.error("Error fetching data");
             }  
    }

    useEffect(() => {
        getAvailableCoaches()
    },[])

    return (
      <TeamManagerSideBar>
        <Layout className="ant-layout-sider-children">
          {/* Main content layout */}
          <Layout>
            {/* Content section with statistics */}
            <Content
              className="ant-layout-content"
              style={{
                margin: "16px",
                padding: 0,
                minHeight: 180,
                height: "100%",
                background: "whitesmoke",
              }}
            >
              {/* Search section */}
              <div className="search">
                <Input.Search
                  placeholder="Search by Team Name"
                  styles={{
                    marginBottom: "9",
                  }}
                  onSearch={handleTeamNameSearch}
                  // onChange={(e) => handleEventNameSearch(e.target.value)}
                  allowClear
                />
                <Input.Search
                  type="date"
                  styles={{
                    marginBottom: "9",
                  }}
                  onSearch={handleDateSearch}
                  // onChange={(e) => handleTeamNameSearch(e.target.value)}
                  allowClear
                />
              </div>
              {/* Table section */}
              <div className="tabContainer">
                <Table
                  className="Tab"
                  columns={[
                    {
                      title: "Coach Name",
                      dataIndex: "CoachName",
                      key: "CoachName",
                      render: (text, record) => <span>{record.username}</span>,
                    },

                    {
                      title: "Email",
                      dataIndex: "Email",
                      key: "Email",
                      render: (text, record) => <span>{record.email}</span>,
                    },

                    {
                      title: "Actions",
                      dataIndex: "Actions",
                      key: "Actions",
                      render: (text, record) => (
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                          }}
                        >
                          <Button
                            type="ghost"
                            ghost
                            onClick={() => handleCoachAdd(record.id)}
                            style={{
                              backgroundColor: addedEvents
                                ? "#D94D34"
                                : "#05AD1B",
                              color: "#fff",
                              fontSize: "14px",
                              marginRight: "10px",
                              borderRadius: "8px",
                              marginTop: "auto",
                              marginBottom: "auto",
                            }}
                          >
                            {addedEvents ? "Added Coach" : "Add Coach"}
                          </Button>
                        </span>
                      ),
                    },
                  ]}
                  pagination={{
                    style: {
                      marginTop: "10px",
                    },
                    pageSize: 6,
                  }}
                  dataSource={dataSource}
                ></Table>
                {console.log(dataSource)}
              </div>
            </Content>
          </Layout>
        </Layout>
      </TeamManagerSideBar>
    );
}