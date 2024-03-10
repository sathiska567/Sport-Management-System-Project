

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateTeam = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const match_id = params.get('match_id');
    const coach_id = params.get('coach_id');
    const team_id = params.get('team_id');
    const teamName = params.get('teamName')
    const teamNo = params.get('teamNo')
    const players = params.get('players')

    const [teamData, setTeamData] = useState({
        match_id: match_id,
        coach_id: coach_id,
        teamNo: teamNo,
        teamName: teamName,
        players: players ? players.split(',') : []
    });

    const [allplayers, setAllplayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/players?match_id=${match_id}&coach_id=${coach_id}`)
            .then(res => {
                console.log(res.data);
                setAllplayers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [match_id, coach_id]);

    const handleAdd = async (player_id) => {
        // Check if the player ID is already selected
        const index = teamData.players.indexOf(player_id);
        if (index === -1) {
            // Player not selected, add to selected players
            setTeamData({
                ...teamData,
                players: [...teamData.players, player_id]
            });
        } else {
            // Player already selected, remove from selected players
            const updatedplayers = [...teamData.players];
            updatedplayers.splice(index, 1);
            setTeamData({
                ...teamData,
                players: updatedplayers
            });
        }
    };

    const handleSubmit = async () => {
        try {
            console.log('edited team data to be sent : ', teamData)
            const res = await axios.post(`http://localhost:8080/api/v1/coach/update-team?team_id=${team_id}`, {teamData: teamData});
            if (res.data.success) {
                console.log('Team data updated successfully: ', res.data.team);
            } else {
                console.error('Failed to update team data: ', res.data.error);
            }
        } catch (err) {
            console.error('Error while updating team data: ', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeamData({
            ...teamData,
            [name]: value
        });
    };

    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>Update Team <br />
                <form>
                    Team Name : <input type="text" name='teamName' value={teamData.teamName} onChange={handleChange} />
                    Team No : <input type="text" name='teamNo' value={teamData.teamNo} onChange={handleChange} />
                </form>
            </div>

            <div style={{ margin: 10, padding: 10 }}>
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>Player No</th><th>Player Name</th><th>Location</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allplayers.map((player, index) => (
                            (player.Status === 'available' || player.matches.includes(match_id))&&(<tr key={index}>
                                <td style={{ textAlign: 'center' }} >{player.PlayerNo}</td>
                                <td style={{ textAlign: 'center' }}>{player.FirstName}</td>
                                <td style={{ textAlign: 'center' }}>{player.District}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleAdd(player._id)}>
                                        {teamData.players.includes(player._id) ? 'Remove' : 'Add'}
                                    </button>
                                </td>
                            </tr>)
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display submit button only if there are selected players */}
            {(
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default UpdateTeam;





{/*
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const UpdateTeam = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const team_id = params.get('team_id');


    const [teamData, setTeamData] = useState({
        matchId: matchId,
        coachId: coachId,
        teamNo: '',
        teamName: '',
        players: [] // State to hold selected player IDs
    });

    const [players, setplayers] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:8080/coach/edit-team?team_id=${team_id}`)
        .then(res=>{
            console.log(res.data)
            setplayers(res.data.players)
        })
        .catch(er => {
            console.log(er)
        })
    }, [])


    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center', fontWeight:'bolder' }}>UpdateTeam</div>
            <div style={{ margin: 10, padding: 10 }}>
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>Player No</th>
                            <th>Player Name</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player, index)=>(

                            player.teams.includes(team_id)&&(<tr key={index}>
                            <td style={{ textAlign: 'center' }}>{player.PlayerNo}</td>
                            <td style={{ textAlign: 'center' }}>{player.FirstName} {player.LastName}</td>
                            <td style={{ textAlign: 'center' }}>{player.District}</td>
                            <td style={{ textAlign: 'center' }}><button onClick={()=>handleRemove()}>Remove</button></td>
                        </tr>)
                        ))}
                    </tbody>
                </table>
            </div>




            <div style={{ margin: 10, padding: 10 }}>
                <div style={{textAlign:'center'}}><button onClick={()=>handleAddMore()}>Add More players</button></div>
                
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>Player No</th>
                            <th>Player Name</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player, index)=>(
                            <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{player.PlayerNo}</td>
                            <td style={{ textAlign: 'center' }}>{player.FirstName} {player.LastName}</td>
                            <td style={{ textAlign: 'center' }}>{player.District}</td>
                            <td style={{ textAlign: 'center' }}><button>Add</button></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpdateTeam


*/}