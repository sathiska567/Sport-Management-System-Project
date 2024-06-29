import React, { useEffect, useState } from "react";
import SideBar from "../EOSideBar/EOSideBar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Flex, Table, message } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Fixture.css";

export default function Fixture() {
  const [teamData, setTeamData] = useState([]);
  const shuffledArray = [];
  const usedIndexes = [];
  const [shuffledNewArray, setShuffledNewArray] = useState([]);
  // const [newArrayLength,setNewArrayLength] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const matches = [];

  const [teamDetails, setTeamDetails] = useState([]);

  console.log(location);

  // get created fixture
  const getOneCreatedFixture = async () => {
    try {
      const id = location.state.record._id;
      console.log("id : ", id);

      const response = await axios.post(
        "http://localhost:8080/api/v1/event/get-one-fixture",
        { id }
      );
      console.log(response.data.data.nameOfTheTeam);
      setTeamDetails(response.data.data.nameOfTheTeam);
      setTeamData(response.data.data.nameOfTheTeam);
      setShuffledNewArray(response.data.data.nameOfTheTeam);
    } catch (error) {
      message.error("Error in fetching data");
    }
  };

  // Random shuffle data
  const ShuffleData = () => {
    let i = 0;
    console.log(teamDetails.length);
    // window.location.reload();

    while (i < teamDetails.length) {
      const randomIndex = Math.floor(Math.random() * teamDetails.length);
      // console.log(randomIndex);

      if (!usedIndexes.includes(randomIndex)) {
        shuffledArray.push(teamDetails[randomIndex]);
        usedIndexes.push(randomIndex);
        i++;
      }
    }

    console.log("shuffle array is : ", shuffledArray);
    setShuffledNewArray(shuffledArray);
  };

  // shuffle data store
  const shuffleDataStore = async () => {
    try {
      const id = location.state.record._id;
      console.log("shuffled data : ", shuffledNewArray);

      const response = await axios.post(
        "http://localhost:8080/api/v1/shuffle/newTeam",
        { shuffledNewArray, id }
      );
      console.log(response);

      if (response.data.success) {
        message.success(response.data.message);
        navigate("/eo-view-fixture");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Shuffle fixture save have an error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/delete/delte-team",
        { id: id }
      );
      message.success(response.data.message);
      window.location.reload();
    } catch (error) {
      message.error("Delete have an error");
    }
  };

  useEffect(() => {
    // getTeamData();
    ShuffleData();
    getOneCreatedFixture();
  }, []);

  return (
    <>
      <SideBar>
        {/* <div>
             {shuffledNewArray.map((data)=>(
                <p>{data.TeamName}</p>
             ))}
         </div> */}

        <div className="fixtureContainer">
          <Table
            className="Table"
            columns={[
              {
                title: "Team Number",
                width: "20%",
                dataIndex: "teamNumber",
                render: (text, record, index) => (
                  <span
                    key={index}
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {"Team Number " + (index + 1)}
                  </span>
                ),
              },
              {
                title: "Teams Name",
                dataIndex: "teamName",
                render: (text, record, index) => (
                  <span
                    key={index}
                    style={{
                      color: "green",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {record}
                  </span>
                ),
              },

              {
                title: "Event Location",
                dataIndex: "location",
                render: (text, record) => (
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {location.state.record.location}
                  </span>
                ),
              },
              {
                title: "Event Date",
                dataIndex: "date",
                render: (text, record) => (
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {location.state.record.eventNewDate}
                  </span>
                ),
              },
              {
                title: "Event Time",
                dataIndex: "time",
                render: (text, record) => (
                  <span
                    style={{
                      color: "blue",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {location.state.record.formattedTime}
                  </span>
                ),
              },

              // {
              //   title: "Action",
              //   dataIndex: "action",
              //   render: (text, record) => (
              //     <div>
              //       <span>
              //         <Button
              //           type="primary"
              //           style={{
              //             backgroundColor: "#D94D34",
              //             color: "#fff",
              //             fontSize: "14px",
              //             borderRadius: "5px",
              //             marginTop: "auto",
              //             marginBottom: "auto",
              //           }}
              //           onClick={() => handleDelete(record._id)}
              //         >
              //           <DeleteOutlined />
              //           Delete
              //         </Button>
              //       </span>

              //       {/* <Button type="danger" onClick={() => handleDelete(record._id)}>delete</Button> */}
              //     </div>
              //   ),
              // },
            ]}
            pagination={{
              style: {
                marginTop: "50px",
              },
              pageSize: 5,
            }}
            // Displaying data from the backend
            dataSource={shuffledNewArray}
          ></Table>

          <div className="ShuffleButtons">
            <Button
              className="ViewTableButtons"
              type="primary"
              onClick={ShuffleData}
            >
              Suffle
            </Button>
            <Button
              className="ViewTableButtons"
              type="primary"
              onClick={shuffleDataStore}
            >
              Save Shuffle
            </Button>
          </div>

          {/* <button onClick={ShuffleData}>Suffle</button> */}
          {/* <button onClick={shuffleDataStore}>Save Shuffle</button> */}
          {/* <button onClick={handleSingleEliminate}>Single Eliminate</button> */}
        </div>
      </SideBar>
    </>
  );
}
