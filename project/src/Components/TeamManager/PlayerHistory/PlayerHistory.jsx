import React, { useState, useEffect } from 'react';
import './PlayerHistory.css';
import axios from 'axios';
import { Layout, Button, Input, Table, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;

export default function PlayerHistory() {
    
    const navigate = useNavigate();
    const location = useLocation([]);
    const [eventname, setEventName] = useState(""); 
    const [createdEvent, setCreateEvent] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    

    const handleEventNameSearch = (value) => {
        console.log("Event Name Searched: ", value);
        setEventName(value);
    };

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
        navigate("/PlayerDetails", { state: { eventId } });
    };

   

    useEffect(() => {
        getAllCreateEvent();
    }, []);

    return (
        <TeamManagerSideBar>
            <Layout className="ant-layout-sider-children">
                <Layout>
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
                        <div className="search">
                            <Input.Search
                                placeholder="Search by Event Name"
                                style={{
                                    marginBottom: "9px",
                                }}
                                onSearch={handleEventNameSearch}
                                allowClear
                            />
                           
                        </div>
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
                                        ),
                                    },
                                    {
                                        title: "Location",
                                        dataIndex: "Location",
                                        key: "Location",
                                        render: (text, record) => (
                                            <span>{record.location}</span>
                                        ),
                                    },
                                    {
                                        title: "Event Date",
                                        dataIndex: "EventDate",
                                        key: "EventDate",
                                        render: (text, record) => (
                                            <span>{record.eventNewDate}</span>
                                        ),
                                    },
                                    {
                                        title: "Event Time",
                                        dataIndex: "Event Time",
                                        key: "EventTime",
                                        render: (text, record) => (
                                            <span>{record.formattedTime}</span>
                                        ),
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
                                                    Players
                                                </Button>
                                                
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
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </TeamManagerSideBar>
    );
}