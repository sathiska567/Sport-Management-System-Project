import React, { useState } from 'react'
import "./CoachReviewPlayers.css";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import { Button, Flex, Rate } from 'antd';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const CoachReviewPlayers = () => {
  const [value, setValue] = useState(3);

const reviewValue = async()=>{
   console.log(value ? desc[value - 1] : 'null');
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
