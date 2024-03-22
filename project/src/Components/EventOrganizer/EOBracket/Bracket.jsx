import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EOSizeBar from '../EOSideBar/EOSideBar';

const TournamentBracket = () => {
  const [matches, setMatches] = useState([])

  const [pairs, setPairs] = useState([]);

  const [winnersArray, setWinnersArray] = useState([]);
  const [roundNo, setroundNo] = useState(1);
  const [finalWinner, setFinalWinner] = useState(null)

  const [rounds, setRounds] = useState([])
  const [teams, setTeams] = useState([])


  const [selectedMatchId, setSelectedMatchId] = useState('');
  //const matchId = "003"; // Replace with the actual matchId
  //const roundNo = 1; // Replace with the actual roundNo
  //const winnersArray = ['team1', 'team2'];

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/organizer/matches`)
      .then(res => {
        console.log(res.data)
        setMatches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const pairsGet = async () => {
    try {
      console.log(roundNo, ' : roundNo')
      console.log(selectedMatchId, ' : matchId')
      const response = await axios.get(`http://localhost:8080/api/v1/organizer/create-round/${selectedMatchId}/${roundNo}`);
      console.log('data received : ', response.data)
      setPairs(response.data);

    } catch (error) {
      console.error("Error fetching pairs:", error);
    }
  };


  const handleSelectMatch = (event) => {
    setSelectedMatchId(event.target.value);
  };



  const handleNextRound = () => {
    axios.post(`http://localhost:8080/api/v1/organizer/setWinners/${selectedMatchId}/${roundNo}`, { winnersArray })
      .then(res => {
        console.log(winnersArray)
        console.log(`Round ${roundNo} winners sent successfully:`, res.data);
        setroundNo(roundNo + 1);
        setWinnersArray([]);

        // Manually reset radio buttons
        const radioButtons = document.querySelectorAll('input[type=radio]:checked');
        radioButtons.forEach(button => {
          button.checked = false;
        });

        if (res.data.finalWinner) {
          console.log(res.data.message, ' : ', res.data.finalWinner.teamName)
          setFinalWinner(res.data.finalWinner.teamName);
        }

      })
      .catch(err => {
        console.log(`Error sending round ${roundNo} result:`, err);
      });
  };

  const handleTeamSelection = (pairIndex, teamIndex) => {
    const updatedwinnersArray = [...winnersArray];
    updatedwinnersArray[pairIndex] = pairs[pairIndex][teamIndex]._id;
    setWinnersArray(updatedwinnersArray);
  };


  const handleViewWinners = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/organizer/getWinners/${selectedMatchId}`);
      console.log("winn", res.data)
      setRounds(res.data.match.rounds)
      setTeams(res.data.match.teams)
      console.log("rounds w", rounds)

    } catch (err) {
      console.error("Error fetching rounds to get respective winners:", err);
    }

  }



  return (
    <EOSizeBar>
      <div style={{ margin: 10, padding: 10, height: 'auto', overflow: 'scroll' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} className='card bg-light'>
          <div style={{ display: 'flex', flexDirection: 'column' }} className='card-body'>
            <select className='form-select form-select-lg mb-3 ' onChange={handleSelectMatch} value={selectedMatchId}>
              <option value="default">Select a match</option> {/* Default option */}
              {matches.map(match => (
                <option key={match.matchNo} value={match.matchNo}>
                  {match.name} : {match.matchNo}
                </option>
              ))}
            </select>
            {/*<p className='card-title'>Selected Match : {selectedMatchId}</p>*/}
          </div>

          {(!finalWinner) && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>


              <button onClick={pairsGet}  className='btn btn-success '>get pairs</button>
              {/* Section for selecting winners */}
              {pairs && (
                <div style={{display:'flex' }} className='gap-2'>
                  {pairs.map((pair, pairIndex) => (
                    <div key={pairIndex} className='card p-3 m-2' >
                      <ul style={{margin:0, padding:0}}>
                        {pair.map((team, teamIndex) => (
                          <li key={teamIndex} className='form-check'>
                            <label className='form-check-label'>{team.teamName}</label>
                            <input  className='form-check-input'
                              type='radio'
                              style={{ width: 20 }}
                              name={`pair${pairIndex}`}
                              onChange={() => handleTeamSelection(pairIndex, teamIndex)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Button to move to the next round */}
              {pairs && (<button onClick={handleNextRound} className='btn btn-dark my-3'>Next Round</button>)}
            </div>
          )}

          {finalWinner && (
            <div style={{ fontSize: 40, margin: 20, padding: 20, color: 'red', fontWeight: 'bold' }}>Final winner is : <span style={{ color: 'blue' }}>{finalWinner}</span></div>
          )}
        </div>

        {/*view winners*/}

        <div style={{ marginTop: 30, width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className='card'>


          <button className='btn btn-dark my-3' onClick={handleViewWinners} >View winners</button>
          {(
            <div style={{ display: 'flex' }}>
              {rounds.map(round => round.winners && (
                <div className='card bg-info' key={round.roundNumber} style={{ border: '1px solid black', margin: 5, padding: 5 }}>
                  <h5>Round No : {round.roundNumber}</h5>{/* &nbsp; =&gt; Winners : {round.winners.join(', ')} */}

                  <div>
                    {round.pairs.map((pair, pairIndex) => (
                      <div key={pairIndex}>
                        <ul className='card bg-dark text-light' style={{ backgroundColor: 'red', listStyleType: 'none', marginLeft: 0, paddingLeft: 0 }}>
                          {pair.map((team, teamIndex) => {
                            const tName = teams.find(t => t._id === team).teamName
                            return (
                              <li key={teamIndex} style={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
                                {tName}
                                <input
                                  type='radio'
                                  style={{ width: 20, }}  className='form-check-input'

                                  checked={round.winners.some(winner => winner._id === team)}
                                />
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </EOSizeBar>
  );
};

export default TournamentBracket;