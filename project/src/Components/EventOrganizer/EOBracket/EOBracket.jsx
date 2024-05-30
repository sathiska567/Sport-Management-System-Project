import React, { useState } from "react";
import "./EOBracket.css";
import EOSizeBar from "../EOSideBar/EOSideBar";

const Bracket = () => {
  const [teams, setTeams] = useState([]);
  const [bracket, setBracket] = useState([]);

  const handleTeamNumberChange = (e) => {
    const num = e.target.value;
    if (num > 0) {
      const newTeams = Array.from({ length: num }, () => "");
      setTeams(newTeams);
      setBracket([newTeams]);
    } else {
      setTeams([]);
      setBracket([]);
    }
  };

  const handleTeamNameChange = (index, event) => {
    const newTeams = [...teams];
    newTeams[index] = event.target.value;
    setTeams(newTeams);
    const newBracket = [...bracket];
    newBracket[0] = newTeams;
    setBracket(newBracket);
  };

  const handleTeamSelect = (team, column, event) => {
    const newBracket = [...bracket];
    if (event.target.checked) {
      if (newBracket[column + 1]) {
        // Check if the team is already in the next level
        if (!newBracket[column + 1].includes(team)) {
          newBracket[column + 1].push(team);
        }
      } else {
        newBracket.push([team]);
      }
    } else {
      for (let i = column + 1; i < newBracket.length; i++) {
        newBracket[i] = newBracket[i].filter((t) => t !== team);
      }
    }
    setBracket(newBracket);
  };

  // Check if all team names are entered
  const allTeamNamesEntered = teams.every((team) => team.trim() !== "");

  return (
    <EOSizeBar>






      {/*
      <div className="outer-container">
        <div className="inputContainer">
          <label>
            Number of Teams:
            <input type="number" onChange={handleTeamNumberChange} />
          </label>
          {teams.map((team, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Team ${i + 1} Name`}
              value={team}
              onChange={(event) => handleTeamNameChange(i, event)}
            />
          ))}
        </div>

        {allTeamNamesEntered && (
          <div className="bracket-container">
            {bracket.length > 0 &&
              bracket.map((column, i) => (
                <div key={i}>
                  <h3>
                    {column.length > 1
                      ? `Round ${i + 1}`
                      : column.length > 0
                      ? "Winner"
                      : ""}
                  </h3>
                  {column.map((team, j) => (
                    <div key={j} className="team-label">
                      {column.length > 1 ? (
                        <div className="checkbox-container">
                          <input
                            className="team-checkbox"
                            type="checkbox"
                            name={`team-${i}`}
                            checked={bracket[i + 1]?.includes(team)}
                            onChange={(event) =>
                              handleTeamSelect(team, i, event)
                            }
                          />
                          <label>{team}</label>
                        </div>
                      ) : (
                        <label>{team}</label>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>

                      */}
    </EOSizeBar>
  );
};

export default Bracket;
