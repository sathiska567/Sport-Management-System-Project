import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    axios.get("http://localhost:8080/api/v1/eventOrganizerBracket/getTeams")
      .then(res => {
        console.log(res.data)
        setMatches(res.data[0].shuffleTeam)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  const pairsGet = async () => {
    try {
      console.log(roundNo, ' : roundNo')
      console.log(selectedMatchId, ' : matchId')
      const response = await axios.get(`http://localhost:8080/create-round/${selectedMatchId}/${roundNo}`);
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
    axios.post(`http://localhost:8080/setWinners/${selectedMatchId}/${roundNo}`, { winnersArray })
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
      const res = await axios.get(`http://localhost:8080/getWinners/${selectedMatchId}`);
      console.log("winn", res.data)
      setRounds(res.data.match.rounds)
      setTeams(res.data.match.teams)
      console.log("rounds w", rounds)

    } catch (err) {
      console.error("Error fetching rounds to get respective winners:", err);
    }

  }



  return (
    <div style={{ margin: 10, padding: 10, height: '100%', overflow: 'scroll' }}>
      <div style={{ backgroundColor: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select onChange={handleSelectMatch} value={selectedMatchId}>
            <option value="default">Select a match</option> {/* Default option */}
            {matches.map(match => (
              <option key={match.matchNo} value={match.matchNo}>
                {match.name} : {match.matchNo}
              </option>
            ))}
          </select>
          <p>Selected Match No: {selectedMatchId}</p>
        </div>

        {(!finalWinner) && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>


            <button onClick={pairsGet}>get pairs</button>
            {/* Section for selecting winners */}
            {pairs && (
              <div>
                {pairs.map((pair, pairIndex) => (
                  <div key={pairIndex}>
                    <ul>
                      {pair.map((team, teamIndex) => (
                        <li key={teamIndex}>
                          {team.teamName}
                          <input
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
            {pairs && (<button onClick={handleNextRound}>Next Round</button>)}
          </div>
        )}

        {finalWinner && (
          <div style={{ fontSize: 40, margin: 20, padding: 20, color: 'red', fontWeight: 'bold' }}>Final winner is : <span style={{ color: 'blue' }}>{finalWinner}</span></div>
        )}
      </div>

      {/*view winners*/}

      <div style={{ backgroundColor: 'greenyellow', marginTop: 30, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>


        <button style={{}} onClick={handleViewWinners} >View winners</button>
        {(
          <div style={{ display: 'flex' }}>
            {rounds.map(round => round.winners && (
              <div key={round.roundNumber} style={{ border: '1px solid black', margin: 5, padding: 5 }}>
                Round No : {round.roundNumber} {/* &nbsp; =&gt; Winners : {round.winners.join(', ')} */}

                <div>
                  {round.pairs.map((pair, pairIndex) => (
                    <div key={pairIndex}>
                      <ul style={{ backgroundColor: 'red', listStyleType:'none', marginLeft:0, paddingLeft:0}}>
                        {pair.map((team, teamIndex) =>{ const tName = teams.find(t=>t._id===team).teamName 
                        return (
                          <li key={teamIndex} style={{display:'flex', justifyContent:'space-between', padding:3 }}>
                            {tName}
                            <input
                              type='radio'
                              style={{ width: 20, }}

                              checked={round.winners.some(winner=>winner._id===team)}
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
  );
};

export default TournamentBracket;
