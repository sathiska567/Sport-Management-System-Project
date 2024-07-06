import React, { useState, useEffect } from 'react'
import "./EventList.css";
import axios from "axios";
import { Layout, Button, Input, Table, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;

export default function ViewMatch() {
    const [userRole, setUserRole] = useState("");
    const [Userlocation, setUserLocation] = useState("");
    const [userApplicationData, setUserApplicationData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation([]);
    const [teamname, setTeamName] = useState("");
    const [evedate, setEventDate] = useState("");
    const [createdEvent, setCreateEvent] = useState([]);


    const [dataSource, setDataSource] = useState([]);



    // Filter userApplicationData based on userRole and Userlocation
    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setEventDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };





    // GET ALL CREATE EVENT 
    const getAllCreateEvent = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/event/get-all-events"
            );

            if (response.data.success) {
                console.log(response);
                setCreateEvent(response.data.data);
            }
        } catch (error) {
            message.error("Error fetching data");
        }
    };

    const handleAssignCoachNavigate = async (eventId) => {
        // console.log(eventId);
        navigate("/AssignCoachesFinal", { state: { eventId } })
    }

    const handleAssignRefereeNavigate = async (eventId) => {
        // console.log(eventId);
        navigate("/referee-availability-final", { state: { eventId } })
    }


    const handleEventLocationSearch = async (value) => {
        try {
            const searchResponse = await axios.post("http://localhost:8080/api/v1/search/search-location", { value });
            setCreateEvent(searchResponse.data.data);
        } catch (error) {
            message.error("Error searching event location");
        }
    };


    useEffect(() => {
        getAllCreateEvent()
    }, [])


    // End

    // JSX structure for the Navbar component
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
                                className="searchInputName"
                                placeholder="Search Event Location..."
                                style={{
                                    marginBottom: "8px",
                                }}
                                onSearch={handleEventLocationSearch}
                                allowClear
                            />
                            {/* <Input.Search
                                type='date'
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleDateSearch}
                                // onChange={(e) => handleTeamNameSearch(e.target.value)}
                                allowClear
                            /> */}
                        </div>
                        {/* Table section */}
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[

                                    {
                                        title: "Event Name",
                                        dataIndex: "EventName",
                                        key: "EventName",
                                        render: (text, record) => (
                                            <span>{record.nameOfTheEvent}</span>
                                        )
                                    },

                                    {
                                        title: " Location",
                                        dataIndex: "Location",
                                        key: "Location",
                                        render: (text, record) => (
                                            <span>{record.location}</span>
                                        )
                                    },


                                    {
                                        title: "Event Date",
                                        dataIndex: "EventDate",
                                        key: "EventDate",
                                        render: (text, record) => (
                                            <span>{record.eventNewDate}</span>
                                        )
                                    },

                                    {
                                        title: "Event Time",
                                        dataIndex: "Event Time",
                                        key: "EventTime",
                                        render: (text, record) => (
                                            <span>{record.formattedTime}</span>
                                        )
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
                                                    // "/AssignCoachesFinal"
                                                    onClick={() => handleAssignCoachNavigate(record._id)}
                                                    style={{
                                                        backgroundColor: "blue",
                                                        color: "#fff",
                                                        width: "100px",
                                                        fontSize: "14px",
                                                        marginRight: "10px",
                                                        borderRadius: "8px",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                >
                                                    Coaches
                                                </Button>

                                                {/* <Button
                                                    type="ghost"
                                                    ghost
                                                    // "/AssignCoachesFinal"
                                                    onClick={()=>handleAssignRefereeNavigate(record._id)}
                                                    style={{
                                                        backgroundColor: "blue",
                                                        color: "#fff",
                                                        fontSize: "14px",
                                                        marginRight: "10px",
                                                        borderRadius: "8px",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                >
                                                   Referees
                                                </Button> */}

                                            </span>
                                        ),
                                    },
                                ]}
                                pagination={{
                                    style: {
                                        marginTop: "10px",
                                    },
                                    pageSize: 5,
                                }}

                                dataSource={createdEvent}
                            ></Table>
                            {console.log(dataSource)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </TeamManagerSideBar>
    );
}