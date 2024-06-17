import React, { useState, useEffect } from 'react'
import './AssignPlayerMatches.css'
import axios from "axios";
import { Layout, Input, Table, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PlayerSideBar from '../PlayerSideBar/PlayerSideBar';
const { Content } = Layout;

export default function ViewMatch() {
    const [nameOfTheEvent, setTeamName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [playerId , setPlayerId] = useState("");
    const navigate = useNavigate();

    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setEventDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };

      //GET CURRENT USER DATA
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
      setPlayerId(res.data.user._id)

    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

    const getAssignPlayerMatches = async()=>{
        try {
           const assignEventResponse = await axios.post("http://localhost:8080/api/v1/event/getPlayerAssignEvent",{playerId:playerId})
           console.log(assignEventResponse.data); 
           if(assignEventResponse.data.success){
               setDataSource(assignEventResponse.data.data)
           }
        } catch (error) {
           message.error("An error occurred while getting assign matches data.");
        }
    }

    useEffect(() => {
        currentUserData();
    }, []);

    useEffect(() => {
        if (playerId) {
            getAssignPlayerMatches();
        }
    }, [playerId]);

    return (
        <PlayerSideBar>
            <Layout className="ant-layout-sider-children">
                <Layout>
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
                                placeholder="Search by Event Name"
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleTeamNameSearch}
                                allowClear
                            />
                            <Input.Search
                                type='date'
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleDateSearch}
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
                                        )
                                    },
                                    {
                                        title: "Location",
                                        dataIndex: "Location",
                                        key: "Location",
                                        render: (text, record) => (
                                            <span>{record.location}</span>
                                        )
                                    },
                                    {
                                        title: "Teams",
                                        dataIndex: "Teams",
                                        key: "Teams",
                                        render: (text, record) => (
                                            <span>{record.numberOfTeams}</span>
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
                                        dataIndex: "EventTime",
                                        key: "EventTime",
                                        render: (text, record) => (
                                            <span>{record.formattedTime}</span>
                                        )
                                    },
                                    // {
                                    //     title: "Actions",
                                    //     dataIndex: "Actions",
                                    //     key: "Actions",
                                    //     render: (text, record) => (
                                    //         <span
                                    //             style={{
                                    //                 display: "flex",
                                    //                 flexDirection: "row",
                                    //                 gap: "10px",
                                    //             }}
                                    //         >
                                    //             <Button
                                    //                 type="ghost"
                                    //                 ghost
                                    //                 onClick={() => handleViewNavigate(record)}
                                    //                 style={{
                                    //                     backgroundColor: "green",
                                    //                     color: "#fff",
                                    //                     fontSize: "14px",
                                    //                     marginRight: "10px",
                                    //                     borderRadius: "8px",
                                    //                     marginTop: "auto",
                                    //                     marginBottom: "auto",
                                    //                 }}
                                    //             >
                                    //                 View
                                    //             </Button>
                                    //         </span>
                                    //     ),
                                    // },
                                ]}
                                pagination={{
                                    style: {
                                        marginTop: "10px",
                                    },
                                    pageSize: 5,
                                }}
                                dataSource={dataSource}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </PlayerSideBar>
    );
}