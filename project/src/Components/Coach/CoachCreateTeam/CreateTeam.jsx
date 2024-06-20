import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import "./CoachCreateTeam.css";
import { Button, message, Table } from "antd";

const CreateTeam = () => {
  const navigate = useNavigate();
  //const [matches, setMatches] = useState([])
  const [coach_id, setCoach_id] = useState();
  const [coachId, setCurrentCoachId] = useState("");

  const location = useLocation();

  //       //GET CURRENT USER DATA
  //   const currentUserData = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8080/api/v1/user/getCurrentUser",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(res);
  //       setCurrentCoachId(res.data.user._id)

  //     } catch (error) {
  //       message.error("Error have inside the Get currentUserData function");
  //     }
  //   };

  //   useEffect(()=>{
  //     currentUserData()
  //   },[])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const coachId = searchParams.get("coach_id");
    setCoach_id(coachId);

    // Do something with the coachId, such as fetching data for that coach
    console.log("Coach ID:", coachId);
    console.log("Coach_ID:", coach_id);
  }, [location.search]);

  useEffect(() => {
    if (coach_id) {
      axios
        .get(`http://localhost:8080/api/v1/coach/matches?coach_id=${coach_id}`)
        .then((res) => {
          console.log(res);
          //setMatches(res.data)

          setDataSource(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coach_id]);

  const handleCreate = (match_id) => {
    const searchParams = new URLSearchParams(location.search);
    const coach_id = searchParams.get("coach_id");
    navigate(`/select-players?matchId=${match_id}&coachId=${coach_id}`);
  };

  //.............

  const [columns, setColumns] = useState([
    {
      title: "EID",
      dataIndex: "eid",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "nameOfTheEvent",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
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
          onClick={() => handleCreate(record._id)}
        >
          Create
        </Button>
      ),
    }
   
  ]);

  const [dataSource, setDataSource] = useState([]);

  return (
    <CoachSidebar>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        className="table"
      />
    </CoachSidebar>
  );
};

export default CreateTeam;

//dont delete the following please

/*

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CoachSidebar from '../CoachSidebar/CoachSidebar'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const CreateTeam = () => {
    const navigate = useNavigate()
    const [matches, setMatches] = useState([])
    const [coach_id, setCoach_id] = useState();

    const location = useLocation();
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const coachId = searchParams.get('coach_id');
      setCoach_id(coachId)
      
      // Do something with the coachId, such as fetching data for that coach
      console.log('Coach ID:', coachId);
      console.log('Coach_ID:', coach_id);
    }, [location.search]);


    useEffect(() => {
       if(coach_id) {axios.get(`http://localhost:8080/api/v1/coach/matches?coach_id=${coach_id}`)
            .then(res => {
                console.log(res.data);
                setMatches(res.data)
            })
            .catch(err => {
                console.log(err);
            })}
    }, [coach_id])

    const handleCreate = (match_id) => {
        navigate(`/select-players?matchId=${match_id}&coachId=${coach_id}`)
    }

    return (
        <CoachSidebar>
            <div style={{ margin: 10, padding: 10, height: 'auto', overflow: 'scroll' }}>
                <div className='m-2' style={{ textAlign: 'center', fontWeight: 'bolder'}}>Create Team</div>
                <div style={{ margin: 10, padding: 10, }}>
                    <table style={{ border: 'solid 1px grey', width: '100%', borderCollapse:'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'darkblue', color: 'white', textAlign:'center' }}>
                                <th >EID</th><th>Name</th><th>Location</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((match, index) => (
                                <tr style={{fontWeight:'bold'}} key={index}>
                                    <td style={{ textAlign: 'center' }} >{match.matchNo}</td>
                                    <td style={{ textAlign: 'center' }}>{match.name } {/*nameOfTheEvent* </td> 
                                    <td style={{ textAlign: 'center' }}>{match.location}</td>
                                    {/* Render other properties of the match object *
                                    <td style={{ textAlign: 'center' }}><button className='btn btn-success' onClick={() => handleCreate(match._id)}>Create</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CoachSidebar>
    )
}

export default CreateTeam





*/
