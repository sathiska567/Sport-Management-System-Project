import React, { useEffect, useState } from "react";
import "./CoachReviewPlayers.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Layout, Button, Input, Table, message, Rate } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const PlayerReviews = [
  {
    key: "1",
    pid: "P1",
    playerName: "Player 1",
    location: "Location 1",
    review: 2,
    Actions: "Action 1",
  },
  {
    key: "2",
    pid: "P2",
    playerName: "Player 2",
    location: "Location 2",
    review: 3,
    Actions: "Action 2",
  },
  {
    key: "3",
    pid: "P3",
    playerName: "Player 3",
    location: "Location 3",
    review: 4,
    Actions: "Action 3",
  },
];

const CoachReviewPlayers = () => {
  const [playerName, setPlayerName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  // Filter userApplicationData based on userRole and Userlocation
const filteredData = PlayerReviews.filter((data) => {
    return (
      (!playerName ||
        data.playerName.toLowerCase().includes(playerName.toLowerCase())) &&
      (!searchLocation ||
        data.location.toLowerCase().includes(searchLocation.toLowerCase()))
    );
  });


// get all palyer details
  const handleGetAllPlayerDetails = async() => {
      console.log("nice");

      // try {
      //   const response = await axios.get("http://localhost:8080/api/v1/admin/get-all-details")
      //   console.log(response.data.allApplyingDetails.length);

      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i];
          
      //   }
        
      // } catch (error) {
      //    message.error("Something went wrong");
      // }

  }

useEffect(()=>{
  handleGetAllPlayerDetails()
},[])

  return (
    <CoachSidebar>
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
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Player Name..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={(value) => setPlayerName(value)}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <Input.Search
                className="searchInputName"
                placeholder="Search Event Location..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={(value) => setSearchLocation(value)}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Table
              columns={[
                {
                  title: "P_ID",
                  dataIndex: "pid",
                  width: "10%",
                  align: "center",
                },
                {
                  title: "Player Name",
                  dataIndex: "playerName",
                  width: "25%",
                  align: "center",
                },
                {
                  title: "Location",
                  dataIndex: "location",
                  width: "15%",
                  align: "center",
                },
                {
                  title: "Review",
                  dataIndex: "review",
                  width: "25%",
                  align: "center",
                  render: () => <Rate disabled defaultValue={2} />,
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "25%",
                  align: "center",
                  render: (text, record) => (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="primary"
                        className="Button"
                        href="/coach-review-form"
                        style={{
                          backgroundColor: "#52c41a",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "100px",
                        }}
                      >
                        Comment
                      </Button>
                    </span>
                  ),
                },
              ]}
              dataSource={filteredData}
            />
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

export default CoachReviewPlayers;
