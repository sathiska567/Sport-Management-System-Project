
import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import {Form, Button,  Input} from "antd";
import '../App.css';
import axios from "axios";
import EOSidebar from "../EOSideBar/EOSideBar";






export default function EventForm() {
const [name,setName] = useState()
const [location,setLocation] = useState()
const [teams,setTeams] = useState()
const [date,setDate] = useState()
const [time,setTime] = useState()

        //  const = onFinish={(values)=>{
        //       console.log({values});
        //     }}

     const onFinish = async (values) => {

          try {
            const response = await axios.post("http://localhost:8080/create", values);
            console.log("Data sent successfully", response.data);

          } catch (error) {
            console.error("Error sending data to the backend", error);
          }
        };
        

  return (

    <div>
        
        <EOSidebar><div>


<Form 

autoComplete='off'
labelCol={{span: 8}} 
wrapperCol={{span:14}}

onFinish={onFinish}

className="form">



  <Form.Item
   id='name'
   name="name" 
   label="Name Of The Event"
  
   rules={[
    {
      required: true,
      message: "please Enter Event Name"
    },
    {
      whitespace: true
    },
    { min : 3},
   ]}hasFeedback>
    <Input placeholder="Enter Your Event Name"  name="name" onChange={(e) => setName(e.target.value)}/>
  </Form.Item>



  <Form.Item
  id='location'
   name="location" 
   label="Location"
   rules={[
    {
      required: true,
      message: "please Enter Location"
    },
    {
      whitespace: true
    },
    { min : 3},
   ]}hasFeedback>
    <Input placeholder="Enter Your Location"  name="location" onChange={(e) => setLocation(e.target.value)}/>
  </Form.Item>




  <Form.Item
  id="teams"
   name="teams" 
   label="Number Of Teams" 
   rules={[
    {
      required: true,
   
    },
    {min : 1}
   ]}hasFeedback
    >
    <Input type='number' placeholder='Enter Number Of Teams' name="teams"  onChange={(e) => setTeams(e.target.value)}/>
  </Form.Item>





  <Form.Item 
   id="date"
  name="date" 
  label="Event Date"
  rules={[
    
    {
      required: true,
      message: "please Enter The Date",
    },
   
   ]}hasFeedback>
    <Input style={{width:'100%'}} type='date' placeholder='Select date' name="date"  onChange={(e) => setDate(e.target.value)}/>
  </Form.Item>





  <Form.Item 
  id="time"
  name="time" 
  label="Event Starting Time"
  rules={[
    
    {
      required: true,
      message: "please Enter The Time",
    },
   
   ]}hasFeedback
  >
    <Input style={{width:'100%'}} type='time' placeholder='Select Time'  name="time"  onChange={(e) => setTime(e.target.value)}/>
  </Form.Item>

  <Form.Item  wrapperCol={{span:34}}>
    <Button type="primary" htmlType='submit' value="submit">Create</Button>
  </Form.Item>
</Form>


</div></EOSidebar>
    </div>
  )
}
