// Importing necessary libraries and components
import React, { useState } from "react";
import "./PlayerReviews.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Layout, Input, Table, Image, DatePicker, Rate } from "antd";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const PlayerReviews = () => {
  const [userRole, setUserRole] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [eventNameFilter, setEventNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  // Filter sampleData based on userRole and Userlocation
const filteredData = sampleData.filter((data) => {
  return (
    (!userRole ||
      data.coachName.toLowerCase().startsWith(userRole.toLowerCase())) &&
    (!Userlocation || data.reviewDate.startsWith(Userlocation))
  );
});

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
                  onSearch={(value) => setUserRole(value)}
                  onChange={(e) => setUserRole(e.target.value)}
                />
              </div>
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%" }}
              >
                <DatePicker
                  className="searchInputDate"
                  style={{ flex: 1 }}
                  onChange={(date, dateString) => setUserLocation(dateString)}
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
                  },
                  {
                    title: "Review Date",
                    dataIndex: "reviewDate",
                    key: "reviewDate",
                  },
                  {
                    title: "Rating",
                    dataIndex: "rating",
                    key: "rating",
                    render: (rating) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rate disabled defaultValue={rating} />
                        <span
                          style={{ marginLeft: "25px" }}
                        >{`${rating} / 5.0`}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Comment",
                    dataIndex: "comment",
                    key: "comment",
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the frontend
                dataSource={filteredData} // Use filteredData instead of sampleData
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
