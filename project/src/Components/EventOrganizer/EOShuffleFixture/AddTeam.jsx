import React from 'react';

const teams = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
  "Team G",
];

function generateSingleEliminationBracket(teams) {
  const bracket = [];
  const numberOfRounds = Math.ceil(Math.log2(teams.length));

  for (let i = 0; i < numberOfRounds; i++) {
    bracket.push(new Array(2 ** (numberOfRounds - i)).fill(null));
  }

  for (let i = 0; i < teams.length; i++) {
    bracket[0][i] = teams[i];
  }

  for (let round = 1; round < numberOfRounds; round++) {
    for (let match = 0; match < bracket[round].length; match += 2) {
      const teamA = bracket[round - 1][match];
      const teamB = bracket[round - 1][match + 1];
      bracket[round][match / 2] = [teamA, teamB];
    }
  }

  return bracket;
}

const SingleEliminationBracket = () => {
  const singleEliminationBracket = generateSingleEliminationBracket(teams);

  return (
    <div>
      <h2>Single Elimination Bracket</h2>
      {singleEliminationBracket.map((round, roundIndex) => (
        <div key={roundIndex}>
          <h3>Round {roundIndex + 1}</h3>
          {round.map((matchup) => (
            <div>
              <p>
                Match {roundIndex + 1} {matchup ? matchup + "vs" : "TBD"}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SingleEliminationBracket;
