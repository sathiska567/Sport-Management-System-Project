import React, { useEffect, useState } from "react";
import "./PlayerList.css";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import { Layout, Table, message, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const { Content } = Layout;

const PlayerList = () => {


  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const getFetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/GetPlayers/get-players");
      if (data.success) {
        setDataSource(data.data);
      }
    } catch (error) {
      message.error("Error fetching player data");
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handlePerformanceClick = (playerName) => {
    navigate("/PlayerDetailsForm", { state: { playerName } }); // Navigate with state
  };

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
            <div className="tableContainer">

              <Table
                className="Table"
                columns={[

                  {
                    title: "Player Name",
                    dataIndex: "playerName",
                    key: "playerName",
                  },


                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    render: (text, record) => (
                      <Button
                        type="ghost"
                        ghost
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
                        onClick={() => handlePerformanceClick(record.playerName)} // Pass the player name
                      >
                        Performance
                      </Button>


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
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
    
  );
};

export default PlayerList;