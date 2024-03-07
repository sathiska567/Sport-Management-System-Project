import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditTeam = () => {

    const coach_id = '65c8c707a84054ae527180db';

    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        axios.get(`http://localhost:8080/coach/teams?coach_id=${coach_id}`)
            .then(res => {
                console.log(res.data)
                setTeams(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])




    const handleEdit = (team_id, match_id, teamName, teamNo, players)=>{
        navigate(`/update-team?team_id=${team_id}&match_id=${match_id}&coach_id=${coach_id}&teamName=${teamName}&teamNo=${teamNo}&players=${players}`)
    }



    const handleDelete = async (team_id, coach_id, match_id)=>{
        try{
            const res = await axios.delete(`http://localhost:8080/coach/delete-team?team_id=${team_id}&coach_id=${coach_id}&match_id=${match_id}`)
            if(res.data.success){
                console.log('Team removed : ', team_id);
                setTeams(teams.filter(team=>team._id!==team_id));
                //window.location.reload();
            }
        }catch(err){
            console.log('team delete error :\n', err)
        }
    }


    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center', fontWeight:'bolder' }}>EditTeam</div>
            <div style={{ margin: 10, padding: 10 }}>
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>Team No</th>
                            <th>Team Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }} >{team.teamNo}</td>
                                <td style={{ textAlign: 'center' }} >{team.teamName}</td>
                                <td style={{ textAlign: 'center' }} ><button onClick={()=>handleEdit(team._id, team.match_id, team.teamName, team.teamNo, team.players)}>Edit</button> | <button onClick={()=>handleDelete(team._id, team.coach_id, team.match_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default EditTeam