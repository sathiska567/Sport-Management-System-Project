import React, { useState } from "react";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import "./PerformanceForm.css";
import { Form, Input, Select, message, Button } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";

const { Option } = Select;



const Performance = () => {


  const location = useLocation();

  const [nameOfTheTeam, setNameOfTheTeam] = useState(location.state?.teamName || "");

  const [playerName, setPlayerName] = useState(location.state?.playerName || "");

  const [playerCategory, setPlayerCategory] = useState("");

  const [totalRuns, setTotalRuns] = useState(0);

  const [numberOfWickets, setNumberOfWickets] = useState(0);

  const [numberOfDissMiss, setNumberOfDissMiss] = useState(0);

  const [totalRunsConceded, setTotalRunsConceded] = useState(0);

  const [loading, setLoading] = useState(false);



  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };



  const handleCategoryChange = (value) => {
    setPlayerCategory(value);
  };



  const handleCreate = async (values) => {
    setLoading(true);



    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/PlayerDetails/playerDetailsForm",
        {
          nameOfTheTeam: values.nameOfTheTeam,
          playerName: values.playerName,
          playerCategory: values.playerCategory,
          totalRuns: values.totalRuns || 0,
          numberOfWickets: values.numberOfWickets || 0,
          numberOfDissMiss: values.numberOfDissMiss || 0,
          totalRunsConceded: values.totalRunsConceded || 0,
        }
      );


      console.log(response);
      message.success("Player details submitted successfully");
    } 
    catch (error) {

      console.error(error);
      message.error("Error entering player details");
    } 
    finally {
      setLoading(false);
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
          onFinish={handleCreate}
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
                Player Performance
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
                padding: "60px",
              }}
              className="PointTableFormApplication"
            >
              <div className="InputData">


                <Form.Item
                  label="Player Name"
                  name="playerName"
                  rules={[{ required: true, message: "Please input the player's name!" }]}
                  initialValue={playerName}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Input
                    type="text"
                    id="playerName"
                    required
                    onChange={handleInputChange(setPlayerName)}
                    style={{ width: "100%", maxWidth: "400px" }}
                  />
                </Form.Item>


                <Form.Item
                  label="Team Name"
                  name="nameOfTheTeam"
                  rules={[{ required: true, message: "Please input the name of the team!" }]}
                  initialValue={nameOfTheTeam}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Input
                    type="text"
                    id="nameOfTheTeam"
                    required
                    onChange={handleInputChange(setNameOfTheTeam)}
                    style={{ width: "100%", maxWidth: "400px" }}
                  />
                </Form.Item>



                <Form.Item
                  label=" Category"
                  name="playerCategory"
                  rules={[{ required: true, message: "Please select the player category!" }]}
                  style={{ display: "flex", flexDirection: "column", marginTop: "10px"  }}
                >
                  <Select
                    id="playerCategory"
                    required
                    onChange={handleCategoryChange}
                    style={{ width: "100%", maxWidth: "400px" }}
                  >
                    <Option value="batsman">Batsman</Option>
                    <Option value="bowler">Bowler</Option>
                    <Option value="keeper">Keeper</Option>
                  </Select>
                </Form.Item>


                {playerCategory === "batsman" && (
                  <>
                    <Form.Item
                      label="Total Runs"
                      name="totalRuns"
                      rules={[{ required: true, message: "Please input the total runs!" }]}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Input
                        type="number"
                        id="totalRuns"
                        onChange={handleInputChange(setTotalRuns)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>


                    <Form.Item
                      label=" Dismissed"
                      name="numberOfDissMiss"
                      rules={[{ required: true, message: "Please input the number of dismissed!" }]}
                      style={{ display: "flex", flexDirection: "column", marginTop: "15px" }}
                    >
                      <Input
                        type="number"
                        id="numberOfDissMiss"
                        onChange={handleInputChange(setNumberOfDissMiss)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>


                  </>
                )}



                {playerCategory === "bowler" && (
                  <>
                    <Form.Item
                      label="Total Wickets"
                      name="numberOfWickets"
                      rules={[{ required: true, message: "Please input the total wickets!" }]}
                      style={{ display: "flex", flexDirection: "column" }}
                    >


                      <Input
                        type="number"
                        id="numberOfWickets"
                        onChange={handleInputChange(setNumberOfWickets)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>


                    <Form.Item
                      label="Total Runs Conceded"
                      name="totalRunsConceded"
                      rules={[{ required: true, message: "Please input the total runs conceded!" }]}
                      style={{ display: "flex", flexDirection: "column",marginTop: "15px" }}
                    >
                      <Input
                        type="number"
                        id="totalRunsConceded"
                        onChange={handleInputChange(setTotalRunsConceded)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>
                  </>
                )}



                {playerCategory === "keeper" && (
                  <>
                    <Form.Item
                      label="Total Runs"
                      name="totalRuns"
                      rules={[{ required: true, message: "Please input the total runs!" }]}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Input
                        type="number"
                        id="totalRuns"
                        onChange={handleInputChange(setTotalRuns)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>


                    <Form.Item
                      label="Dismissed"
                      name="numberOfDissMiss"
                      rules={[{ required: true, message: "Please input the number of dismissed!" }]}
                      style={{ display: "flex", flexDirection: "column",marginTop: "15px" }}
                    >
                      <Input
                        type="number"
                        id="numberOfDissMiss"
                        onChange={handleInputChange(setNumberOfDissMiss)}
                        style={{ width: "100%", maxWidth: "400px" }}
                      />
                    </Form.Item>
                  </>
                )}

                <div className="buttonSet">
                  <div>
                    <Button
                      className="approve PointTableFormBtn"
                      style={{ backgroundColor: "#52c41a", width: "115px" }}
                      htmlType="submit"
                      loading={loading}
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




export default Performance;