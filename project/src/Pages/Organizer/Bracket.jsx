import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TournamentBracket = () => {
  const [matches, setMatches] = useState([])

  const [pairs, setPairs] = useState([]);
  const [winnersArray, setWinnersArray] = useState([]);
  const [roundNo, setroundNo] = useState(1);
  const [finalWinner, setFinalWinner] = useState(null)

  const [rounds, setRounds] = useState([])

  const matchId = "003"; // Replace with the actual matchId
  //const roundNo = 1; // Replace with the actual roundNo
  //const winnersArray = ['team1', 'team2'];

  useEffect(()=>{
    axios.get(`http://localhost:8080/matches`)
    .then(res=>{
        console.log(res.data)
        setMatches(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
  }, [])


  const pairsGet = async () => {
    try {
      console.log(roundNo, ' : roundNo')
      const response = await axios.get(`http://localhost:8080/create-round/${matchId}/${roundNo}`);
      setPairs(response.data.rounds[roundNo - 1].pairs);
      console.log(response.data.rounds[roundNo - 1].pairs);

    } catch (error) {
      console.error("Error fetching pairs:", error);
    }
  };




  const handleNextRound = () => {
    axios.post(`http://localhost:8080/setWinners/${matchId}/${roundNo}`, { winnersArray })
      .then(res => {
        console.log(winnersArray)
        console.log(`Round ${roundNo} winners sent successfully:`, res.data.mess);
        setroundNo(roundNo + 1);
        setWinnersArray([]);

        // Manually reset radio buttons
        const radioButtons = document.querySelectorAll('input[type=radio]:checked');
        radioButtons.forEach(button => {
          button.checked = false;
        });

        if (res.data.finalWinner) {
          console.log(res.data.message, ' : ', res.data.finalWinner)
          setFinalWinner(res.data.finalWinner);
        }

      })
      .catch(err => {
        console.log(`Error sending round ${roundNo} result:`, err);
      });
  };

  const handleTeamSelection = (pairIndex, teamIndex) => {
    const updatedwinnersArray = [...winnersArray];
    updatedwinnersArray[pairIndex] = pairs[pairIndex][teamIndex];
    setWinnersArray(updatedwinnersArray);
  };


  const handleViewWinners = async () => {
    try{
      const res = await axios.get(`http://localhost:8080/getWinners/${matchId}`);
      setRounds(res.data.match.rounds)
      console.log(rounds)
    
    }catch(err){
      console.error("Error fetching rounds to get respective winners:", err);
    }

  }



  return (
    <div style={{ margin: 10, padding: 10 }}>
      {(!finalWinner) && (
        <div>

          <button onClick={pairsGet}>get pairs</button>
          <div>{pairs}</div>
          {/* Section for selecting winners */}
          {pairs && (
            <div>
              {pairs.map((pair, pairIndex) => (
                <div key={pairIndex}>
                  <ul>
                    {pair.map((team, teamIndex) => (
                      <li key={teamIndex}>
                        {team}
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
          <button onClick={handleNextRound}>Next Round</button>
        </div>
      )}
      {/*view*/}

      <div style={{ backgroundColor: 'greenyellow', margin: 10, width: '100%', height: 200 }}>
        {finalWinner && (
          <div style={{ fontSize: 40, margin: 20, padding: 20, color: 'red', fontWeight: 'bold' }}>Final winner is : <span style={{ color: 'blue' }}>{finalWinner}</span></div>
        )}

        <button onClick={handleViewWinners} >View winners</button>
        {(
          <div>
            {rounds.map(round => (
              <div key={round.roundNumber}>
                Round No : {round.roundNumber} &nbsp; =&gt; Winners : {round.winners}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TournamentBracket;
