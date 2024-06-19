import React, { useState, useEffect } from 'react'
import './EditEventTable.css'
import axios from "axios";
import { Layout, Button, Input, Table,Modal,message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import EOSideBar from '../EOSideBar/EOSideBar';
const { Content } = Layout;
export default function ViewMatch(prams) {
    const [userRole, setUserRole] = useState("");
    const [Userlocation, setUserLocation] = useState("");
    const [userApplicationData, setUserApplicationData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation([]);
    const [nameOfTheEvent, setTeamName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [dataSource, setDataSource] = useState([]);

    
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [limits , setLimits] = useState(3);
    
  
    const fetchData = async (page) => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/event/pagination', { page });
        console.log("response", response)
        setDataSource(response.data.data.events);
        setTotal(response.data.data.totalDocuments);
        setLimits(response.data.data.limit)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(currentPage);
    }, [currentPage]);
  
    const handlePagination = (page) => {
      setCurrentPage(page);
    };
    
// delete button
const handleDelete = async (id) => {
    
    // Delete button after click styles--------------------------------------
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
        console.log("TO DELETE", id);
        const response = await axios.delete(`http://localhost:8080/api/v1/EditEventTable/delete-event/${id}`);
  
  
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
// Filter userApplicationData based on userRole and Userlocation
    const handleDateSearch = (value) => {
        console.log("Event Date Searched: ", value);
        setEventDate(value);
    };

    const handleTeamNameSearch = (value) => {
        console.log("Team Name Searched: ", value);
        setTeamName(value);
    };



    // // getdata  and search players
    // const getFetchData = async (nameOfTheEvent, eventDate) => {        
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/EditEventTable/get-create/?q=${nameOfTheEvent}&date=${eventDate}`);
    //         console.log(response.data);
    
    //         if (response.data.success) {
    //             setDataSource(response.data.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };


    const handleEditNavigate = async(record)=>{
      try {
        navigate("/EditEventFormNew",{state:{record:record}})
      } catch (error) {
         message.error("An error occurred while navigate to editing the Event");
      }
    }
    

    // useEffect(() => {
    //     getFetchData(nameOfTheEvent,eventDate);
    // }, [nameOfTheEvent,eventDate])

    // End

    // JSX structure for the Navbar component
    return (
        <EOSideBar>
            <Layout className="ant-layout-sider-children">
                {/* Main content layout */}
                <Layout>
                    {/* Content section with statistics */}
                    <Content
                        className="ant-layout-content"
                        style={{
                            margin: "16px",
                            padding: 15,
                            minHeight: 180,
                            height: "100%",
                            background: "whitesmoke",
                        }}
                    >
                        {/* Search section */}
                        <div className="search">
                            <Input.Search
                                placeholder="Search by Event Name"
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleTeamNameSearch}
                                // onChange={(e) => handleEventNameSearch(e.target.value)}
                                allowClear
                            />
                            <Input.Search
                                type='date'
                                styles={{
                                    marginBottom: "9",
                                }}
                                onSearch={handleDateSearch}
                                // onChange={(e) => handleTeamNameSearch(e.target.value)}
                                allowClear
                            />
                        </div>
                        {/* Table section */}
                        <div className="tabContainer">
                            <Table
                                className="Tab"
                                columns={[

                                    {
                                        title: "Event Name",
                                        dataIndex: "EventName",
                                        key: "EventName",
                                        render: (text, record) => (
                                            <span>{record. nameOfTheEvent}</span>
                                        )
                                    },

                                    {
                                        title: " Location",
                                        dataIndex: "Location",
                                        key: "Location",
                                        render: (text, record) => (
                                            <span>{record.location}</span>
                                        )
                                    },
                                    {
                                      title: " Teams",
                                      dataIndex: "Teams",
                                      key: "Teams",
                                      render: (text, record) => (
                                          <span>{record.numberOfTeams}</span>
                                      )
                                  },

                                    
                                    {
                                        title: "Event Date",
                                        dataIndex: "EventDate",
                                        key: "EventDate",
                                        render: (text, record) => (
                                            <span>{record.eventNewDate}</span>
                                        )
                                    },
                                    
                                    {
                                        title: "Event Time",
                                        dataIndex: "EventTime",
                                        key: "EventTime",
                                        render: (text, record) => (
                                            <span>{record.formattedTime}</span>
                                        )
                                    },
                                   
                                    {
                                        title: "Actions",
                                        dataIndex: "Actions",
                                        key: "Actions",
                                        render: (text, record) => (
                                            <span
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: "10px",
                                                }}
                                            >
                                                <Button
                                                    type="ghost"
                                                    ghost
                                                    onClick={() => handleEditNavigate(record)}
                                                    // href={"/EditEventFormNew/" ,{state:{record:record}}}
                                                    style={{
                                                        backgroundColor: "green",
                                                        color: "#fff",
                                                        fontSize: "14px",
                                                        marginRight: "10px",
                                                        borderRadius: "8px",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                >
                                                   Edit
                                                </Button>
                                                <Button
                                                    type="ghost"
                                                    ghost
                                                    onClick={() => handleDelete(record._id)}
                
                                                    style={{
                                                        backgroundColor: "red",
                                                        color: "#fff",
                                                        fontSize: "14px",
                                                        marginRight: "10px",
                                                        borderRadius: "8px",
                                                        marginTop: "auto",
                                                        marginBottom: "auto",
                                                    }}
                                                >
                                                   Delete
                                                </Button>
                                            </span>
                                        ),
                                    },
                                ]}
                                pagination={{
                                    style: {
                                      marginTop: "10px",
                                    },
                                    // pageSize: 5,
                                    current: currentPage ? currentPage : 1,
                                    total: total,
                                    pageSize: limits,
                                    onChange: handlePagination,
                                  }}

                                dataSource={dataSource}
                            ></Table>
                            {console.log(dataSource)}
                        </div>
                    </Content>
                </Layout>
            </Layout>
            </EOSideBar>
    );
}