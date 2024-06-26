
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../CoachSidebar/CoachSidebar';
import { Button, Form, Input, message, Table } from 'antd';

const UpdateTeam = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const team = location.state.team;

    const [teamData, setTeamData] = useState(team);
    //console.log( 'team.matchId : at line 14',team)
    const [allplayers, setAllplayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/players?match_id=${team.match_id}&coach_id=${team.coach_id}`)
            .then(res => {
                console.log(res.data);
                // setAllplayers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [team.match_id, team.coach_id]);

    const getOnlyAvailablePlayer = async()=>{
        try {
          const availablePlayer = await axios.post("http://localhost:8080/api/v1/player-availability/getEventPlayer" , {eventId:team.match_id}) 
          console.log(availablePlayer);
          setAllplayers(availablePlayer.data.data)
        } catch (error) {
           message.error("Error Fetching Data")
        }
      }

    useEffect(()=>{
        getOnlyAvailablePlayer()
    },[])

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
            const res = await axios.post(`http://localhost:8080/api/v1/coach/update-team`, { teamData: teamData });
            if (res.data.success) {
                console.log('Team data updated successfully: ', res.data.team);
                navigate(`/edit-team?coach_id=${team.coach_id}`);
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

    const handleCancel = (event) => {
        navigate(`/edit-team?coach_id=${team.coach_id}`);
    }


    //................


    const CustomButton = ({ player, teamData, handleAdd }) => {
        // Determine the background color based on the text
        const backgroundColor = teamData.players.includes(player._id)
            ? "#ff4d4f" // Red if 'Remove'
            : "#52c41a"; // Green if 'Add'

        return (
            <Button
                style={{
                    backgroundColor: backgroundColor,
                    color: "#fff",
                    fontSize: 'large',
                    marginRight: "10px",
                    borderRadius: "5px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "100px",
                    padding: '2px'
                }}
                onClick={() => handleAdd(player._id)}
            >
                {teamData.players.includes(player._id) ? 'Remove' : 'Add'}
            </Button>
        );
    };


    //........

    const columns = [
        {
            title: 'Player No',
            dataIndex: 'uid',
            align: 'center',
            render: (text) => <span className='text'>{text}</span>
        },
        {
            title: 'Player Name',
            dataIndex: 'username',
            align: 'center',
            render: (text) => <span className='text'>{text}</span>
        },
        {
            title: 'Location',
            dataIndex: 'District',
            align: 'center',
            render: (text) => <span className='text'>{text}</span>
        },
        {
            title: 'Action',
            align: 'center',
            render: (_, player) => (
                <CustomButton player={player} teamData={teamData} handleAdd={handleAdd} />
            )
        }
    ]

    return (
        <CoachSidebar>
            <div style={{ height: 'fit-content', overflowY: 'auto', marginBottom: 10 }}>
                <Form className='text' style={{ margin: 150, marginBottom: 80, marginTop: "0px" }}>
                    <Form.Item label='Team Name' >
                        <Input placeholder="Team Name" name='teamName' value={teamData.teamName} onChange={handleChange} className='inputTag' />
                    </Form.Item>

                    <Form.Item label='Team No' >
                        <Input placeholder="Team No" name='teamNo' value={teamData.teamNo} onChange={handleChange} className='inputTag' />
                    </Form.Item>

                </Form>

                <Table columns={columns} dataSource={allplayers} style={{ margin: 50, marginBottom: 0, }} />


                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {/* Display submit button only if there are team name and No */}
                    {teamData.teamNo && teamData.teamName && (

                        <Button style={{
                            alignSelf: 'center',
                            backgroundColor: "#52c41b",
                            color: "#fff",
                            fontSize: 'large',
                            marginRight: "10px",
                            borderRadius: "5px",
                            marginTop: "0px",
                            marginBottom: "auto",
                            width: "100px",
                            padding: '2px'
                        }} onClick={handleSubmit}>Submit</Button>

                    )}

                    <Button style={{
                        alignSelf: 'center',
                        backgroundColor: "orange",
                        color: "#fff",
                        fontSize: 'large',
                        marginRight: "10px",
                        borderRadius: "5px",
                        marginTop: "0px",
                        marginBottom: "auto",
                        width: "100px",
                        padding: '2px'
                    }} onClick={handleCancel}>Cancel</Button>

                </div>
            </div>
        </CoachSidebar>
    );
};

export default UpdateTeam;



// dont delete the following please

/* import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../CoachSidebar/CoachSidebar';

const UpdateTeam = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const team = location.state.team;
   
    const [teamData, setTeamData] = useState(team);
    //console.log( 'team.matchId : at line 14',team)
    const [allplayers, setAllplayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/players?match_id=${team.match_id}&coach_id=${team.coach_id}`)
            .then(res => {
                console.log(res.data);
                setAllplayers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [team.match_id, team.coach_id]);

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
            const res = await axios.post(`http://localhost:8080/api/v1/coach/update-team`, { teamData: teamData });
            if (res.data.success) {
                console.log('Team data updated successfully: ', res.data.team);
                navigate(`/edit-team?coach_id=${team.coach_id}`);
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
        <CoachSidebar>
            <div style={{ height: '100%', overflow: 'auto' }}>
                <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>Update Team <br />
                    <form>
                        Team Name : <input type="text" name='teamName' value={teamData.teamName} onChange={handleChange} />
                        Team No : <input type="text" name='teamNo' value={teamData.teamNo} onChange={handleChange} />
                    </form>
                </div>

                <div style={{ margin: 10, padding: 10 }}>
                    <table style={{ border: 'solid 1px grey', width: '100%' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'darkblue', color: 'white', textAlign:'center' }}>
                                <th>Player No</th><th>Player Name</th><th>Location</th><th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allplayers.map((player, index) => (
                                !(player.Status === 'available') && (<tr  style={{fontWeight:'bold'}} key={index}>
                                    <td style={{ textAlign: 'center' }} >{player.playerId}</td>
                                    <td style={{ textAlign: 'center' }}>{player.playerName}</td>
                                    <td style={{ textAlign: 'center' }}>{player.District}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className='btn btn-success' onClick={() => handleAdd(player._id)}>
                                            {teamData.players.includes(player._id) ? 'Remove' : 'Add'}
                                        </button>
                                    </td>
                                </tr>)
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Display submit button only if there are selected players *
                {(
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                    </div>
                )}
            </div>
        </CoachSidebar>
    );
};

export default UpdateTeam;

*/





{/*  import axios from 'axios';
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