import React, { useState, useEffect } from "react";
import "./EventListPointTable.css";
import axios from "axios";
import { Layout, Button, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
const { Content } = Layout;

export default function EventListPointTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [createdEvent, setCreateEvent] = useState([]);

  const getAllCreateEvent = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/EventAndTeamList/eventsandTeams"
      );
      if (response.data.success) {
        setCreateEvent(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  const handleEventNavigate = async (eventName, teamNames) => {
    navigate("/TeamList", { state: { eventName, teamNames } });
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
                    render: (text, record) => <span>{record.location}</span>,
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
                          onClick={() =>
                            handleEventNavigate(
                              record.nameOfTheEvent,
                              record.nameOfTheTeam
                            )
                          }
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
                          Teams
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{ style: { marginTop: "10px" }, pageSize: 5 }}
                dataSource={createdEvent}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
}
