import React, { useEffect, useState } from "react";
import "./EOViewFixture.css";
import EOSiderBar from "../EOSideBar/EOSideBar";
import { Layout, Button, Input, Table, message, DatePicker, Tooltip } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const dataSource = [
  {
    key: "1",
    eventLocation: "Galle",
    eventName: "Event 1",
    eventDate: "2022-01-01",
    Actions: "Action 1",
  },
  {
    key: "2",
    eventLocation: "Galle",
    eventName: "Event 2",
    eventDate: "2022-02-01",
    Actions: "Action 2",
  },
  {
    key: "3",
    eventLocation: "Galle",
    eventName: "Event 3",
    eventDate: "2022-03-01",
    Actions: "Action 3",
  },
];

const EOViewFixture = () => {
  const [eventLocation, setEventLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [createdFixture, setCreatedFixture] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDate, setSearchDate] = useState("")
  console.log(location);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limits , setLimits] = useState(3);
  

  const fetchData = async (page) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/get/pagination', { page });
      console.log("response", response)
      setCreatedFixture(response.data.data.fixture);
      setTotal(response.data.data.totalFixtures
      );
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

  //  GET ALL CREATED FIXTURE
  const getFixtureData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/get/get-fixture"
      );
      // console.log(response.data.data);
      // setCreatedFixture(response.data.data);
    } catch (error) {
      message.error("Error fetching fixture data");
    }
  };

  // hanlde fixture shuffle
  const handleShuffle = async (record) => {
    // console.log(id);
    navigate("/shuffle-fixture", { state: { record: record } });
  };

  // hanlde fixture view
  const handleView = async (record) => {
    console.log(record.createdFixtureId);
    navigate("/final-fixture", {
      state: { shuffledDataId: record.createdFixtureId },
    });
  };

  // handle fixture delete function
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const deleteResponse = await axios.post(
        "http://localhost:8080/api/v1/delete/delete-fixture",
        { id }
      );
      console.log(deleteResponse);

      if (deleteResponse.data.success) {
        message.success(deleteResponse.data.message);
        window.location.reload();
      } else {
        message.error(deleteResponse.data.message);
      }
    } catch (error) {
      message.error("Error deleting fixture data");
    }
  };

  useEffect(() => {
    getFixtureData();
  }, []);

  const handleDateChange = async (date, dateString) => {
    console.log("Date Selected: ", dateString);
    setSearchDate(dateString)
  };

  // Filter userApplicationData based on userRole and Userlocation
  const handleEventLocationSearch = async (value) => {
    console.log("Event Location Searched: ", value, searchDate);

    try {
      // const searchResponse = await axios.post("http://localhost:8080/api/v1/search/data",{value:value})
      const searchResponse = await axios.post("http://localhost:8080/api/v1/search/data", { value: value, searchDate: searchDate })

      if(searchResponse.data.success){
        setCreatedFixture(searchResponse.data.data)
      }

    } catch (error) {
      message.error("Error fetching searching data");
    }
  };



  // const handleCreateBracket = async (id) => {
  //   console.log(id);

  //   try {
  //     navigate("/eo-bracket", {
  //       state: { bracketDataId: id },
  //     });
  //   } catch (error) {
  //     message.success("Error deleting fixture data");
  //   }
  // };

  return (
    <EOSiderBar>
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
            }} // Remove overflowY: "auto"
          >
            <div className="search">
              {/* <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={handleDateChange}
              /> */}

              <Tooltip title="Search for event location">
                <Input.Search
                  className="searchInputName"
                  placeholder="Search Event Location..."
                  style={{ marginBottom: "8px" }}
                  onSearch={handleEventLocationSearch}
                  allowClear
                />
              </Tooltip>

            </div>
            <Table
              columns={[
                {
                  title: "Event Name",
                  dataIndex: "eventName",
                  width: "20%",
                  render: (text, record) => (
                    <span>{record.nameOfTheEvent}</span>
                  ),
                },
                {
                  title: "Event Location",
                  dataIndex: "eventLocation",
                  width: "20%",
                  render: (text, record) => <span>{record.location}</span>,
                },
                {
                  title: "Event Date",
                  dataIndex: "eventDate",
                  width: "20%",
                  render: (text, record) => <span>{record.eventNewDate}</span>,
                },
                {
                  title: "Event Date",
                  dataIndex: "eventDate",
                  width: "20%",
                  render: (text, record) => <span>{record.formattedTime}</span>,
                },
                {
                  title: "Actions",
                  dataIndex: "Actions",
                  width: "40%",
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
                      <Tooltip title={record.createdFixtureId === "" ? "Please shuffle fixture and then view" : "View fixture"}>
                        <Button
                          type="primary"
                          className="Button"
                          style={{
                            backgroundColor: "#52c41a",
                            color: "#fff",
                            fontSize: "14px",
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                            width: "70px",
                          }}
                          onClick={() => handleView(record)}
                          disabled={record.createdFixtureId === "" ? true : false}
                        >
                          View
                        </Button>
                      </Tooltip>
                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#13c2c2",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                        onClick={() => handleShuffle(record)}
                      >
                        Shuffle
                      </Button>
                      {/* <Button
                        type="primary"
                        style={{
                          backgroundColor: "#faad14",
                          color: "#fff",
                          fontSize: "14px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                      >
                        Edit
                      </Button> */}

                      {/* <Button
                        type="primary"
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "80px",
                        }}
                        onClick={() => handleCreateBracket(record._id)}
                      >
                        Bracket
                      </Button> */}

                      <Button
                        type="primary"
                        style={{
                          backgroundColor: "#f5222d",
                          color: "#fff",
                          fontSize: "14px",
                          borderRadius: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          width: "70px",
                        }}
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </Button>
                    </span>
                  ),
                },
              ]}
              dataSource={createdFixture}
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
            />
          </Content>
        </Layout>
      </Layout>
    </EOSiderBar>
  );
};

export default EOViewFixture;
