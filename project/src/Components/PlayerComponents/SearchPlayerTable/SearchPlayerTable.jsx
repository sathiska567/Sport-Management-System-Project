import React, { useState, useEffect } from 'react'
import './SearchPlayerTab.css'
import axios from "axios";
import { Layout, Button, Input, Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayerSideBar from '../PlayerSideBar/PlayerSideBar';
const { Content } = Layout;


axios.defaults.baseURL = "http://localhost:8080/api/v1/playerSearchTable"

export default function SearchPlayerProfile() { 
    const [userRole, setUserRole] = useState("");
    const [Userlocation, setUserLocation] = useState("");
    const [userApplicationData, setUserApplicationData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation([]);
    const [email, setEmail] = useState("");
   


    const [dataSource, setDataSource] = useState([]);





    // Filter userApplicationData based on userRole and Userlocation
    

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setEmail(value);
    };



    // getdata  and search players
    const getFetchData = async (email) => {
        try {
            const response = await axios.get(`/get-search-player-profile?q=${email}&role=player`);
            console.log(response.data);
    
            if (response.data.success) {
                setDataSource(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        getFetchData(email);
    }, [email])

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
                                placeholder="Search by Email"
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleTeamNameSearch}
                                // onChange={(e) => handleEventNameSearch(e.target.value)}
                                allowClear
                            />
                            
                        </div>
                        {/* Table section */}
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[

                                    {
                                        title: "PID",
                                        dataIndex: "PID",
                                        key: "PID",
                                        render: (text, record) => (
                                            <span>{record._id}</span>
                                        )
                                    },

                                    {
                                        title: " Name",
                                        dataIndex: "Name",
                                        key: "Name",
                                        render: (text, record) => (
                                            <span>{record.username}</span>
                                        )
                                    },

                                    
                                    {
                                        title: "Email",
                                        dataIndex: "Email",
                                        key: "Email",
                                        render: (text, record) => (
                                            <span>{record.email}</span>
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
                                                    href="/PlayerGetProfile"
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