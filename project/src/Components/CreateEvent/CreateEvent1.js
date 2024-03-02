import React, { useEffect, useState } from 'react'
import '../App.css'

import axios from "axios"
import {Button} from 'antd'
import FormTable from './FormTable'
import Navbar from '../components/Navbar';
import EOSizeBar from '../EventOrganizer/EOSideBar/EOSideBar'


axios.defaults.baseURL = "http://localhost:8080/"

export default function AssinForm() {
// Edit button 
  const [editSection, setEditSection] = useState(false)
 const [formDataEdit, setFormDataEdit] = useState({
   

   })

   const [ dataList, setDataList] = useState([])

   //delete button in the table
const handleDelete =  async(id)=>{
  const data = await axios.delete("/delete/"+id )
 
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
  }
}

  
const getFetchData = async ()=>{
  const data = await axios.get("/")
  console.log(data)
  if(data.data.success){
    setDataList(data.data.data)
  
    
  }
}
useEffect(()=>{
  getFetchData()
},[])

//update button funtion
const handleUpdate = async(e)=>{
e.preventDefault()
const data = await axios.put("/update/",formDataEdit)
if(data.data.success){
  
  alert(data.data.message)
  setEditSection(false)
}




}

const handleEditOnChange = async(e)=>{
  const {value,name} = e.target
     setFormDataEdit((preve)=>{
     return{
      ...preve,
      [name] : value
     }
     })
}

const handleEdit = (el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}
  return (
    <>
      
<EOSizeBar><div className="container">
      

     

      {
        editSection && (
          <FormTable
        handleSubmit={handleUpdate}
        handleOnChange={handleEditOnChange}
        handleclose={()=> setEditSection(false)}
        rest={formDataEdit}
        />
        )
      }

   
   <div className="tableContainer">
    <table>
      <thead>
        <tr>
          <th>Name of the Event</th>
          <th>Location</th>
          <th>Teams</th>
          <th>Date</th>
           <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          dataList.map((el)=>{
            console.log(el)
            return(
              <tr>
                <td>{el.name}</td>
                <td>{el.location}</td>
                <td>{el.teams}</td>
                <td>{el.date}</td>
                <td>
                  <Button className="btn btn-edit" onClick={()=>handleEdit(el)}>Update</Button>
                  <Button className='btn-delete'type='primary'danger onClick={()=>handleDelete(el._id)}>Delete</Button>
                 
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
   </div>




  </div>
  </EOSizeBar>
    </>
  );
}
