// Importing necessary libraries and components
import "./UserApplication.css";
import React, { useState, useEffect } from "react";
import SideBar from "../DashboardSideBar/SideBar";
import {
  CloseSquareOutlined,
  EditOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Form } from "antd";

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

  const location = useLocation([]);
  // console.log("dashboad : " , location);

  const navigate = useNavigate();
  const [getApproval, setGetApproval] = useState();
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newAge, setNewAge] = useState();
  const [distric, setNewDistric] = useState();
  const [applyingUserEmail,setApplyingUserEmail] = useState("");
  // const location = useLocation();

// handle user status
const handleStatus = async (id, status) => {
    try {
      // console.log(id,status);
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/handle-status",
        { id: id, status: status}
      );

      message.success("Your Approval is Successful");
      navigate("/UserValidation", { state: { status: status } });
      setGetApproval(res.data.UpdatedUser.status);

    } catch (error) {
      message.error("Error while occure the Handle status function");
    }

    //  ----------------------------------------------------------------------------------------------
    try {

     console.log(location.state.record.UserRole);
      const aproveResponse = await axios.post("http://localhost:8080/api/v1/aprove/aprove-user-model",{email:location.state.record.Email,userRole:location.state.record.UserRole})
      console.log("approve response : " ,aproveResponse);

    } catch (error) {
      console.log("error found in gettign aproveResponse");
    }
  };

// handle updated function

  const handleUpdatedDetails = async (updatedId) => {
    try {
      const UpdatedUser = await axios.patch(
        "http://localhost:8080/api/v1/admin/update-details",
        {
          updatedId: updatedId,
          FirstName: FirstName,
          LastName: LastName,
          Email: newEmail,
          Age: newAge,
          Distric: distric,
        }
      );
      console.log(UpdatedUser.data.success);
      if (UpdatedUser.data.success) {
        message.success("Successfull Updated");
        navigate("/UserValidation");
      }
    } catch (error) {
      message.error("Error while occuring updated section");
    }
  };

  // handle pending function
  const handlePending = async () => {
    try {
      message.success("Pending added successfull");
      navigate("/UserValidation");
    } catch (error) {
      message.error(error);
    }
  };

// handle reject function
  const handleReject = async (deletedUserId,email) => {
    try {
      console.log(deletedUserId,email);

      const deletedUserResponse = await axios.delete(
        "http://localhost:8080/api/v1/admin/delete-details",
        {
          data: { deletedUserId: deletedUserId , email:email},
        }
      );

      console.log(deletedUserResponse);

      if (deletedUserResponse.data.success) {
        message.success(deletedUserResponse.data.message);
        navigate("/UserValidation");
      } else {
        message.error(deletedUserResponse.data.message);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

// const getCurrentLoginUserDetails = async () => {
//     try {
//       const CurrentUserResponse = await axios.get("http://localhost:8080/api/v1/user/getCurrentUser",{
//          headers:{
//            Authorization:`Bearer ${localStorage.getItem("token")}`
//          }
//       })
//       // Handle the response or do something with the data
//       console.log(CurrentUserResponse);
  
//     } catch (error) {
//       // Handle errors
//       console.error(error);
//     }
//   };

  // End

  // Get the data from the backend
  // Start
  useEffect(() => {
    // getCurrentLoginUserDetails()
  }, []);
  // End

  // JSX structure for the Navbar component
  return (
    <SideBar>
      {location.state.record.status === "pending" ? (
        <div className="UserApplicationForm">
          <div
            style={{
              backgroundColor: "#15295E",
            }}
            className="UserApplicationFormHeader"
          >
            <h3
              style={{
                color: "white",
              }}
            >
              Application
            </h3>
            <a href="/UserValidation">
              <CloseSquareOutlined
                style={{
                  color: "white",
                  fontSize: "20px",
                  marginRight: "10%",
                }}
              />
            </a>

            {/* <a href="http://localhost:3000/AdminDashboard/UserValidation">
            <span className="UserApplicationCloseBtn">
              <CloseSquareOutlined />
            </span>
          </a> */}
          </div>
          <div className="UserApplicationFormApplication">
            <div>
              <Form
                layout="verticle"
                className="m-3"
                style={{
                  padding: "50px",
                  backgroundColor: "white",
                }}
              >
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

                <label htmlFor="">Distric:</label>
                <input
                  type="text"
                  id="Distric"
                  name="Distric"
                  value={location.state?.record?.Distric}
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
                    <button
                      class="approve userAppBTn"
                      onClick={() =>
                        handleStatus(location.state?.record?._id, "Approve")
                      }
                    >
                      <UserAddOutlined className="UserApplicationIcon" />
                      Accept
                    </button>

                    <button
                      class="pending userAppBTn"
                      onClick={() => handlePending()}
                    >
                      <ClockCircleOutlined className="UserApplicationIcon" />
                      Pending
                    </button>
                    <button
                      class="reject userAppBTn"
                      onClick={() => handleReject(location.state?.record?._id , location.state?.record?.Email)}
                    >
                      <CloseCircleOutlined className="UserApplicationIcon" />
                      Reject
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        // Update form
        <Form
          style={{
            margin: "auto",
            width: "75%",
          }}
          layout="verticle"
          onFinish={(values) =>
            handleUpdatedDetails(location.state?.record?._id, values)
          }
        >
          <div
            style={{
            }}
            className="UserApplicationForm"
          >
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="UserApplicationFormHeader"
            >
              <h3
                style={{
                  color: "white",
                  letterSpacing: "1px",
                  fontWeight: "500",
                }}
              >
                Application
              </h3>
              <a href="/UserValidation">
                <CloseSquareOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "10%",
                  }}
                />
              </a>
              {/* <a href="http://localhost:3000/AdminDashboard/UserValidation">
          <span className="UserApplicationCloseBtn">
            <CloseSquareOutlined />
          </span>
        </a> */}
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "50px",
              }}
              className="UserApplicationFormApplication"
            >
              <div>
                <label htmlFor="">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  //  value={firstName} // Assuming firstName is the state variable
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="">Email:</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setNewEmail(e.target.value)}
                />

                <label htmlFor="">Age:</label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  onChange={(e) => setNewAge(e.target.value)}
                />

                <label htmlFor="">Distric:</label>
                <input
                  type="Distric"
                  id="Distric"
                  name="Distric"
                  onChange={(e) => setNewDistric(e.target.value)}
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
                    <button
                      class="approve userAppBTn"
                      style={{ backgroundColor: "#E4A11B", width: "115px" }}
                      onClick={() =>
                        handleUpdatedDetails(location.state?.record?._id)
                      }
                    >
                      <EditOutlined className="UserApplicationIcon" />
                      Update
                    </button>

                    <button
                      style={{ width: "115px" }}
                      class="pending userAppBTn"
                      disabled
                    >
                      <ClockCircleOutlined className="UserApplicationIcon" />
                      Pending
                    </button>
                    <button
                      style={{ backgroundColor: "#DC4C64", width: "115px" }}
                      class="reject userAppBTn"
                      disabled
                    >
                      <CloseCircleOutlined className="UserApplicationIcon" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </SideBar>
  );
};

// Exporting the Navbar component
export default UserApplication;
