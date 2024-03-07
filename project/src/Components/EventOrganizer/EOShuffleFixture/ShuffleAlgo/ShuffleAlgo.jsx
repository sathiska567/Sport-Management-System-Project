import React, { useEffect, useState } from "react";

function SingleEliminationTournament() {
  const [teams, setTeams] = useState([
    "Team1",
    "Team2",
    "Team3",
    "Team4",
    "Team5",
    "Team6",
    "Team7",
    "Team8",
//  "Team9",
  ]);

const singleEliminate = async()=>{
    // implement your algorithm here
    const teamLength = teams.length;
    const numberOfMatches = teamLength - 1;
//  console.log(numberOfMatches);
    const fixtureTeam = [];

    if((teamLength % 2) === 0){
      try {
        const randomIndex = Math.floor(Math.random() * teamLength);
        console.log(randomIndex);
        // for (let i = 0; i < numberOfMatches; i++) {
               
        // }
        
      } catch (error) {
        
      }
    }
    else{
        console.log("hi");
    }


  }

useEffect(()=>{
        singleEliminate()
},[])
  
  return (
    <div>
      <h1>Single Elimination Tournament</h1>
    </div>
  );
}

export default SingleEliminationTournament;
