// Importing necessary libraries and components
import "./UserApplicationTable.css";
import React, {useState, useEffect} from "react";
import SideBar from "../DashboardSideBar/SideBar";
import {
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Layout, Button, Input, Table, message } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;

// Navbar component
const UserApplicationTable = () => {
  // Get data from back end
  // Start
  const [userRole, setUserRole] = useState([]);
  const [Userlocation, setUserLocation] = useState([]);
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()

 const ApplyingUser = async()=>{
     
        try {

        const res = await axios.get("http://localhost:8080/api/v1/admin/get-all-details")
        console.log(res.data.allApplyingDetails);
        setUserApplicationData(res.data.allApplyingDetails)
          
        if(res.data.success){
          setUserApplicationData(res.data.allApplyingDetails)
        }

        else{
          message("Error found in applying details section")
        }

          
        } catch (error) {

          message.error("Error while fetching data")
          
        }
        
 }


 const NavigateDetailsPage = async(record)=>{
      navigate("/Applying-Details",{state:{record : record}})
 }


  useEffect(() => {
    ApplyingUser();
  }, []);

  // End

  // JSX structure for the Navbar component
  return (
    <SideBar>
    <Layout className="ant-layout-sider-children">
      {/* Main content layout */}
      <Layout>
        {/* Content section with statistics */}
        <Content
          className="ant-layout-content"
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
            height: "100%",
            background: "#E9F9FF",
          }}
        >
          {/* Search section */}
          <div className="search">
            <Input.Search
              placeholder="Search User Roll..."
              styles={{
                marginBottom: "8",
              }}
              onSearch={(value) => setUserRole(value)}
              onChange={(e) => setUserRole(e.target.value)}
            />
            <Input.Search
              placeholder="Search District..."
              styles={{
                marginBottom: "8",
              }}
              onSearch={(value) => setUserLocation(value)}
              onChange={(e) => setUserLocation(e.target.value)}
            />
          </div>
          {/* Table section */}
          <div className="tableContainer">
          <Table
  columns={[
    {
      title: "User Id",
      dataIndex: "uid",
      render: (text, record) => (
        <span>
          {console.log(record._id)}
          {record._id}
        </span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) => (
        <span>
          {console.log(record.userName)}
          {record.userName}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (text, record) => (
        <span>
            <Button
              type="primary"
              style={{
                backgroundColor: "#05AD1B",
                color: "#fff",
                fontSize: "16px",
                marginRight: "10px",
              }}

              onClick={() => NavigateDetailsPage(record)}
            >
              <UserOutlined />
              View
            </Button>
          
          <Button
            type="primary"
            style={{
              backgroundColor: "#D94D34",
              color: "#fff",
              fontSize: "16px",
            }}
          >
            <DeleteOutlined />
            Delete
          </Button>
        </span>
      ),
    },
  ]}
  pagination={{
    style: {
      marginTop: "50px",
    },
    pageSize: 5,
  }}
  // Displaying data from the backend
  dataSource={userApplicationData}
></Table>

            
          </div>
        </Content>
      </Layout>
    </Layout>
    </SideBar>
  );
};

// Exporting the Navbar component
export default UserApplicationTable;
