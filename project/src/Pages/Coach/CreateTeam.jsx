import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateTeam = () => {
    const navigate = useNavigate()
    const [matches, setMatches] = useState([])

    const coachId = 'C002';

    useEffect(()=>{
        axios.get(`http://localhost:8080/coach/matches?coachId=${coachId}`)
        .then(res => {
            console.log(res.data);
            setMatches(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    const handleCreate = (matchId) => {
        navigate(`/select-players?matchId=${matchId}&coachId=${coachId}`)
    }

    return (
        <div>
            <div style={{ margin: 20, padding: 20, textAlign: 'center', fontWeight:'bolder' }}>Create Team</div>
            <div style={{ margin: 10, padding: 10 }}>
                <table style={{ border: 'solid 1px grey', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'darkblue', color: 'white' }}>
                            <th>EID</th><th>Name</th><th>Location</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }} >{match.matchId}</td>
                                <td style={{ textAlign: 'center' }}>{match.name}</td>
                                <td style={{ textAlign: 'center' }}>{match.location}</td>
                                {/* Render other properties of the match object */}
                                <td style={{ textAlign: 'center' }}><button onClick={()=>handleCreate(match.matchId)}>Create</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateTeam
