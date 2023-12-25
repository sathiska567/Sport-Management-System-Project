// Importing necessary libraries and components
import "./UserApplication.css";
import React, { useState, useEffect } from "react";
import SideBar from "../DashboardSideBar/SideBar";
import {
  CloseSquareOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";


// Navbar component
const UserApplication = () => {
  // add data to back end
  // Start
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [dob, setDob] = useState();
  const [experience, setExperience] = useState();
  const [winningHistory, setWinningHistory] = useState();
  const [UserLocation, setUserLocation] = useState();
  const [userRole, setUserRole] = useState();
  const [userApplicationData, setUserApplicationData] = useState([]);

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const [getApproval , setGetApproval] = useState();

  const handleStatus = async(id,status)=>{

      try {

        // console.log(id,status);
      const res = await axios.post("http://localhost:8080/api/v1/admin/handle-status" , {id: id , status : status})
      
      message.success("Your Approval is Successfull")
      navigate("/UserValidation",{state:{status : status}})
  
      setGetApproval(res.data.UpdatedUser.status)
        
      } catch (error) {
         message.error("Error while occure the Handle status function");
      }
      
  }


  const handleUpdatedDetails = async(updatedId)=>{
       console.log(updatedId);
  }



  // End

  // Get the data from the backend
  // Start
  useEffect(() => {
    
  }, []);
  // End

  // JSX structure for the Navbar component
  return (
    <SideBar>
       {
        location.state.record.status === "pending" ?

        <div className="UserApplicationForm">
        <div className="UserApplicationFormHeader">
          <h3>Application</h3>
          {/* <a href="http://localhost:3000/AdminDashboard/UserValidation">
            <span className="UserApplicationCloseBtn">
              <CloseSquareOutlined />
            </span>
          </a> */}
        </div>
        <div className="UserApplicationFormApplication">
          <div>
            <label htmlFor="">First Name:</label>
  
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={location.state?.record?.FirstName}
              readOnly={true}
            />
           
            <label htmlFor="">Last Name:</label>
           
              <input
              type="text"
              id="lastName"
              name="lastName"
              value={location.state?.record?.LastName}
              readOnly={true}
            />
           
            <label htmlFor="">Email:</label>
            
              <input
              type="email"
              id="email"
              name="email"
              value={location.state?.record?.Email}
              readOnly={true}
            />
        
            <label htmlFor="">Age:</label>
              <input
              type="number"
              id="Age"
              name="Age"
              value={location.state?.record?.Age}
              readOnly={true}
            />
            
          
            <label htmlFor="">Experience:</label>
            <textarea
              id="experience"
              name="experience"
              rows="10"
              readOnly={true}
              value={location.state?.record?.Experience}
  
            ></textarea>
  
            <label htmlFor="">User Role:</label>
            <input
              type="UserRole"
              id="UserRole"
              name="UserRole"
              readOnly={true}
              value={location.state?.record?.UserRole}            
            />
  
            <div class="buttonSet">
               <div> 
              <button class="approve userAppBTn" onClick={()=>handleStatus(location.state?.record?._id,"Approve")}>
                <UserAddOutlined className="UserApplicationIcon" />
                Accept
              </button>
  
              <button class="pending userAppBTn">
                <ClockCircleOutlined className="UserApplicationIcon" />
                Pending
              </button>
              <button class="reject userAppBTn">
                <CloseCircleOutlined className="UserApplicationIcon" />
                Reject
              </button>
  
              </div>
           </div>
                
              
          </div>
         
        </div>
      </div>

      :


      <div className="UserApplicationForm">
      <div className="UserApplicationFormHeader">
        <h3>Editable Application</h3>
        {/* <a href="http://localhost:3000/AdminDashboard/UserValidation">
          <span className="UserApplicationCloseBtn">
            <CloseSquareOutlined />
          </span>
        </a> */}
      </div>
      <div className="UserApplicationFormApplication">
        <div>
          <label htmlFor="">First Name:</label>

          <input
            type="text"
            id="firstName"
            name="firstName"
            value={location.state?.record?.FirstName}
            readOnly={true}
          />
         
          <label htmlFor="">Last Name:</label>
         
            <input
            type="text"
            id="lastName"
            name="lastName"
            value={location.state?.record?.LastName}
            readOnly={true}
          />
         
          <label htmlFor="">Email:</label>
          
            <input
            type="email"
            id="email"
            name="email"
            value={location.state?.record?.Email}
            readOnly={true}
          />
      
          <label htmlFor="">Age:</label>
            <input
            type="number"
            id="Age"
            name="Age"
            value={location.state?.record?.Age}
            readOnly={true}
          />
          
        
          <label htmlFor="">Experience:</label>
          <textarea
            id="experience"
            name="experience"
            rows="10"
            readOnly={true}
            value={location.state?.record?.Experience}

          ></textarea>

          <label htmlFor="">User Role:</label>
          <input
            type="UserRole"
            id="UserRole"
            name="UserRole"
            readOnly={true}
            value={location.state?.record?.UserRole}            
          />

          <div class="buttonSet">
             <div> 
            <button class="approve userAppBTn" onClick={()=>handleUpdatedDetails(location.state?.record?._id)}>
              <UserAddOutlined className="UserApplicationIcon" />
              Update
            </button>

            <button class="pending userAppBTn" disabled>
              <ClockCircleOutlined className="UserApplicationIcon" />
              Button is dissable
            </button>
            <button class="reject userAppBTn" disabled>
              <CloseCircleOutlined className="UserApplicationIcon" />
              Button is dissable
            </button>

            </div>
         </div>
              
            
        </div>
       
      </div>
    </div>


       }
    </SideBar>
  );
};

// Exporting the Navbar component
export default UserApplication;
