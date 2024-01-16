import React, { useEffect } from 'react'
import SideBar from '../DashboardSideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios';

export default function FinalizeFixture() {
  const location = useLocation([])

  console.log(location.state.shuffledDataId);

 const getFinalizeShuffle = async()=>{
   try {
    const id = location.state.shuffledDataId
     const response = await axios.post("http://localhost:8080/api/v1/shuffle/newFixture",{id:id})
     console.log(response);
    
   } catch (error) {
    message.error("Error Occure in Finalize Fixture")
   }

 }

 useEffect(()=>{
  getFinalizeShuffle()
 },[])

  return (
    <>
     <SideBar>

      finalize
        
     </SideBar>        
    </>
  )
}
