import React, { useEffect, useRef, useState } from 'react';
import { SingleElimination } from 'tournament-pairings';
import SideBar from '../DashboardSideBar/SideBar';
import { Button, Table } from 'antd';
import html2canvas from 'html2canvas';
import jspdf from "jspdf"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';

export default function SetFixtureRound() {
  const [fixture, setFixture] = useState([]);
  const pdfRef = useRef();
  const location = useLocation([]);
  const players = location.state.teamsCount;
  const [size, setSize] = useState('large');

  console.log(location);

const singleEliminate = async () => {
    const elimBracket = SingleElimination(players, 1 , false);
    setFixture(elimBracket);
    console.log(elimBracket);
  };


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


  useEffect(() => {
    singleEliminate();
  }, []);

  const handleScroll = (e) => {
    // Handle the scroll event if needed
    console.log("Scrolled:", e.target.scrollTop);
  };

  return (
    <>
      <SideBar>

  <div className="fixtureContainer">
        <div ref={pdfRef} style={{padding:"20px"}}>
        <Table
                className="Table"
                columns={[
                  {
                    title: "Round",
                    dataIndex: "round",
                    backgroundColor:"blue",
                    render: (text, record) =>(
                      <span style={{color:"red"}}>{record.round + " " + " "}</span>
                    )
                  },

                  {
                    title: "Match",
                    dataIndex: "match",
                    render: (text, record) => <span style={{color:"green"}}>{ record.match}</span>,
                  },

                  
                  {
                    title: "Team 01",
                    dataIndex: "team01",
                    render: (text, record) => <span>{record.player1 || "The Team That made it to this round - Team01"}</span>,
                  },

                  {
                    title: "Team 02",
                    dataIndex: "team02",
                    render: (text, record) => <span>{record.player2 || "The Team That made it to this round - Team02"}</span>,
                  },

                  {
                    title: "Next Round and Match",
                    dataIndex: "final-match",
                    render: (text, record) => (
                      <span>
                        {record.win ? (
                          <span style={{color:"blue"}}>{("NextRoud" + " " + " --> " + record.win.round)}<br/><br />{("Next Match" + " --> " +record.win.match)}</span>
                        ) : (
                          (
                            <p style={{ color: "red" }}>🏆 Final</p>
                          )
                          
                        )}
                      </span>
                    ),
                  },

                ]}
                pagination={{
                  style: {
                    marginTop: "50px",
                  },
                  pageSize: 100,
                }}

                // Displaying data from the backend
                dataSource={fixture}
              >

              </Table>
        </div>

              {/* <button onClick={handleDownload}>Download</button> */}

          <Button type="primary" onClick={handleDownload} icon={<DownloadOutlined />} size={size}>
            Download
          </Button>

  </div>

        
      </SideBar>
    </>
  );
}
