import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'



const SelectPlayers = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const matchId = params.get('matchId')
    const coachId = params.get('coachId')

    const [teamData, setTeamData] = useState({
        matchId: matchId, coachId: coachId, teamId: '', teamName: ''
    })


    const [players, setPlayers] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8080/coach/players?matchId=${matchId}&coachId=${coachId}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [matchId, coachId])




    const handleAdd = async (playerId) => {
        try {
            // Update teamData directly with the new playerId
            const updatedTeamData = { ...teamData, playerId: playerId };

            const res = await axios.post('http://localhost:8080/coach/create-team', updatedTeamData);

            if (res.data.success) {
                console.log('Team data saved successfully: ', res.data.team);
            } else {
                console.error('failed to save team data: ', res.data.error);
            }

        } catch (err) {
            console.error('Error while saving team data: ', err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeamData({
            ...teamData, [name]: value
        });
    }

    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>CreateTeam <br />
                <form>
                    Team Name : <input type="text" name='teamName' value={teamData.teamName} onChange={handleChange} />
                    Team Id : <input type="text" name='teamId' value={teamData.teamId} onChange={handleChange} />
                </form>
            </div>

            <div style={{ margin: 10, padding: 10, }}>
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>PID</th><th>Player Name</th><th>Location</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            player.Status === 'available' && (<tr key={index}>
                                <td style={{ textAlign: 'center' }} >{player.PlayerId}</td>
                                <td style={{ textAlign: 'center' }}>{player.FirstName}</td>
                                <td style={{ textAlign: 'center' }}>{player.District}</td>
                                {/* Render other properties of the match object */}
                                <td style={{ textAlign: 'center' }}><button onClick={() => handleAdd(player.PlayerId)}>Add</button></td>
                            </tr>)
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SelectPlayers