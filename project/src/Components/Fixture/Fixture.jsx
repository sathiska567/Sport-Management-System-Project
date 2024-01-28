// import React from 'react'
// import SideBar from './../DashboardSideBar/SideBar';

// import { useEffect, useState } from 'react'

// export default function Fixture() {

// //         const myArray = ["kamal","piyal","sunil","rahal"]
// //         const shuffledArray = []
// //         const usedIndexes = []
// //         const [shuffledNewArray, setShuffledNewArray] = useState([]);


// // const ShuffleData = () => {
// //             let i = 0;

// //             while (i < myArray.length) {

// //             const randomIndex = Math.floor(Math.random() * myArray.length);

// //              if(!usedIndexes.includes(randomIndex)){
// //                  shuffledArray.push(myArray[randomIndex])
// //                  usedIndexes.push(randomIndex)
// //                  i++
// //              }   

// //             }
// //         setShuffledNewArray(shuffledArray)

// //         }

// // useEffect(()=>{
// //         ShuffleData();
// // },[])

//   return (
//     <>
//       <SideBar>
//       <div>
//             {/* <button onClick={ShuffleData} style={{ margin: "200px" }}>
//               Shuffle
//             </button> */}
//             {/* <p>{shuffledNewArray}</p> */}

//             {/* <ul>
//               {shuffledNewArray.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul> */}


//            {/* <Table dataSource={shuffledNewArray} columns={columns} />; */}


//      hi


//           </div>
//       </SideBar>

//     </>
//   )
// }

import React, { useEffect, useState } from 'react'
import SideBar from '../DashboardSideBar/SideBar'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Flex, Table, message } from 'antd'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'

export default function Fixture() {

  const [teamData, setTeamData] = useState([])
  const shuffledArray = []
  const usedIndexes = []
  const [shuffledNewArray, setShuffledNewArray] = useState([]);
  // const [newArrayLength,setNewArrayLength] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const matches = [];

  const getTeamData = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/fixture/get-team")
    console.log(response.data.data);
    setTeamData(response.data.data)
    setShuffledNewArray(response.data.data)
    // setNewArrayLength(response.data.data)
    // console.log(newArrayLength.length);
  }


  const ShuffleData = () => {
    let i = 0;
    console.log(teamData);

    while (i < teamData.length) {

      const randomIndex = Math.floor(Math.random() * teamData.length)
      // console.log(randomIndex);

      if (!usedIndexes.includes(randomIndex)) {
        shuffledArray.push(teamData[randomIndex])
        usedIndexes.push(randomIndex)
        i++
      }

      // console.log(shuffledArray);
      // i++

    }
    setShuffledNewArray(shuffledArray)
    console.log(shuffledArray);


  }


  const shuffleDataStore = async () => {
    try {

      console.log("shuffled data : ", shuffledNewArray);
      const response = await axios.post("http://localhost:8080/api/v1/shuffle/newTeam", shuffledNewArray)
      // console.log(response.data.savedDocument._id);
      const shuffledDataId = response.data.savedDocument._id
      message.success(response.data.message)
      navigate("/final-fixture", { state: { shuffledDataId: shuffledDataId } })

    } catch (error) {
      message.error("Shuffle fixture save have an error")
    }
  }

  //  const handleSingleEliminate = async()=>{
  //   navigate("/test-fixture", { state: { teamsCount: newArrayLength.length } });
  //  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/delete/delte-team", { id: id })
      message.success(response.data.message)
      window.location.reload()

    } catch (error) {
      message.error("Delete have an error")

    }
  }


  useEffect(() => {
    getTeamData()
    ShuffleData();
  }, [])


  return (
    <>
      <SideBar>
        {/* <div>
             {shuffledNewArray.map((data)=>(
                <p>{data.TeamName}</p>
             ))}
         </div> */}


        <div className="fixtureContainer">

          <Table
            className="Table"
            columns={[
              {
                title: "Team Number",
                width: "10%",
                dataIndex: "teamNumber",
                render: (text, record, index) => (
                  <span key={index}>{index + 1}</span>
                )
              },
              {
                title: "Teams Name",
                dataIndex: "teamName",
                render: (text, record) => (
                  <span>{record.TeamName}</span>
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
                  <div>
                    <span><Button
                          type="primary"
                          style={{
                            backgroundColor: "#D94D34",
                            color: "#fff",
                            fontSize: "14px",
                            borderRadius: "5px",
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                          onClick={() => handleDelete(record._id)}
                        >
                          <DeleteOutlined />
                          Delete
                        </Button>
                    
                  </span>

                   
                      {/* <Button type="danger" onClick={() => handleDelete(record._id)}>delete</Button> */}
                    
                  </div>
                ),
              },

            ]}
            pagination={{
              style: {
                marginTop: "50px",
              },
              pageSize: 100,
            }}

            // Displaying data from the backend
            dataSource={shuffledNewArray}
          >

          </Table>

          <Flex gap="small" wrap="wrap">
            <Button 
            type="primary"  
            onClick={ShuffleData}>
               Suffle               
            </Button>
            <Button type="primary" onClick={shuffleDataStore} icon={<CheckOutlined />}>Save Shuffle</Button>
          </Flex>

          {/* <button onClick={ShuffleData}>Suffle</button> */}
          {/* <button onClick={shuffleDataStore}>Save Shuffle</button> */}
          {/* <button onClick={handleSingleEliminate}>Single Eliminate</button> */}


        </div>

      </SideBar>
    </>
  )
}

