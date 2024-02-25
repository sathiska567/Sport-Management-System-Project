import 'antd/dist/antd'
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Input, message } from 'antd'
import axios from 'axios'
import CoachSidebar from '../Coach/CoachSidebar/CoachSidebar';

import './AssignMember.css'



axios.defaults.baseURL = "http://localhost:8080/api/v1/assign"

export default function AssignButton() {

  const [assignedIds, setAssignedIds] = useState([]);

  const [searchedText, setSearchedText] = useState("")

  const [filteredData,setFilteredData] = useState([])
  const [dataSource, setDataSource] = useState([
    {

    }

  ]);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchedText(searchText);
    
    // Use the functional form of setDataSource to ensure proper state update
    const filteredData = dataSource.filter(item => item.name.toLowerCase().includes(searchedText));
    setDataSource(filteredData);
};

  // table
  const getFetchData = async () => {

    const data = await axios.get("/get-assignee")
    console.log(data)

    if (data.data.success) {
      setDataSource(data.data.data)
    }

  }
  useEffect(() => {
    getFetchData()
   
  }, [])

  // delete button
  const handleDelete = async (id) => {
    try {
      const confirmed = await new Promise((resolve, reject) => {
        Modal.confirm({
          title: 'Are you sure you want to delete this member record?',
          okText: 'Yes',
          okType: 'danger',
          onOk: () => resolve(true),
          onCancel: () => resolve(false) 
        });
      });
  
      if (confirmed) {
        console.log(id);
        const response = await axios.post("/delete-status", { id: id });
  
  
        if (response.data.success) {
          message.success("Deletion is successful");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      
      message.error("An error occurred while deleting the member");
    }
  };
  


  //Assign button
  const handleAssign = async (id, status) => {
    
    try {
      const confirmed = await new Promise((resolve, reject) => {
        Modal.confirm({
          title: `Are you sure you want to assign "${status}" to this member?`,
          okText: 'Yes',
          okType: 'primary',
          onOk: () => resolve(true),
          onCancel: () => resolve(false)
        });
      });
  
      if (confirmed) {
        setAssignedIds([...assignedIds, id]);
    
     
        await axios
        .post("/change-status", { id: id }) // Adjust the endpoint URL accordingly
        .then((res) => {
          if(res.data.success){
            // setIsAssigned(true)
          message.success("Status assigned successfully");
          // window.location.reload();
          }else{
            message.success("error");
          }
        }).catch((err)=>{
          message.success("error");
        })
        // if (response.data.success) {
        //   setIsAssigned(true)
        //   message.success("Status assigned successfully");
        //   window.location.reload();
        // }
     
     
     
      }
    } catch (error) {
      console.error("Error assigning status:", error);
    }

  };
  
  
  

  const columns = [

    
    {
      
      title: 'ID',
      dataIndex: 'sid',
      width: "20%",
      align: "center",
     
      
    },
    {
      title: 'Name',
      width: "20%",
      align: "center",
      dataIndex: 'name',
      filterValue: ["s"], // Set filterValue directly to searchText
      onFilter: (value, record) => {
        return record.name.includes(value);
      },
    },
    {

      title: 'Location',
      dataIndex: 'location',
      width: "20%",
      align: "center",
    },
    {
      width: "20%",
      align: "center",
      title: 'Actions',
      render: (text, record) => {
  
        return <>
          <Button type='primary' className='assignBtn'  onClick={() => handleAssign(record._id, record.status)} disabled={assignedIds.includes(record._id)} >{assignedIds.includes(record._id)?"Assigned":"Assign"}</Button>
          <Button type='primary' danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
        // console.log(record);
    
      }

    },

  ];



  return (
    <div>
      <CoachSidebar>
          <header>

<Input.Search
  placeholder="search name..."
  style={{ marginBottom: 8 }}
  //  onSearch={(value) => {
  //   setSearchedText(value)
  //  }}
    onChange={handleSearch}
  
/>

<Table
 className='Table4'
 style={{
  margin: "5px",
  padding: 30,
  minHeight: 10,
  height: "100%",
  background: "whitesmoke",
}}
 
  columns={columns }
  dataSource={dataSource }
  
>


</Table>

</header>
      </CoachSidebar>
    </div>
  )
}
