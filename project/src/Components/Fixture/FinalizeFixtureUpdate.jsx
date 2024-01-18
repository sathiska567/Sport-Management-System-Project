import React, { useEffect, useState } from 'react'
import SideBar from '../DashboardSideBar/SideBar'
import axios from 'axios'
import { Input, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function FinalizeFixtureUpdate() {
  const [newTeamdata, setnewTeamData] = useState([])
  const [fixtures, setFixture] = useState([])
  const navigate = useNavigate();

const getAllFixtures = async () => {

    try {
      const response = await axios.get("http://localhost:8080/api/v1/finalFixture/all-fixtures")
      console.log(response.data.allFixtures);
      setFixture(response.data.allFixtures)

    } catch (error) {
      message.error("Error in fetching data");
    }

  }


const handleDelete = async (id) => {
    console.log(id);
    try {
      // const id = id;
      const response = await axios.post("http://localhost:8080/api/v1/finalFixture/delete", { id: id })
      // console.log(response);
      message.success("Data deleted successfully");
      window.location.reload();

    } catch (error) {
      message.error("Error in deleting data");
    }
  }


const handleUpdate = async(id)=>{
    // console.log(id);
    // const response = await axios.post("http://localhost:8080/api/v1/finalFixture/update",{id})
    // console.log(response);
    navigate("/final-update-fixture",{state:{id:id}})

  }

  useEffect(() => {
    getAllFixtures()
  }, [])

  return (
    <>
      <SideBar>
        <div className="fixtureContainer">

          <Table
            className="Table"
            columns={[
              {
                title: "Teams Name",
                dataIndex: "teamName",
                // width: "40%",
                render: (text, record) => (
                  <>
                    <span>
                      {/* {record.newTeam} */}
                      {setnewTeamData(record.newTeam)}
                      {newTeamdata.map((data) => (
                        <ul>
                          <li>{data}</li>
                        </ul>

                      ))}

                    </span>

                  </>
                )
              },

              {
                title: "Event Time",
                dataIndex: "time",
                render: (text, record) => <span>8.30am</span>,
              },

              {
                title: "Location",
                dataIndex: "location",
                render: (text, record) => <span>Ground 01</span>,
              },

              {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                  <>
                                   
                    <button onClick={()=>handleUpdate(record._id)}>Update</button>

                    <button onClick={() => handleDelete(record._id)}>Delete</button>

                  </>
                )
              },

            ]}
            pagination={{
              style: {
                marginTop: "50px",
              },
              pageSize: 100,
            }}

            // Displaying data from the backend
            dataSource={fixtures}
          >

          </Table>
        </div>

        {/* <Input placeholder="Basic usage" />; */}

      </SideBar>

    </>
  )
}
