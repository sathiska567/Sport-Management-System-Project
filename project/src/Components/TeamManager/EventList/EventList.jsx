import React, { useState, useEffect } from 'react'
import "./EventList.css"
import axios from "axios";
import { Layout, Button, Input, Table } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamManagerSideBar from '../TeamManagerSideBar/TeamManagerSideBar';
const { Content } = Layout;


axios.defaults.baseURL = "http://localhost:8080/api/v1/eventView"
export default function EventList() {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);


  const [dataSource, setDataSource] = useState([]);





  // Filter userApplicationData based on userRole and Userlocation
  const handleEventNameSearch = (value) => {
    console.log("Event Name Searched: ", value);
    setUserRole(value);
  };

  const handleTeamNameSearch = (value) => {
    console.log("Team Name Searched: ", value);
    setUserLocation(value);
  };



  // table
  const getFetchData = async () => {

    const data = await axios.get("/get-assignee-Event-Member")
    console.log(data)

    if (data.data.success) {
      setDataSource(data.data.data)
    }

  }
  useEffect(() => {
    getFetchData()

  }, [])
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
            {/* Search section */}
            <div className="searched">
              <Input.Search
                placeholder="Search Event Name"
                styles={{
                  marginBottom: "9",
                }}
                onSearch={handleEventNameSearch}
                // onChange={(e) => handleEventNameSearch(e.target.value)}
                allowClear
              />
              <Input.Search
                placeholder="Search Team Name"
                styles={{
                  marginBottom: "9",
                }}
                onSearch={handleTeamNameSearch}
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
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                    render: (text, record) => (
                      <span>{record.evename}</span>
                    )
                  },

                  {
                    title: "Team Name",
                    dataIndex: "teamName",
                    key: "teamName",
                    render: (text, record) => (
                      <span>{record.teamname}</span>
                    )
                  },

                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                    render: (text, record) => (
                      <span>{record.evedate}</span>
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
                          href="/AssignCoaches"
                          style={{
                            backgroundColor: "#597ef7",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Assign Coach
                        </Button>
                        <Button
                          type="ghost"
                          ghost
                          href="/TeamManager-assign-member-player"
                          style={{
                            backgroundColor: "#9254de",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "8px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        >
                          Assign Player
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