import React from 'react'
import "./CreateEvent1"

import { MdClose } from 'react-icons/md'


const FormTable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addCotainer">
            <form  onSubmit={handleSubmit}>
             <div className="close-btn" onClick={handleclose}><MdClose/></div>
              <label htmlFor="name">Name of the Event</label>
              <input type="text" id="name" name="name"  onChange={ handleOnChange} value={rest.name}/>
    
              <label  htmlFor="location">Location</label>
              <input type="text" id="location" name="location"   onChange={ handleOnChange} value={rest.location}/>
    
              <label htmlFor="number">Teams</label>
              <input type="number" id="teams" name="teams"   onChange={ handleOnChange} value={rest.teams}/> 
    
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date"   onChange={ handleOnChange} value={rest.date}/>
    
              <label htmlFor="time">Time  </label>
              <input type="time" id="time" name="time"   onChange={ handleOnChange} value={rest.time}/>  
    
              <button className="btn">Create</button>
            </form>
          </div>
  )
}

export default FormTable