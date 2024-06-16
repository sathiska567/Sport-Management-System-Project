import React, { useState, useEffect } from 'react'
import "./PointTableDetails.css";
import axios from "axios";
import { Layout, Input, Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;

axios.defaults.baseURL = "http://localhost:8080/api/v1/PointTableFullCode"

export default function SearchPlayerProfile() {
    
    const location = useLocation([]);
    const [name, setName] = useState("");
    const [dataSource, setDataSource] = useState([]);

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setName(value);
    };

    const getFetchData = async (name) => {
        try {
            const response = await axios.get(`/get-pointTable?q=${name}`);
            console.log(response.data);
    
            if (response.data.success) {
                setDataSource(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getFetchData(name);
    }, [name])

    return (
        <TeamManagerSideBar>
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
                        <div className="searched">
                            <Input.Search
                                placeholder="Search by Name"
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleTeamNameSearch}
                                allowClear
                            />
                        </div>
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[
                                    {
                                        title: "Team Name ",
                                        dataIndex: "Team Name",
                                        key: "Taem Name",
                                        render: (text, record) => (
                                            <span>{record.nameOfTheTeam}</span>
                                        )
                                    },
                                    {
                                        title: " Won",
                                        dataIndex: "Won",
                                        key: "Won",
                                        render: (text, record) => (
                                            <span>{record.wonMatches}</span>
                                        )
                                    },
                                    {
                                        title: "Lost",
                                        dataIndex: "Lost",
                                        key: "Lost",
                                        render: (text, record) => (
                                            <span>{record.lostMatches}</span>
                                        )
                                    },
                                    {
                                        title: "NRR",
                                        dataIndex: "nrr",
                                        key: "NRR",
                                        render: (text, record) => (
                                            <span>{record.nrr}</span>
                                        )
                                    }
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
