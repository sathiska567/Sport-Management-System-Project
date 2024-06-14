import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CoachCreateTeam.css'
import { Table, Input, Button, Form } from 'antd';
import CoachSidebar from '../CoachSidebar/CoachSidebar';
import axios from 'axios';

const SelectPlayers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const matchId = params.get('matchId');
    const coachId = params.get('coachId');
    console.log('matchId : ', matchId)
    console.log('coachId : ', coachId)

    const [teamData, setTeamData] = useState({
        matchId: matchId,
        coachId: coachId,
        //teamNo: '',
        teamName: '',
        selectedPlayers: [] // State to hold selected player IDs
    });

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/players?match_id=${matchId}&coach_id=${coachId}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [matchId, coachId]);

    const handleAdd = async (player_id) => {
        // Check if the player ID is already selected
        const index = teamData.selectedPlayers.indexOf(player_id);
        if (index === -1) {
            // Player not selected, add to selected players
            setTeamData({
                ...teamData,
                selectedPlayers: [...teamData.selectedPlayers, player_id]
            });
        } else {
            // Player already selected, remove from selected players
            const updatedPlayers = [...teamData.selectedPlayers];
            updatedPlayers.splice(index, 1);
            setTeamData({
                ...teamData,
                selectedPlayers: updatedPlayers
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/coach/create-team', teamData);
            if (res.data.success) {
                console.log('Team data saved successfully: ', res.data.team);
                navigate(`/create-team?coach_id=${coachId}`)
            } else {
                console.error('Failed to save team data: ', res.data.error);
            }
        } catch (err) {
            console.error('Error while saving team data: ', err);
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
        navigate(`/create-team?coach_id=${coachId}`)
    }

    //....................

    const columns = [
        { title: 'Player No', dataIndex: 'uid', key: 'playerId', align: 'center', render: (text) => <span className='text'>{text}</span> },
        { title: 'Player Name', dataIndex: 'username', key: 'username', align: 'center', render: (text) => <span className='text'>{text}</span> },
        { title: 'Location', dataIndex: 'District', key: 'District', align: 'center', render: (text) => <span className='text'>{text}</span> },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, player) => (
                <Button
                    style={{
                        backgroundColor: "#52c41a",
                        color: "#fff",
                        fontSize: 'large',
                        marginRight: "10px",
                        borderRadius: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                        width: "100px",
                        padding: '2px'
                    }}
                    onClick={() => handleAdd(player._id)}>
                    {teamData.selectedPlayers.includes(player._id) ? 'Remove' : 'Add'}
                </Button>
            ),
        },
    ];

    return (
        <CoachSidebar>
            <div className="container" style={{height:'fit-content', overflowY:'auto'}}>
                <Form className='text' style={{ margin: 150, marginBottom: 80, marginTop: "0px" }}>
                    <Form.Item label='Team Name' >
                        <Input placeholder="Team Name" name='teamName' value={teamData.teamName} onChange={handleChange} className='inputTag' />
                    </Form.Item>

                   {/* <Form.Item label='Team No' >
                        <Input placeholder="Team No" name='teamNo' value={teamData.teamNo} onChange={handleChange}  className='inputTag'/>
                    </Form.Item>*/}

                </Form>
                <Table columns={columns} dataSource={players} style={{ margin: 50, marginTop: 0, marginBottom: 0 }} />


                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:10}}>
                    {teamData.teamName && (
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

export default SelectPlayers;







//dont delete the following please

/*
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../CoachSidebar/CoachSidebar';

const SelectPlayers = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const matchId = params.get('matchId');
    const coachId = params.get('coachId');

    const [teamData, setTeamData] = useState({
        matchId: matchId,
        coachId: coachId,
        teamNo: '',
        teamName: '',
        selectedPlayers: [] // State to hold selected player IDs
    });

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/coach/players?matchId=${matchId}&coachId=${coachId}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [matchId, coachId]);

    const handleAdd = async (player_id) => {
        // Check if the player ID is already selected
        const index = teamData.selectedPlayers.indexOf(player_id);
        if (index === -1) {
            // Player not selected, add to selected players
            setTeamData({
                ...teamData,
                selectedPlayers: [...teamData.selectedPlayers, player_id]
            });
        } else {
            // Player already selected, remove from selected players
            const updatedPlayers = [...teamData.selectedPlayers];
            updatedPlayers.splice(index, 1);
            setTeamData({
                ...teamData,
                selectedPlayers: updatedPlayers
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/coach/create-team', teamData);
            if (res.data.success) {
                console.log('Team data saved successfully: ', res.data.team);
                navigate(`/create-team?coach_id=${coachId}`)
            } else {
                console.error('Failed to save team data: ', res.data.error);
            }
        } catch (err) {
            console.error('Error while saving team data: ', err);
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
                <div style={{ margin: 20, padding: 20, textAlign: 'center' }}>CreateTeam <br />
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
                            {players.map((player, index) => (
                                !(player.Status === 'available') && (<tr style={{fontWeight:'bold'}} key={index}>
                                    <td style={{ textAlign: 'center' }} >{player.playerId}</td>
                                    <td style={{ textAlign: 'center' }}>{player.playerName}</td>
                                    <td style={{ textAlign: 'center' }}>{player.District}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className='btn btn-success'  onClick={() => handleAdd(player._id)}>
                                            {teamData.selectedPlayers.includes(player._id) ? 'Remove' : 'Add'}
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

export default SelectPlayers;

*/