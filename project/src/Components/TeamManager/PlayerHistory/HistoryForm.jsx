import React, { useState } from "react";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import "./HistoryForm.css";
import { Form, Input, Select, message, Button } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const PointTableForm = () => {
  const [nameOfTheMatch, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerCategory, setPlayerCategory] = useState("");
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setPlayerCategory(value);
  };

  const handleCreate = async () => {
    console.log(
      nameOfTheMatch,
      location,
      playerName,
      playerCategory,
      totalRuns,
      totalWickets
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/PointTableForm/createPointTableForm",
        {
          nameOfTheMatch,
          location,
          playerName,
          playerCategory,
          totalRuns,
          totalWickets,
        }
      );
      console.log(response);
      message.success("Event details submitted successfully");
    } catch (error) {
      message.error("Error entering event details");
    }
  };

  return (
    <div>
      <TeamManagerSideBar>
        <Form
          style={{
            margin: "auto",
            width: "75%",
          }}
          layout="vertical"
        >
          <div className="PointTableForm">
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="PointTableFormHeader"
            >
              <h3
                style={{
                  color: "white",
                  letterSpacing: "1px",
                  fontWeight: "500",
                }}
              >
                History Form
              </h3>
              <a href="#">
                <CloseSquareOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "10%",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "50px",
              }}
              className="PointTableFormApplication"
            >
              <div className="InputData">
                <div className="DataItem">
                  <label htmlFor="eventName">Name of the Event:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="eventName"
                      required
                      name="eventName"
                      onChange={handleInputChange(setEventName)}
                    />
                  </div>
                </div>

                <div className="DataItem">
                  <label htmlFor="location">Location:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="location"
                      required
                      name="location"
                      onChange={handleInputChange(setLocation)}
                    />
                  </div>
                </div>

                <div className="DataItem">
                  <label htmlFor="playerName">Player Name:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="playerName"
                      required
                      name="playerName"
                      onChange={handleInputChange(setPlayerName)}
                    />
                  </div>
                </div>

                <div className="DataItem">
                  <label htmlFor="playerCategory">Player Category:</label>
                  <div style={{ flex: 2.6 }}>
                    <Select
                      id="playerCategory"
                      required
                      name="playerCategory"
                      onChange={handleCategoryChange}
                      style={{ width: "100%" }}
                    >
                      <Option value="batsman">Batsman</Option>
                      <Option value="bowler">Bowler</Option>
                      <Option value="keeper">Keeper</Option>
                    </Select>
                  </div>
                </div>

                {playerCategory === "batsman" && (
                  <div className="DataItem">
                    <label htmlFor="totalRuns">Total Runs:</label>
                    <div style={{ flex: 2.6 }}>
                      <Input
                        type="number"
                        id="totalRuns"
                        name="totalRuns"
                        required
                        onChange={handleInputChange(setTotalRuns)}
                      />
                    </div>
                  </div>
                )}

                {playerCategory === "bowler" && (
                  <div className="DataItem">
                    <label htmlFor="totalWickets">Total Wickets:</label>
                    <div style={{ flex: 2.6 }}>
                      <Input
                        type="number"
                        id="totalWickets"
                        name="totalWickets"
                        required
                        onChange={handleInputChange(setTotalWickets)}
                      />
                    </div>
                  </div>
                )}

           {playerCategory === "keeper" && (
                  <div className="DataItem">
                    <label htmlFor="totalRuns">Total Runs:</label>
                    <div style={{ flex: 2.6 }}>
                      <Input
                        type="number"
                        id="totalRuns"
                        name="totalRuns"
                        required
                        onChange={handleInputChange(setTotalRuns)}
                      />
                    </div>
                  </div>
                )}

                <div className="buttonSet">
                  <div>
                    <Button
                      className="approve PointTableFormBtn"
                      style={{ backgroundColor: "#52c41a", width: "115px" }}
                      onClick={handleCreate}
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </TeamManagerSideBar>
    </div>
  );
};

export default PointTableForm;
