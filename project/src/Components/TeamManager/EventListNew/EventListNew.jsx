import React, { useState, useEffect } from 'react'
import "./EventListNew.css";
import axios from "axios";
import { Layout, Button, Input, Table } from 'antd';
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


    const [dataSource, setDataSource] = useState([]);



    // seacrch team name and date function
    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setEventDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };



    // getdata  and search players
    const getFetchData = async (teamname, evedate) => {
        axios.defaults.baseURL = "http://localhost:8080/api/v1/eventViewNew"
        
        try {
            const response = await axios.get(`/get-assignee-Event-CoachesAndPlayers?q=${teamname}&date=${evedate}`);
            console.log(response.data);
    
            if (response.data.success) {
                setDataSource(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        getFetchData(teamname, evedate);
    }, [teamname,evedate])

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
                            padding: 24,
                            minHeight: 180,
                            height: "100%",
                            background: "whitesmoke",
                        }}
                    >
                        {/* Search bars team names and date  */}
                        <div className="search">
                            <Input.Search
                                placeholder="Search by Team Name"
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

                        
                        {/* Table section include eventname,teamname, eventdate and action column */}
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[

                                    {
                                        title: "Event Name",
                                        dataIndex: "EventName",
                                        key: "EventName",
                                        render: (text, record) => (
                                            <span>{record. evename}</span>
                                        )
                                    },

                                    {
                                        title: " Team Name",
                                        dataIndex: "TeamName",
                                        key: "TeamName",
                                        render: (text, record) => (
                                            <span>{record.teamname}</span>
                                        )
                                    },

                                    
                                    {
                                        title: "Event Date",
                                        dataIndex: "EventDate",
                                        key: "EventDate",
                                        render: (text, record) => (
                                            <span>{record. evedate}</span>
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
                                                <Button //Assign coach button
                                                    type="ghost"
                                                    ghost
                                                    href="/AssignCoaches"
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
                                                    Assign Coaches
                                                </Button>
                                                <Button //Assign player button
                                                    type="ghost"
                                                    ghost
                                                    href="/TeamManagerAssign"
                                                    style={{
                                                        backgroundColor: "green",
                                                        color: "#fff",
                                                        fontSize: "14px",
                                                        marginRight: "10px",
                                                        borderRadius: "8px",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                >
                                                    Assign Players
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