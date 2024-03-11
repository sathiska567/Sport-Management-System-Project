import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import SideBar from "../DashboardSideBar/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApplyPosition.css";
import { UserAddOutlined } from "@ant-design/icons";

const ApplyPosition = () => {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAge, setNewAge] = useState();
  const [userRole, setUserRole] = useState();
  const [experience, setExperience] = useState();
  const [distric, setDistric] = useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

//   // GET CURRENT USER DATA
const currentUserData = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/v1/user/getCurrentUser",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

  if(res.data.user.messages.length > 0){
    // console.log(res.data.user.messages[0]);
    message.success(res.data.user.messages[0])
    // console.log(res.data.user);
  }

  console.log(res.data.user);
  setNewEmail(res.data.user.email)
  } catch (error) {
    message.error("Error have inside the Get currentUserData function");
  }
};



  // handle position registration
  const handleSubmit = async (values) => {
    console.log(newAge);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/apply-position",

        {
          FirstName: FirstName,
          LastName: LastName,
          Email: newEmail,
          Age: newAge,
          UserRole: userRole,
          Experience: experience,
          Distric: distric,
        }
      );

      message.success("Position Applying successfull");
      navigate("/dashboad");
      
    } catch (error) {
      message.error(error);
    }
  };


useEffect(()=>{
  currentUserData()
},[])

  return (
    <div>
      <SideBar>
        <div className="UserApplicationForm">
          <div
            className="UserApplicationFormHeader"
            style={{
              backgroundColor: "#15295E",
            }}
          >
            <h3
              style={{
                color: "white",
              }}
            >
              Application
            </h3>
          </div>

          <div className="UserApplicationFormApplication">
            <Form
              layout="verticle"
              onFinish={handleSubmit}
              className="m-3"
              style={{
                padding: "50px",
                backgroundColor: "white",
              }}
            >
              <label htmlFor="">First Name:</label>
              <input
                type="text"
                id="FistName"
                name="FirstName"
                className="formInput"
                onChange={(e) => setFirstName(e.target.value)}                
              />
              <p style={{color:"red",fontSize:"12px"}}>{FirstName ? " " : "Please Enter Your First Name ! "}</p>


              <label htmlFor="">Last Name:</label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                className="formInput"
                onChange={(e) => setLastName(e.target.value)}
              />
              <p style={{color:"red",fontSize:"12px"}}>{LastName ? " " : "Please Enter Your Last Name ! "}</p>


              <label htmlFor="">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="formInput"
                // onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
              />
              <p style={{color:"red",fontSize:"12px"}}>{newEmail ? " " : "Please Enter Your Email ! "}</p>


              <label htmlFor="">Age:</label>
              <input
                type="number"
                id="Age"
                name="Age"
                className="formInput"
                onChange={(e) => setNewAge(e.target.value)}
              />
           <p style={{color:"red",fontSize:"12px"}}>{newAge ? " " : "Please Enter Your Email ! "}</p>


              <label htmlFor="">UserRole:</label>
              <input
                type="text"
                id="UserRole"
                name="UserRole"
                className="formInput"
                onChange={(e) => setUserRole(e.target.value)}
              />
        <p style={{color:"red",fontSize:"12px"}}>{userRole ? " " : "Please Enter Your Email ! "}</p>


              <label htmlFor="">Distric:</label>
              <input
                type="text"
                id="Distric"
                name="Distric"
                className="formInput"
                onChange={(e) => setDistric(e.target.value)}
              />
              <p style={{color:"red",fontSize:"12px"}}>{distric ? " " : "Please Enter Your Email ! "}</p>


              <label htmlFor="">Experience:</label>
              <textarea
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                }}
                id="experience"
                name="experience"
                rows="10"
                onChange={(e) => setExperience(e.target.value)}
              ></textarea>
                <p style={{color:"red",fontSize:"12px"}}>{experience ? " " : "Please Enter Your Email ! "}</p>

              <div className="buttonSet">
                <button className="approve userAppBTn">
                  <UserAddOutlined className="UserApplicationIcon" />
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default ApplyPosition;
