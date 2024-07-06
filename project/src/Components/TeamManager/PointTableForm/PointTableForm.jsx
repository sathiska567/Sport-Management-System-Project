import React, { useState, useEffect } from "react";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import "./PointTableForm.css";
import { Form, Input, message, Button } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PointTableForm = () => {
  const [nameOfTheMatch, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState("");
  const [wonMatches, setWonMatches] = useState(0);
  const [lostMatches, setLostMatches] = useState(0);
  const [totalRunsEachTeamMatches, setTotalRunsEachTeamMatches] = useState(0);
  const [totalOversEachTeam, setTotalOversEachTeam] = useState(0);
  const [totalMarksForEachTeam, setTotalMarksForEachTeam] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const { teamId, teamName, eventName } = location.state || {};
    if (teamName) setTeamName(teamName);
    if (eventName) setEventName(eventName);
  }, [location.state]);

  const handleInputChange = (e) => setEventName(e.target.value);
  const handleTeamChange = (e) => setTeamName(e.target.value);
  const handleWonChange = (e) => setWonMatches(e.target.value);
  const handleLostChange = (e) => setLostMatches(e.target.value);
  const handleRunsChange = (e) => setTotalRunsEachTeamMatches(e.target.value);
  const handleOversChange = (e) => setTotalOversEachTeam(e.target.value);
  const handleMarksChange = (e) => setTotalMarksForEachTeam(e.target.value);

  const handleCreate = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/PointTableForm/createPointTableForm",
        {
          nameOfTheMatch,
          nameOfTheTeam,
          wonMatches,
          lostMatches,
          totalRunsEachTeamMatches,
          totalOversEachTeam,
          totalMarksForEachTeam,
        }
      );
      message.success("Submitted successfully");
      // Reset form fields
      setEventName("");
      setTeamName("");
      setWonMatches(0);
      setLostMatches(0);
      setTotalRunsEachTeamMatches(0);
      setTotalOversEachTeam(0);
      setTotalMarksForEachTeam(0);
    } catch (error) {
      message.error("Error submitting event details");
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
            <div className="PointTableFormHeader" style={{ backgroundColor: "#15295E", padding: "10px" }}>
              <h3 style={{ color: "white", letterSpacing: "1px", fontWeight: "500", margin: 0 }}>
                Event Details
              </h3>
              <a href="#">
                <CloseSquareOutlined style={{ color: "white", fontSize: "20px", float: "right" }} />
              </a>
            </div>
            <div className="PointTableFormApplication" style={{ backgroundColor: "white", padding: "50px" }}>
              <div className="InputData" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="eventName" style={{ width: '200px', marginRight: '10px' }}>Name of the Event:</label>
                  <Input
                    type="text"
                    id="eventName"
                    required
                    name="eventName"
                    value={nameOfTheMatch}
                    onChange={handleInputChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="teamName" style={{ width: '200px', marginRight: '10px' }}>Name of the Team:</label>
                  <Input
                    type="text"
                    id="teamName"
                    required
                    name="teamName"
                    value={nameOfTheTeam}
                    onChange={handleTeamChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="wonMatches" style={{ width: '200px', marginRight: '10px' }}>Won Matches:</label>
                  <Input
                    type="number"
                    id="wonMatches"
                    required
                    name="wonMatches"
                    value={wonMatches}
                    onChange={handleWonChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="lostMatches" style={{ width: '200px', marginRight: '10px' }}>Lost Matches:</label>
                  <Input
                    type="number"
                    id="lostMatches"
                    required
                    name="lostMatches"
                    value={lostMatches}
                    onChange={handleLostChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="totalRuns" style={{ width: '200px', marginRight: '10px' }}>Total Runs For Each Team:</label>
                  <Input
                    type="number"
                    id="totalRuns"
                    required
                    name="totalRunsEachTeamMatches"
                    value={totalRunsEachTeamMatches}
                    onChange={handleRunsChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="totalOvers" style={{ width: '200px', marginRight: '10px' }}>Total Overs For Each Team:</label>
                  <Input
                    type="number"
                    id="totalOvers"
                    required
                    name="totalOversEachTeam"
                    value={totalOversEachTeam}
                    onChange={handleOversChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="DataItem" style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="totalMarks" style={{ width: '200px', marginRight: '10px' }}>Total Marks For Each Team:</label>
                  <Input
                    type="number"
                    id="totalMarks"
                    required
                    name="totalMarksForEachTeam"
                    value={totalMarksForEachTeam}
                    onChange={handleMarksChange}
                    style={{ flex: 1 }}
                  />
                </div>
                <div className="buttonSet" style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="approve PointTableFormBtn"
                    style={{ backgroundColor: "#52c41a", width: "115px" }}
                  >
                    <EditOutlined className="UserApplicationIcon" />
                    Submit
                  </Button>
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
