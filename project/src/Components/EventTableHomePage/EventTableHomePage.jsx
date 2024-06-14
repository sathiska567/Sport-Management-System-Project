import React, { useState, useEffect } from 'react';
import './EventTableHomePage.css';
import axios from "axios";
import { Layout, Input, Table, message } from 'antd';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

export default function ViewMatch(prams) {
    const [nameOfTheEvent, setTeamName] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const location = useLocation([]);

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };

    const getFetchData = async (nameOfTheEvent) => {        
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/EventtableHomePage/get-coachesassigne/?q=${nameOfTheEvent}`);
            console.log(response.data);
    
            if (response.data.success) {
                setDataSource(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getFetchData(nameOfTheEvent);
    }, [nameOfTheEvent])

    return (
        <Layout className="ant-layout-sider-children" style={{ backgroundImage: "url('/path/to/your/image.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <Layout>
                <Content
                    className="ant-layout-content"
                    style={{
                        margin: "16px auto", // Center the content
                        padding: 24,
                        minHeight: 180,
                        height: "100%",
                        background: "rgba(255,255,255,0.8)", // You may want to adjust the opacity here
                        maxWidth: "calc(100% - 600px)" // Reduce width by 50px
                    }}
                >
                    <div className="search" style={{
                        marginLeft:200
                    }}>
                        <Input.Search
                            placeholder="Search by Event Name"
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
                                    title: "Event Name",
                                    dataIndex: "EventName",
                                    key: "EventName",
                                    render: (text, record) => (
                                        <span>{record. nameOfTheEvent}</span>
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
                                    title: " Teams",
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
                            ]}
                            pagination={{
                                style: {
                                    marginTop: "10px",
                                },
                                pageSize: 5,
                            }}
                            dataSource={dataSource}
                        ></Table>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
