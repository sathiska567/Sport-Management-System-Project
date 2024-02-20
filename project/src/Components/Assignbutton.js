import 'antd/dist/antd'
import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Input, message } from 'antd'
import axios from 'axios'


import './Assignbutton.css'



axios.defaults.baseURL = "http://localhost:8080/"

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

    const data = await axios.get("/")
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
        const response = await axios.post("/delete", { id: id });
  
  
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
        .post("/status", { id: id }) // Adjust the endpoint URL accordingly
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
      

    },
    {
      title: <span style={{ color: 'blue' }}>Name</span>,

      dataIndex: 'name',
      filterValue: ["s"], // Set filterValue directly to searchText
      onFilter: (value, record) => {
        return record.name.includes(value);
      },
    },
    {

      title: 'Location',
      dataIndex: 'location'
    },
    {

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
          columns={columns }
          dataSource={dataSource}
          
        >


        </Table>

      </header>
    </div>
  )
}