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

export default function Fixture() {

 const [teamData , setTeamData] = useState([])
 
 const getTeamData = async()=>{
        const response = await axios.get("http://localhost:8080/api/v1/fixture/get-team")
        console.log(response.data.data);
        setTeamData(response.data.data)
 }

 useEffect(()=>{
        getTeamData()
 },[])


  return (
    <>
     <SideBar>
         <div>
             <h1>Fixture</h1>
         </div>
     </SideBar>
    </>
  )
}

