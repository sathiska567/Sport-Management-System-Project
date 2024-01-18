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
import { message } from 'antd'

export default function Fixture() {

        const [teamData , setTeamData] = useState([])
        const shuffledArray = []
        const usedIndexes = []
        const [shuffledNewArray, setShuffledNewArray] = useState([]);
        const [newArray,setNewArray] = useState([])
        const navigate = useNavigate()
        const location = useLocation()
        const matches = [];
 
 const getTeamData = async()=>{
        const response = await axios.get("http://localhost:8080/api/v1/fixture/get-team")
        // console.log(response.data.data);
        setTeamData(response.data.data)
        setShuffledNewArray(response.data.data)
 }


 const ShuffleData = () => {
            let i = 0;
            console.log(teamData);
                
            while (i < teamData.length) {
                
            const randomIndex = Math.floor(Math.random() * teamData.length)
            // console.log(randomIndex);
                
             if(!usedIndexes.includes(randomIndex)){
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

const shuffleDataStore = async()=>{
        try {

        console.log("shuffled data : " ,shuffledNewArray);
        const response = await axios.post("http://localhost:8080/api/v1/shuffle/newTeam",shuffledNewArray)
        // console.log(response.data.savedDocument._id);
        const shuffledDataId = response.data.savedDocument._id
        message.success(response.data.message)
        navigate("/final-fixture",{state:{shuffledDataId:shuffledDataId}})

        } catch (error) {
          message.error("Shuffle fixture save have an error")
        }      
      }


const singleEliminate = async () => {
  const matches = [];
 
  const shuffleArrayLength = shuffledNewArray.length;
  console.log(shuffleArrayLength);
    
  if (shuffleArrayLength % 2 === 0) {
    console.log("hello");
  } else {
    const newLength = shuffleArrayLength - 1;
    const finalValueIndex = newLength + 1;
    console.log(newLength);
    console.log(finalValueIndex);

    for (let i = 0; i < newLength ; i ++ ) {  // 8
      const matchNumber = `Match${i + 1}`;
      matches.push({
        [matchNumber]: {
          team1: shuffledNewArray[i],
          team2: shuffledNewArray[i + 1],
        },
      });
    }

    const j = 1;
    matches.push({
      [`Match${newLength-j}`]: {
        team1: shuffledNewArray[newLength],
        team2: "Match 01 Winning team",
        
      },
      
    });
  }


  console.log(matches);


        // for (let i = 0; i < shuffledNewArray.length; i += 2) {
        //   const matchNumber = `Match${i / 2 + 1}`;
        //   matches.push({
        //     [matchNumber]: {
        //       team1: shuffledNewArray[i],
        //       team2: shuffledNewArray[i + 1],
        //     },
        //   });
        // }
    
        
      };


useEffect(()=>{
        getTeamData()
        ShuffleData();
 },[])


  return (
    <>
     <SideBar>
         <div>
             {shuffledNewArray.map((data)=>(
                <p>{data.TeamName}</p>
             ))}
         </div>
         
         <button onClick={ShuffleData}>Suffle</button><br />
         <button onClick={shuffleDataStore}>Save</button><br />
         <button onClick={singleEliminate}>Single Eliminate</button>
     </SideBar>
    </>
  )
}

