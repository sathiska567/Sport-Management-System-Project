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
  const [playerDetails, setPlayerDetails] = useState([]);
  const [playerReview, setPlayerReview] = useState([]);
  let sum = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits, setLimits] = useState(3);


  const fetchData = async (page) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/player/player-pagination', { page });
      console.log("response", response)
      setPlayerDetails(response.data.data.players);
      setTotal(response.data.data.totalPlayers);
      setLimits(response.data.data.limit)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };


  const handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/player/player-details"
      );
      console.log(response.data.players);

      if (response.data.success) {
        // message.success(response.data.message)
        // setPlayerDetails(response.data.players);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };


  const handleNavigate = async (id) => {
    console.log(id);
    navigate("/coach-review-form", { state: { id: id } });
  };


  const getReview = async () => {
    try {
      const reviewResponse = await axios.get(
        "http://localhost:8080/api/v1/review/get-overall-review-without-pagination"
      );
      if (reviewResponse.data.success) {
        setPlayerReview(reviewResponse.data.data);
      }
    } catch (error) {
      message.error("Something went wrong inside the get Review section");
    }
  };



  useEffect(() => {
    handleGetAllPlayerDetails();
    getReview();
    // individualRatings()
  }, []);


  // Filter userApplicationData based on userRole and Userlocation
  const handlePlayerNameSearch = async(value) => {
    console.log(value);
    try {
      const searchResult = await axios.post("http://localhost:8080/api/v1/player/search-player",{playerName:value});
      console.log(searchResult.data.data);
      setPlayerDetails(searchResult.data.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // const handleEventLocationSearch = (value) => {
  //   console.log(value);
  // };


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
                  marginBottom: "8px"
                }}
                onSearch={handlePlayerNameSearch}
                allowClear
              />

              {/* <Input.Search
                className="searchInputName"
                placeholder="Search Event Location..."
                style={{
                  marginBottom: "8px",
                }}
                onSearch={handleEventLocationSearch}
                allowClear
              /> */}
            </div>
            <Table
              columns={[
                // {
                //   title: "P_ID",
                //   dataIndex: "pid",
                //   width: "10%",
                //   align: "center",
                //   render: (text, record) => <span>{record._id}</span>,
                // },
                {
                  title: "Player Name",
                  dataIndex: "playerName",
                  width: "25%",
                  align: "center",
                  render: (text, record) => <span>{record.username}</span>,
                },
                {
                  title: "Email",
                  dataIndex: "location",
                  width: "15%",
                  align: "center",
                  render: (text, record) => <span>{record.email}</span>,
                },
                {
                  title: "Overall Review",
                  dataIndex: "review",
                  width: "15%",
                  align: "center",
                  render: (text, record) => {
                    const relevantReviews = playerReview.filter((review) => review.playerId === record._id);
                    const sum = relevantReviews.reduce((acc, review) => acc + review.overallReview,0);
                    const averageRating = relevantReviews.length ? sum / relevantReviews.length : 0;
                    return (
                      <div>
                        <Rate disabled value={averageRating}  />
                        {console.log(averageRating)}
                        {/* <span>{averageRating.toFixed(2)}</span> */}
                      </div>
                    );
                  },
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
                        // href="/coach-review-form"
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
                        onClick={() => handleNavigate(record._id)}
                      >
                        Comment
                      </Button>
                    </span>
                  ),
                },
              ]}
              pagination={{
                style: {
                  marginTop: "10px",
                },
                // pageSize: 5,
                current: currentPage ? currentPage : 1,
                total: total,
                pageSize: limits,
                onChange: handlePagination,
              }}
              dataSource={playerDetails}
            />
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

export default CoachReviewPlayers;
