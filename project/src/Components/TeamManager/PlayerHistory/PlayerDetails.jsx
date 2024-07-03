import React, { useState, useEffect } from 'react';
import './PlayerDetails.css';
import axios from 'axios';
import { Layout, Button, Input, Table, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;

export default function PlayerDetails() {
    
    const navigate = useNavigate();
    const location = useLocation([]);
    const [playerName, setPlayerName] = useState("");
     const [PlayerDetails, setPlayerDetails] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    

    const handlePlayerNameSearch = (value) => {
        console.log("Player Name Searched: ", value);
        setPlayerName(value);
    };

    const getAllPlayers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/"
            );

            if (response.data.success) {
                console.log(response);
                setPlayerDetails(response.data.data);
            }
        } catch (error) {
            message.error("Error fetching data");
        }
    };

    const  handleAddPlayerDetailsNavigate = async (eventId) => {
        navigate("/history-form", { state: { eventId } });
    };

    

    useEffect(() => {
        getAllPlayers();
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
                                placeholder="Search by player Name"
                                style={{
                                    marginBottom: "9px",
                                }}
                                onSearch={handlePlayerNameSearch}
                                allowClear
                            />
                           
                        </div>
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[
                                    {
                                        title: "Player Id",
                                        dataIndex: "PlayerId",
                                        key: "playerId",
                                        render: (text, record) => (
                                            <span>{record.PlayerId}</span>
                                        ),
                                    },
                                    {
                                        title: "Player Name",
                                        dataIndex: "PlayerName",
                                        key: "PlayerName",
                                        render: (text, record) => (
                                            <span>{record.PlayerName}</span>
                                        ),
                                    },
                                    {
                                        title: "Player Role",
                                        dataIndex: "PlayerRole",
                                        key: "PlayerRole",
                                        render: (text, record) => (
                                            <span>{record.playerRole}</span>
                                        ),
                                    },
                                    {
                                        title: "Performance",
                                        dataIndex: "Performance",
                                        key: "Performance",
                                        render: (text, record) => (
                                            <span>{record.performance}</span>
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
                                                    onClick={() => handleAddPlayerDetailsNavigate(record._id)}
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
                                                    Add Details
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
                                dataSource={PlayerDetails}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </TeamManagerSideBar>
    );
}