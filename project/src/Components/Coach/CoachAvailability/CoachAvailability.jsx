// Importing necessary libraries and components
import "./CoachAvailability.css";
import React, { useState, useEffect } from "react";
import CoachSidebar from "../CoachSidebar/CoachSidebar.jsx";

import { Layout, Button, Input, Table, message, DatePicker } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructuring components from Ant Design's Layout
const { Content } = Layout;


// Navbar component
const CoachAvailability = () => {
  // Get data from back end

const dataSource = [
  {
    key: "1",
    eid: "EID001",
    eventName: "Event 1",
    eventDate: "2022-01-01",
    Actions: "Action 1",
  },
  {
    key: "2",
    eid: "EID002",
    eventName: "Event 2",
    eventDate: "2022-02-01",
    Actions: "Action 2",
  },
  {
    key: "3",
    eid: "EID003",
    eventName: "Event 3",
    eventDate: "2022-03-01",
    Actions: "Action 3",
  },
];
  
  const [eventName, setEventName] = useState("");
  const [Userlocation, setUserLocation] = useState("");
  const [userApplicationData, setUserApplicationData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation([]);

  // const ApplyingUser = async () => {
  //   try {
  //     const res = await axios.get(
  //       "http://localhost:8080/api/v1/admin/get-all-details"
  //     );
  //     // console.log(res.data.allApplyingDetails.status);

  //     if (res.data.success) {
  //       // setUserApplicationData(res.data.allApplyingDetails);
  //     } else {
  //       message("Error found in applying details section");
  //     }
  //   } catch (error) {
  //     message.error("Error while fetching data");
  //   }
  // };

  // const NavigateDetailsPage = async (record) => {
  //   navigate("/Applying-Details", { state: { record: record } });
  // };

  // const handleDelete = async (record) => {
  //   console.log(record.Email);

  //   try {
  //     const deletedUser = await axios.delete(
  //       "http://localhost:8080/api/v1/admin/delete-details",
  //       {
  //         data: { deletedUserId: record._id, email: record.Email },
  //       }
  //     );

  //     if (deletedUser.data.success) {
  //       message.success(deletedUser.data.message);
  //       window.location.reload();
  //       navigate("/UserValidation");
  //     }
  //   } catch (error) {
  //     message.error("Error while occuring handle delete section");
  //   }
  // };

  // useEffect(() => {
  //   ApplyingUser();
  // }, []);

  // Filter userApplicationData based on userRole and Userlocation
const filteredData = dataSource.filter((data) => {
  return (
    (!eventName ||
      data.eventName.toLowerCase().includes(eventName.toLowerCase())) &&
    (!Userlocation ||
      data.eventDate.toLowerCase().includes(Userlocation.toLowerCase()))
  );
});

  const handleCheckboxChange = (e, record) => {
    if (e.target.checked) {
      // Checkbox is checked
      console.log("Checked:", record);
    } else {
      // Checkbox is unchecked
      console.log("Unchecked:", record);
    }
  };


  // JSX structure for the Navbar component
  return (
    <CoachSidebar>
      <Layout className="ant-layout-sider-children">
        {/* Main content layout */}
        <Layout>
          {/* Content section with statistics */}
          <Content
            className="ant-layout-content"
            style={{
              margin: "16px",
              padding: 24,
              minHeight: 180,
              height: "100%",
              background: "whitesmoke",
            }}
          >
            {/* Search section */}
            <div className="search">
              <Input.Search
                className="searchInputName"
                placeholder="Search Event Name..."
                styles={{
                  marginBottom: "8",
                }}
                onSearch={(value) => setEventName(value)}
                onChange={(e) => setEventName(e.target.value)}
              />
              <DatePicker
                className="searchInputDate"
                style={{ marginBottom: 8 }}
                onChange={(date, dateString) => setUserLocation(dateString)}
              />
            </div>
            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "EID",
                    dataIndex: "eid",
                    align: "center",
                    // render: (text, record) => <span>{record.UserRole}</span>,
                  },

                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                    align: "center",
                    // render: (text, record) => (
                    //   <span>{record.FirstName + " " + record.LastName}</span>
                    // ),
                  },

                  {
                    title: "Event Date",
                    dataIndex: "eventDate",
                    key: "eventDate",
                    align: "center",
                    // render: (text, record) => <span>{record.Experience}</span>,
                  },

                  {
                    title: "Actions",
                    dataIndex: "Actions",
                    key: "Actions",
                    align: "center",
                    render: (_, record) => (
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e, record)}
                      />
                    ),
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the backend
                dataSource={filteredData}
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </CoachSidebar>
  );
};

// Exporting the Navbar component
export default CoachAvailability;
