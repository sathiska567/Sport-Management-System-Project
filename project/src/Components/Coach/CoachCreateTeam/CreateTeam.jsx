import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CoachSidebar from '../CoachSidebar/CoachSidebar'


const CreateTeam = () => {
    const navigate = useNavigate()
    const [matches, setMatches] = useState([])

    const coach_id = '65c8c707a84054ae527180db';

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/matches?coach_id=${coach_id}`)
            .then(res => {
                console.log(res.data);
                setMatches(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handleCreate = (match_id) => {
        navigate(`/select-players?matchId=${match_id}&coachId=${coach_id}`)
    }

    return (
        <CoachSidebar>
            <div style={{ margin: 10, padding: 10, height: '100%', overflow: 'scroll' }}>
                <div style={{ margin: 20, padding: 20, textAlign: 'center', fontWeight: 'bolder'}}>Create Team</div>
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
                                    <td style={{ textAlign: 'center' }}>{match.name}</td>
                                    <td style={{ textAlign: 'center' }}>{match.location}</td>
                                    {/* Render other properties of the match object */}
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
