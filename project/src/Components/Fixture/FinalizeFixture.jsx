import React, { useEffect, useState } from 'react'
import { Divider, Radio, Table } from 'antd';
import SideBar from '../DashboardSideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios';

export default function FinalizeFixture() {
  const location = useLocation([])
  const [finalShuffle, setFinalShuffle] = useState([])
  const [selectionType, setSelectionType] = useState('checkbox');


  console.log(location.state.shuffledDataId);


    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };
  

  const getFinalizeShuffle = async () => {
    try {
      const id = location.state.shuffledDataId
      const response = await axios.post("http://localhost:8080/api/v1/shuffle/newFixture", { id: id })
      //  console.log(response.data.data.newTeam);
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

   <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            // render: (text, record) => <a>{record.newTeam}</a>
          },

          {
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
          },
          
        ]}
        dataSource={finalShuffle}
      />
    </div>





      </SideBar>
    </>
  )
}
