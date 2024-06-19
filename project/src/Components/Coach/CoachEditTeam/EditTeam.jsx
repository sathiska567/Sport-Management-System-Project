import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Button, Table } from "antd";
import "./CoachEditTeam.css";

const EditTeam = () => {
  const [coach_id, setCoach_id] = useState();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const coachId = searchParams.get("coach_id");
    setCoach_id(coachId);

    // Do something with the coachId, such as fetching data for that coach
    console.log("Coach ID:", coachId);
    console.log("Coach_ID:", coach_id);
  }, [location.search]);

  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (coach_id) {
      axios
        .get(`http://localhost:8080/api/v1/coach/teams?coach_id=${coach_id}`)
        .then((res) => {
          console.log(res.data);
          setTeams(res.data);
          setDataSource(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [coach_id]);

  const handleEdit = (team) => {
    navigate(`/update-team`, { state: { team } });
  };

  const handleDelete = async (team_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/coach/delete-team?team_id=${team_id}`
      );
      if (res.data.success) {
        console.log("Team removed : ", team_id);
        setTeams(dataSource.filter((team) => team._id !== team_id));
        window.location.reload();
      }
    } catch (err) {
      console.log("team delete error :\n", err);
    }
  };

  //.......................

  const [columns, setColumns] = useState([
    {
      title: "Team No",
      dataIndex: "teamNo",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      align: "center",
      render: (text) => <span className="text">{text}</span>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            className="Button"
            // href="/coach-review-form"
            style={{
              backgroundColor: "#52c41a",
              color: "#fff",
              fontSize: "large",
              marginRight: "10px",
              borderRadius: "5px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "100px",
              padding: "2px",
            }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          | &nbsp;
          <Button
            type="primary"
            className="Button"
            // href="/coach-review-form"
            style={{
              backgroundColor: "red",
              color: "#fff",
              fontSize: "large",
              marginRight: "10px",
              borderRadius: "5px",
              marginTop: "auto",
              marginBottom: "auto",
              width: "100px",
              padding: "2px",
            }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  const [dataSource, setDataSource] = useState([]);

  return (
    <CoachSidebar>
      <Table
        columns={columns}
        dataSource={dataSource}
        className="table"
        pagination={{ pageSize: 5 }}
      />
    </CoachSidebar>
  );
};

export default EditTeam;

//dont delete the following please
/*
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../CoachSidebar/CoachSidebar';

const EditTeam = () => {

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

    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        if(coach_id){axios.get(`http://localhost:8080/api/v1/coach/teams?coach_id=${coach_id}`)
            .then(res => {
                console.log(res.data)
                setTeams(res.data)
            })
            .catch(err => {
                console.log(err)
            })}
    }, [coach_id])




    const handleEdit = (team) => {
        navigate(`/update-team`, { state: { team } });
    }



    const handleDelete = async (team_id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/coach/delete-team?team_id=${team_id}`)
            if (res.data.success) {
                console.log('Team removed : ', team_id);
                setTeams(teams.filter(team => team._id !== team_id));
                //window.location.reload();
            }
        } catch (err) {
            console.log('team delete error :\n', err)
        }
    }


    return (
        <CoachSidebar>
            <div style={{ height: '100%', overflow: 'auto' }}>
                <div style={{ margin: 20, padding: 20, textAlign: 'center', fontWeight: 'bolder' }}>EditTeam</div>
                <div style={{ margin: 10, padding: 10 }}>
                    <table style={{ border: 'solid 1px grey', width: '100%' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'darkblue', color: 'white', textAlign:'center' }}>
                                <th>Team No</th>
                                <th>Team Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {teams.map((team, index) => (
                                <tr style={{fontWeight:'bold'}} key={index}>
                                    <td style={{ textAlign: 'center' }} >{team.teamNo}</td>
                                    <td style={{ textAlign: 'center' }} >{team.teamName}</td>
                                    <td style={{ textAlign: 'center' }} ><button className='btn btn-success' onClick={() => handleEdit(team)}>Edit</button> | <button className='btn btn-danger' onClick={() => handleDelete(team._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </CoachSidebar>
    )
}

export default EditTeam

*/
