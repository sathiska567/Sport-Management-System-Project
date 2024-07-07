import React, { useState, useEffect } from "react";
import "./EventList.css";
import axios from "axios";
import { Layout, Button, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
const { Content } = Layout;

export default function TeamList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventName, teamNames } = location.state;

  const [teams, setTeams] = useState([]);

  const getTeamsByEvent = async (eventName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/EventTeam/eventTeams/${eventName}`
      );
      if (response.data.success) {
        setTeams(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (eventName) {
      getTeamsByEvent(eventName);
    }
  }, [eventName]);

  const handleTeamNavigate = (teamId, teamName, eventName) => {
    navigate("/PointTableForm", { state: { teamId, teamName, eventName } });
  };

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
                    title: "Team Name",
                    dataIndex: "TeamName",
                    key: "TeamName",
                    render: (text, record) => <span>{record}</span>,
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
                            handleTeamNavigate(
                              record._id,
                              record,
                              eventName
                            )
                          }
                          style={{
                            backgroundColor: "blue",
                            color: "#fff",
                            width: "200px",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Enter Event Details
                        </Button>
                      </span>
                    ),
                  },
                ]}
                pagination={{ style: { marginTop: "10px" }, pageSize: 5 }}
                dataSource={teamNames}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
}