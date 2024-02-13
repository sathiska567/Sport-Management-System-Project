import axios from 'axios';
import React, { useState } from 'react'

const CreateMatch = () => {

  const [matchData, setMatchData] = useState({
    matchId: '',
    matchName: '',
    location: '',
  });

  const handleSubmit = async (event)=>{
    event.preventDefault();//prevent form submission

    try{
      const resp = await axios.post('http://localhost:8080/coach/create-match', matchData);
      
      if(resp.data.success){
        console.log('Match data saved successfully: ', resp.data.match);
      }else{
        console.error('failed to save match data: ', resp.data.error);
      }
    }catch(err){
      console.error('Error while saving match data: ', err);
    }
  }

  const handleChange = (event)=>{
    const {name, value} = event.target;
    setMatchData({
      ...matchData, [name]:value
    });
  }


  return (
    <div>
        <div>createMatch</div>
        <div>
            <form onSubmit={handleSubmit}>
                Match Id : <input type="text" name='matchId' value={matchData.matchId} onChange={handleChange} /><br />
                Match Name : <input type="text" name='matchName' value={matchData.matchName} onChange={handleChange} /><br />
                Location : <input type="text" name='location' value={matchData.location} onChange={handleChange}/><br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateMatch;