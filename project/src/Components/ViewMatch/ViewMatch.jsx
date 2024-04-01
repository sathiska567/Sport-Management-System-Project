import React, { useState, useEffect } from 'react'
import "./ViewMatch.css";
import axios from "axios";
import { Layout, Button, Input, Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayerSideBar from '../PlayerComponents/PlayerSideBar/PlayerSideBar';
const { Content } = Layout;


axios.defaults.baseURL = "http://localhost:8080/api/v1/viewMatch"

export default function ViewMatch() {
    const [userRole, setUserRole] = useState("");
    const [Userlocation, setUserLocation] = useState("");
    const [userApplicationData, setUserApplicationData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation([]);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");


    const [dataSource, setDataSource] = useState([]);





    // Filter userApplicationData based on userRole and Userlocation
    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setName(value);
    };



    // getdata  and search players
    const getFetchData = async (name, date) => {
        try {
            const response = await axios.get(`/get-match-details?q=${name}&date=${date}`);
            console.log(response.data);
    
            if (response.data.success) {
                setDataSource(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        getFetchData(name, date);
    }, [name, date])

    // End

    // JSX structure for the Navbar component
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
                        {/* Search section */}
                        <div className="searched">
                            <Input.Search
                                placeholder="Search by Name"
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleTeamNameSearch}
                                // onChange={(e) => handleEventNameSearch(e.target.value)}
                                allowClear
                            />
                            <Input.Search
                                type='date'
                                placeholder="Search by Team name"
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
                                        title: "EventID",
                                        dataIndex: "EventID",
                                        key: "EventID",
                                        render: (text, record) => (
                                            <span>{record.eid}</span>
                                        )
                                    },

                                    {
                                        title: " Name",
                                        dataIndex: "Name",
                                        key: "Name",
                                        render: (text, record) => (
                                            <span>{record.name}</span>
                                        )
                                    },

                                    {
                                        title: "Location",
                                        dataIndex: "Location",
                                        key: "Location",
                                        render: (text, record) => (
                                            <span>{record. location}</span>
                                        )
                                    },
                                    {
                                        title: "Date",
                                        dataIndex: "Date",
                                        key: "Date",
                                        render: (text, record) => (
                                            <span>{record. date}</span>
                                        )
                                    },
                                    {
                                        title: "Event Name",
                                        dataIndex: "Event Name",
                                        key: "Event Name",
                                        render: (text, record) => (
                                            <span>{record. ename}</span>
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
                                                    VIEW
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
            </PlayerSideBar>
    );
}
