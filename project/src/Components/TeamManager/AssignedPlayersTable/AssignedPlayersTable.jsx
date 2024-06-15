// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import "./AssignedPlayersTable.css";
import TeamManagerSideBar from "../TeamManagerSideBar/TeamManagerSideBar";

import { Layout, Input, Table, Modal, message } from "antd";
import axios from "axios";




// Destructuring components from Ant Design's Layout
const { Content } = Layout;



// Navbar component
const AssignedPlayersTable = () => {




  const [searchedText, setSearchedText] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const [dataSource, setDataSource] = useState([{}]);

  const [data, setData] = useState([]);




  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchedText(searchText);

    const filteredData = data.filter((item) =>
      item.playerName.toLowerCase().includes(searchedText)
    );

    if (!searchText) {
        setDataSource(data);
        return;
    }

    setDataSource(filteredData);
  };



  // table
  const getFetchData = async () => {
    let data = await fetch(
      "http://localhost:8080/api/v1/assignedPlayersTable/get-assignePlayers"
    );
    data = await data.json();
    console.log(data);
    if (data.success) {
      setDataSource(data.data);
      setData(data.data)
    }
  };


  useEffect(() => {
    axios.defaults.baseURL =
      "http://localhost:8080/api/v1/assignedPlayersTable";
    getFetchData();
  }, []);





  // delete button
  const handleDelete = async (id) => {
    try {


      const confirmed = await new Promise((resolve, reject) => {
        Modal.confirm({
          title: "Are you sure you want to delete this member record?",
          okText: "Yes",
          okType: "danger",
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });

      if (confirmed) {


        console.log(id);
        const response = await axios.post("/delete-assignPlayersstatus", { id: id });

        if (response.data.success) {
          message.success("Deletion is successful");
          window.location.reload();
        }
      }
    } catch (error) {


      console.error("Error deleting member:", error);

      message.error("An error occurred while deleting the member");
    }
  };





  //Assign button
  const handleAssign = async (eventId, playerId, status) => {

    try {

      const confirmed = await new Promise((resolve, reject) => {
        Modal.confirm({
          // title: Are you sure you want to assign "${status}" to this member?,
          okText: "Yes",
          okType: "primary",
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });

      if (confirmed) {
        if (!status) {

          await axios
            .post("/change-assignPlayersstatus", { playerId, eventId, task: "assign" }) // Adjust the endpoint URL accordingly
            .then((res) => {
              if (res.data.success) {
                // setIsAssigned(true)
                message.success("Status assigned successfully");
                // window.location.reload();
                // window.location.reload();
              } else {
                message.success("error");
              }
            })
            .catch((err) => {
              message.success("error");
            });
        } else {
          await axios
            .post("/change-assignPlayersstatus", {
              playerId,
              eventId,
              task: "unassign",
            }) // Adjust the endpoint URL accordingly
            .then((res) => {
              if (res.data.success) {
                // setIsAssigned(true)
                message.success("Unassigned successfully");
                // window.location.reload();
                // window.location.reload();
              } else {
                message.success("error");
              }
            })
            .catch((err) => {
              message.success("error");
            });
        }


        getFetchData();
        
        // if (response.data.success) {
        //   setIsAssigned(true)
        //   message.success("Status assigned successfully");
        //   window.location.reload();
        // }
      }
    } catch (error) {
      console.error("Error assigning status:", error);
    }
  };



  // JSX structure for the Navbar component
  return (


    <TeamManagerSideBar>

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
              <div
                className="searchSub"
                style={{ display: "flex", width: "100%", marginBottom: "8px" }}
              >

                <Input.Search
                  placeholder="Search Coach Name..."
                  style={{ marginBottom: 8 }}
                  //  onSearch={(value) => {
                  //   setSearchedText(value)
                  //  }}
                  onChange={handleSearch}
                />
              </div>


              <div
                className="searchSub"
                style={{ display: "flex", width: "100%" }}
              ></div>
            </div>


            {/* Table section */}
            <div className="tableContainer">
              <Table
                className="Table"
                columns={[
                  {
                    title: "ID",
                    dataIndex: "playerId",
                    key: "playerId",
                    render: (text, record) => <span>{record.playerId}</span>,
                  },


                  {
                    title: "Player Name",
                    dataIndex: "playerName",
                    key: "playerName",
                    filterValue: ["s"], // Set filterValue directly to searchText
                    onFilter: (value, record) => {
                      return record.name.includes(value);
                    },
                  },


                  {
                    title: "Event Name",
                    dataIndex: "eventName",
                    key: "eventName",
                  },


                  {
                    title: "Actions",
                    render: (text, record) => {
                      return (
                        <>
                          <button
                            className="assignBtn"
                            onClick={() =>
                              handleAssign(
                                record.eventId,
                                record.playerId,
                                record.status
                              )
                            }
                            // disabled={!record.status && true}
                          >
                            {record.status ? "Assigned" : "Assign"}
                          </button>

                          
                          <button
                            className="assignBtnDelete"
                            onClick={() => handleDelete(record.playerId)}
                          >
                            Delete
                          </button>
                        </>
                      );
                      // console.log(record);
                    },
                  },
                ]}
                pagination={{
                  style: {
                    marginTop: "10px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the frontend
                dataSource={dataSource} // Use filteredData instead of sampleData
              ></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TeamManagerSideBar>
  );
};

// Exporting the Navbar component
export default AssignedPlayersTable;