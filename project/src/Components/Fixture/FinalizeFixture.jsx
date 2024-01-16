import React, { useEffect, useState } from 'react'
import { Divider, Radio, Table } from 'antd';
import SideBar from '../DashboardSideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios';
import "./Fixture.css"


export default function FinalizeFixture() {
  const location = useLocation([])
  const [finalShuffle, setFinalShuffle] = useState([])
  const [selectionType, setSelectionType] = useState('checkbox');



      // // rowSelection object indicates the need for row selection
      // const rowSelection = {
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      //   },
      //   getCheckboxProps: (record) => ({
      //     disabled: record.name === 'Disabled User',
      //     // Column configuration not to be checked
      //     name: record.name,
      //   }),
      // };


  console.log(location.state.shuffledDataId);
  

  const getFinalizeShuffle = async () => {
    try {
      const id = location.state.shuffledDataId
      const response = await axios.post("http://localhost:8080/api/v1/shuffle/newFixture", { id: id })
       console.log(response.data.data);
      setFinalShuffle(response.data.data.newTeam);


    } catch (error) {
      message.error("Error Occure in Finalize Fixture")
    }

  }

  useEffect(() => {
    getFinalizeShuffle()
  }, [])

  

  return (
    <>
      <SideBar>

      <div className="fixtureContainer">
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
      </Radio.Group>

              <Table
                className="Table"
                columns={[
                  {
                    title: "Teams Name",
                    dataIndex: "teamName",
                    render: (text, record) => <span>{record}</span>,
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
                    title: "Location",
                    dataIndex: "location",
                    
                  },

                ]}
                pagination={{
                  style: {
                    marginTop: "50px",
                  },
                  pageSize: 5,
                }}
                // Displaying data from the backend
                dataSource={finalShuffle}
              ></Table>
            </div>

      </SideBar>
    </>
  )
}
