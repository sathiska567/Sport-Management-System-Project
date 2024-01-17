import React, { useEffect, useRef, useState } from 'react'
import { Checkbox, Divider, Radio, Table, Button } from 'antd';
import SideBar from '../DashboardSideBar/SideBar'
import { useLocation } from 'react-router-dom'
import { message } from 'antd';
import axios from 'axios';
import "./Fixture.css"
import html2canvas from 'html2canvas';
import jspdf from "jspdf"


export default function FinalizeFixture() {
  const location = useLocation([])
  const [finalShuffle, setFinalShuffle] = useState([])
  const [selectionType, setSelectionType] = useState('checkbox');
  const pdfRef = useRef();


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


  const handleDownload = async()=>{
      
     const input = pdfRef.current;

     html2canvas(input).then((canvas)=>{
        const imgData = canvas.toDataURL('image/png')   //convert data as images
        const pdf = new jspdf('p', 'mm', 'a4' , true);    //use to generate pdf p - portrait mode(can use l - landscape mode) , mm - dimension(can pass difference dimension) , a4 - sheet formate(can pass a1,a2..) , true - optimization in pdf(reduce file size)
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth , pdfHeight/imgHeight)
        const imgX = (pdfWidth - imgWidth*ratio)/2;
        const imgY = 30;
        pdf.addImage(imgData,"PNG",imgX,imgY,imgWidth*ratio , imgHeight*ratio)
        pdf.save("Fixture.pdf")


     })

  }  

  return (
    <>
      <SideBar>

      <div className="fixtureContainer" ref={pdfRef}>
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

                ]}
                pagination={{
                  style: {
                    marginTop: "50px",
                  },
                  pageSize: 100,
                }}

                // Displaying data from the backend
                dataSource={finalShuffle}
              >

              </Table>
            </div>

      <div>
            <button onClick={handleDownload}>Download</button>

            </div>


      </SideBar>
    </>
  )
}
