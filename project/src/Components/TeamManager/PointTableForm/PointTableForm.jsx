import React, { useState } from "react";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";
import "./PointTableForm.css";
import { Form, Input, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";


const PointTableForm = () => {
  const [nameOfTheMatch, setEventName] = useState("");
  const [nameOfTheTeam, setTeamName] = useState([]);
  const [wonMatches, setWonMatches] = useState(0);
  const [lostMatches, setLostMatches] = useState(0);
  const [totalRunsEachTeamMatches,setTotalRunsEachTeamMatches] = useState(0);
  const [totalOversEachTeam, setTotalOversEachTeam] = useState(0);
  const [totalMarksForEachTeam, setTotalMarksForEachTeam] = useState(0);
  
  
  

  // Event Name
  const handleInputChange = (e) => {
    setEventName(e.target.value);
  };


   // Team name
   const handleTeamChange = (e) => {
    setTeamName(e.target.value);
  };


   // won matches
   const handleWonChange = (e) => {
    setWonMatches(e.target.value);
  };


  // Lost matches
  const handleLostChange = (e) => {
    setLostMatches(e.target.value);
  };


  // All runs
  const handleRunsChange = (e) => {
    setTotalRunsEachTeamMatches(e.target.value);
  };


  // Event Overs
  const handleOversChange = (e) => {
    setTotalOversEachTeam(e.target.value);
  };


  // All marks
  const handleMarksChange = (e) => {
    setTotalMarksForEachTeam(e.target.value);
  };

  

   

 

  const handleCreate = async () => {
    console.log(
      nameOfTheMatch,
      nameOfTheTeam,
      wonMatches,
      lostMatches,
      totalRunsEachTeamMatches,
      totalOversEachTeam,
      totalMarksForEachTeam,
      
    );


    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/PointTableForm/createPointTableForm",
        {  
          
          nameOfTheMatch,
           nameOfTheTeam, 
            wonMatches, 
            lostMatches, 
            totalRunsEachTeamMatches,
             totalOversEachTeam, 
              totalMarksForEachTeam 
            }
      );
      console.log(response);

     
    } catch (error) {
      message.error("Error event entred details");
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
          
          layout="verticle"
        >
          <div style={{}} className="PointTableForm">
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
                Create Event
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
                <div className="DataIem">
                  <label htmlFor="eventName">Name of the Event:</label>
                  <div style={{ flex: 2.6 }}>
                    <Input
                      type="text"
                      id="eventName"
                      required
                      name="eventName"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>



                    
                <div className="DataIem">

                  <label htmlFor="teamName">Name of the Team:</label>
                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="text"
                      id="teamName"
                      required
                      name="teamName"
                      onChange={ handleTeamChange}
                    />

                  </div>
                </div>




                <div className="DataIem">

                  <label htmlFor="wonMatches">Won Matches:</label>
                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="number"
                      id="wonMatches"
                      name="wonMatches"
                      required
                      onChange={handleWonChange}
                    />

                  </div>
                </div>



                <div className="DataIem">

                  <label htmlFor="LostMatches">Lost Matches:</label>

                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="number"
                      id="LostMatches"
                      name="LostMatches"
                      required
                      onChange={handleLostChange}
                    />
                  </div>
                </div>



                <div className="DataIem">

                  <label htmlFor="TotalRuns">Total Runs For Each Team:</label>

                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="number"
                      id="TotalRunes"
                      name="TotalRuns"
                      required
                      onChange={handleRunsChange}
                    />

                  </div>
                </div>



                <div className="DataIem">

                  <label htmlFor="TotalOvers">Total Overs For Each Team:</label>

                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="number"
                      id="TotalOvers"
                      name="TotalOvers"
                      required
                      onChange={handleOversChange}
                    />

                  </div>
                </div>



                <div className="DataIem">

                  <label htmlFor="TotalMarks">Total Marks For Each Team:</label>

                  <div style={{ flex: 2.6 }}>

                    <Input
                      type="number"
                      id="TotalMarks"
                      name="TotalMarks"
                      required
                      onChange={ handleMarksChange}
                    />

                  </div>
                </div>

                

                

                
                

               

                <div class="buttonSet">
                  <div>
                    <button
                      class="approve PointTableFormBTn"
                      style={{ backgroundColor: "#52c41a", width: "115px" }}
                      onClick={handleCreate}
                    >

                      <EditOutlined className="UserApplicationIcon" />
                       Submit
                    </button>

                    
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