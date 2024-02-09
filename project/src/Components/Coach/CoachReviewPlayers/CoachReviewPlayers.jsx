import React, { useState } from 'react'
import "./CoachReviewPlayers.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Button, Flex, Rate, message } from 'antd';
import axios from 'axios';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const CoachReviewPlayers = () => {
  const [value, setValue] = useState(3);

const reviewValue = async()=>{
  const data = value ? desc[value - 1] : 'null'
   console.log(data);
   
   try {
    const response = await axios.post("http://localhost:8080/api/v1/review/coach-review",{data})
    
   } catch (error) {
      message.error("Error in submitting review");
   }


}


  return (
    <div>
      <CoachSidebar>

        <Flex vertical>
          <Rate tooltips={desc} onChange={setValue} value={value}/><br />
          {/* {value ? <span>{desc[value - 1]}</span> : null} */}
          <Button 
          onClick={reviewValue}
          style={{
            backgroundColor: "#00A693",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "5px",
            marginTop: "auto",
            marginBottom: "auto",
            width: "100px",
          }}

          >
            click
            
          </Button>
        </Flex>

      </CoachSidebar>
    </div>
  )
}

export default CoachReviewPlayers
