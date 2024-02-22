import React from 'react'
import './PlayerAvailability.css'
import PlayerSideBar from '../PlayerSideBar/PlayerSideBar'

const PlayerAvailability = () => {
  return (
    <div>
      <PlayerSideBar>
        <div className="player-availability">
          <h1>Player Availability</h1>
        </div>
      </PlayerSideBar>
    </div>
  )
}

export default PlayerAvailability
