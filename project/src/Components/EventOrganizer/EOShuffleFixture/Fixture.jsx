import React, { useEffect, useState } from 'react'
import SideBar from '../EOSideBar/EOSideBar'
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

  const [teamDetails, setTeamDetails] = useState([])

  // console.log(location);

  const getOneCreatedFixture = async () => {
    try {
      const id = location.state.id
      console.log("id : ", id);

      const response = await axios.post("http://localhost:8080/api/v1/event/get-one-fixture", { id })
      console.log(response.data.data.nameOfTheTeam);
      setTeamDetails(response.data.data.nameOfTheTeam)
      setTeamData(response.data.data.nameOfTheTeam)
      setShuffledNewArray(response.data.data.nameOfTheTeam)

    } catch (error) {
      message.error("Error in fetching data");
    }
  }



  // const getTeamData = async () => {
  //     const response = await axios.get("http://localhost:8080/api/v1/get/get-fixture")
  //     console.log("set team : " ,response.data.data);
  //     setTeamData(response.data.data)
  //     setShuffledNewArray(response.data.data)
  //     // setNewArrayLength(response.data.data)
  //     // // console.log(newArrayLength.length);
  //   }


  const ShuffleData = () => {
    let i = 0;
    console.log(teamDetails.length);
    // window.location.reload();

    while (i < teamDetails.length) {
      const randomIndex = Math.floor(Math.random() * teamDetails.length)
      // console.log(randomIndex);

      if(!usedIndexes.includes(randomIndex)){
        shuffledArray.push(teamDetails[randomIndex])
        usedIndexes.push(randomIndex)
        i++ ;
      }

    }

    console.log("shuffle array is : " , shuffledArray);
   setShuffledNewArray(shuffledArray)

    // while (i < teamDetails.length) {

    //   const randomIndex = Math.floor(Math.random() * teamDetails.length)
    //   // console.log(randomIndex);

    //   if (!usedIndexes.includes(randomIndex)) {
    //     shuffledArray.push(teamData[randomIndex])
    //     usedIndexes.push(randomIndex)
    //     i++
    //   }

    //   // console.log(shuffledArray);
    //   // i++

    // }
    // setShuffledNewArray(shuffledArray)
    // console.log("shuffle array is : " , shuffledArray);

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
    // getTeamData();
    ShuffleData();
    getOneCreatedFixture();
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
                width: "20%",
                dataIndex: "teamNumber",
                render: (text, record, index) => (
                  <span key={index}>{index + 1}</span>
                )
              },
              {
                title: "Teams Name",
                dataIndex: "teamName",
                render: (text, record, index) => (
                  <span key={index}>{record}</span>
                )
              },

              {
                title: "Event Time",
                dataIndex: "time",
                render: (text, record) => <span>8.30am</span>,
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

