// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import "./PlayerReviews.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Input, Table, Image, DatePicker, Rate, message } from "antd";
import axios from "axios";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const PlayerReviews = () => {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPlayerId, setCurrentPlayerId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPlayerReviews, setCurrentPlayerReviews] = useState([]);
  const [reviewGivenCoachId, setReviewGivenCoachId] = useState([]);
  const [reviewGivenCoachName, setReviewGivenCoachName] = useState([]);
  const [reviewGivenCoachEmail, setReviewGivenCoachEmail] = useState([]);

  const sampleData = [
    {
      key: "1",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      coachName: "John Doe",
      reviewDate: "2022-01-01",
      rating: 4.5,
      comment: "Well done keep it up!",
    },
    {
      key: "2",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      coachName: "Jane Smith",
      reviewDate: "2022-02-01",
      rating: 3,
      comment: "Need to improve bowling side.",
    },
    {
      key: "3",
      profile:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image",
      coachName: "Bob Johnson",
      reviewDate: "2022-03-01",
      rating: 3.5,
      comment: "Excellent Bowling!",
    },
  ];

  //GET CURRENT USER DATA
  const currentUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the state with the current user ID
      setCurrentPlayerId(res.data.user._id);

      const playerReviewResponse = await axios.get(
        "http://localhost:8080/api/v1/review/get-overall-review"
      );
      console.log(playerReviewResponse.data.review);

      if (playerReviewResponse.data.success) {
        message.success(playerReviewResponse.data.message);
      }

      const newReview = [];
      const coachId = [];

      for (let i = 0; i < playerReviewResponse.data.review.length; i++) {
        if (playerReviewResponse.data.review[i].playerId === res.data.user._id) {
          newReview.push(playerReviewResponse.data.review[i]);
          coachId.push(playerReviewResponse.data.review[i].reviewGivenCoachId);
        }

        // console.log(playerReviewResponse.data.review[i].playerId);
      }

      setCurrentPlayerReviews(newReview);
      setReviewGivenCoachId(coachId);

      console.log("Current player Review", newReview);
    } catch (error) {
      message.error("Error inside the Get currentUserData function");
    }
  };

  const combineTable = [...currentPlayerReviews, reviewGivenCoachName];

  useEffect(() => {
    currentUserData();
  }, []);

  // Filter sampleData based on userRole and Userlocation
  const handleCoachNameSearch = (value) => {
    console.log("Coach Name Searched: ", value);
    setUserRole(value);
  };

  const handleDateChange = (date, dateString) => {
    console.log("Date Selected: ", dateString);
    setUserLocation(dateString);
  };

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
            <div className="search">
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >
                <Input.Search
                  placeholder="Search Coach Name..."
                  style={{ flex: 1 }}
                  onSearch={handleCoachNameSearch}
                  // onChange={(e) => handleCoachNameSearch(e.target.value)}
                  allowClear
                />
              </div>
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%" }}
              >
                <DatePicker
                  className="searchInputDate"
                  style={{ flex: 1 }}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "Profile",
                    dataIndex: "profile",
                    key: "profile",
                    render: () => (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Image
                          width={100}
                          preview={false}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image"
                        />
                      </div>
                    ),
                  },
                  {
                    title: "Coach Name",
                    dataIndex: "coachName",
                    key: "coachName",
                    render: (text, record) => (
                      <span>{record.reviewGivenCoachName}</span>
                    ),
                  },

                  {
                    title: "Coach Email",
                    dataIndex: "coachEmail",
                    key: "coachEmail",
                    render: (text, record) => (
                      <span>{record.reviewGivenCoachEmail}</span>
                    ),
                  },

                  {
                    title: "Rating",
                    dataIndex: "rating",
                    key: "rating",
                    render: (text, record) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rate disabled defaultValue={record.overallReview} />
                        <span
                          style={{ marginLeft: "25px" }}
                        >{`${record.overallReview} / 5.0`}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Comment",
                    dataIndex: "comment",
                    key: "comment",
                    render: (text, record) => (
                      <span>{record.comment || "No Comment"}</span>
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the frontend
                dataSource={currentPlayerReviews} // Use filteredData instead of sampleData
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </PlayerSideBar>
  );
};

// Exporting the Navbar component
export default PlayerReviews;

// // Assume these are your two data sources
// const dataSource1 = [
//   {
//     key: '1',
//     eventName: 'Event 1',
//     teamName: 'Team A',
//     eventDate: '2022-01-01',
//   },
//   // ...
// ];

// const dataSource2 = [
//   {
//     key: '4',
//     eventName: 'Event 4',
//     teamName: 'Team D',
//     eventDate: '2022-04-01',
//   },
//   // ...
// ];

// // You can combine them into one array using the spread operator
// const combinedData = [...dataSource1, ...dataSource2];

// // Then you can pass combinedData to the dataSource prop of the Table component
// <Table dataSource={combinedData} /* other props */ />;mehema
