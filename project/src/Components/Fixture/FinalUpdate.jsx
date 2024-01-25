import React, { useEffect, useState } from 'react'
import SideBar from '../DashboardSideBar/SideBar'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { Table, message, Checkbox } from 'antd';

export default function FinalUpdate() {
  const location = useLocation();
  const [currentfixture, setcurrentFixture] = useState([])

  // console.log(location.state.id);

  const currentFixture = async () => {
    try {
      const id = location.state.id;
      const response = await axios.get("http://localhost:8080/api/v1/fixture/get-team")
      // console.log(response.data.data);
      setcurrentFixture(response.data.data)

    } catch (error) {
      message.error("Current Fixture Fetch have an error")
    }
  }

  useEffect(() => {
    currentFixture();
  })


const handleDelete = async (id) => {
    try {

    console.log(id);
    const response = await axios.post("http://localhost:8080/api/v1/delete/delte-team",{id:id})
    console.log(response);
    message.success(response.data.message)

    } catch (error) {
      message.error("Delete Fixture have an error")
    }
  }

  return (
    <>
      <SideBar>


        {/* {currentfixture.map((data) => (
          <p>{data}</p>
        ))} */}


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
                      {record.TeamName}

                    </span>

                  </>
                )
              },

              {
                title: "Action",
                dataIndex: "action",
                render: (text, record) => (
                  <>

                    {/* <button onClick={() => handleDelete(record._id)}>Delete</button> */}
                    <Checkbox onClick={() => handleDelete(record._id)}>Delete</Checkbox>

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
            dataSource={currentfixture}
          >

          </Table>
        </div>




      </SideBar>
    </>
  )
}