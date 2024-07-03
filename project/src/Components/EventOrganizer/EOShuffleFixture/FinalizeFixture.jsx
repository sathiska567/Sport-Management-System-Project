import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Divider, Radio, Table, Button } from "antd";
import SideBar from "../EOSideBar/EOSideBar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./Fixture.css";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { DownloadOutlined, PoweroffOutlined } from "@ant-design/icons";

export default function FinalizeFixture() {
  const location = useLocation([]);
  const [finalShuffle, setFinalShuffle] = useState([]);
  const [length, setlength] = useState(0);
  const [selectionType, setSelectionType] = useState("checkbox");
  const pdfRef = useRef();
  const i = 0;
  const j = i + 2;
  const navigate = useNavigate();
  const [newArrayLength, setNewArrayLength] = useState([]);
  const [size, setSize] = useState("large");

  console.log(location.state.shuffledDataId);

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const getFinalizeShuffle = async () => {
    try {
      const id = location.state.shuffledDataId;

      console.log(id);
      const response = await axios.post(
        "http://localhost:8080/api/v1/shuffle/newFixture",
        { id: id }
      );
      console.log(response.data.data.shuffleTeam);

      setFinalShuffle(response.data.data.shuffleTeam);
      // // setShuffledNewArray(response.data.data)
      setNewArrayLength(response.data.data.shuffleTeam);
      // setFinalShuffle(response.data.data.newTeam);
      console.log(newArrayLength.length);
    } catch (error) {
      message.error("Error Occure in Finalize Fixture");
    }
  };

  useEffect(() => {
    getFinalizeShuffle();
  }, []);

  // handle download
  const handleDownload = async () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // convert data as images
      const pdf = new jspdf("p", "mm", "a4", true); // use to generate pdf p - portrait mode(can use l - landscape mode), mm - dimension(can pass different dimensions), a4 - sheet format(can pass a1, a2..), true - optimization in pdf(reduce file size)
      
      const margin = 10; // Define a margin size (in mm)
      
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = margin + (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 50; // Adjust this if you want a margin above the image
      
      // Add title with blue color
      // pdf.setFontSize(16);
      // pdf.setTextColor(0, 0, 255); // set text color to blue (RGB: 0, 0, 255)    
      // pdf.text("This Pdf About Team Name And Team Number", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
      

      pdf.setFillColor(200, 200, 255); // Light blue background color (RGB: 200, 200, 255)

      // pdf.rect(x, y, width, height, style)
      // 'F' stands for "filled", meaning the rectangle will be filled with the current fill color.
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F'); // Draw filled rectangle


      // Add the image with margins
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      
      // Save the PDF
      pdf.save("Fixture.pdf");
    });
    
    
    
  };

  // handle single eliminate
  const handleSingleEliminate = async () => {
    navigate("/test-fixture", {
      state: { teamsCount: newArrayLength.length, finalShuffle: finalShuffle },
    });
  };

  return (
    <>
      <SideBar>
        <div className="fixtureContainer" ref={pdfRef}>
          <Table
            className="Table"
            columns={[
              {
                title: "Team Number",
                // width: "20%",
                dataIndex: "teamNumber",
                render: (text, record, index) => (
                  <span
                    key={index}
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      // fontWeight: "bold",
                    }}
                  >
                    {"Team Number " + (index + 1)}
                  </span>
                ),
              },
              {
                title: "Teams Name",
                dataIndex: "teamName",
                render: (text, record) => (
                  <span
                    style={{
                      color: "green",
                      fontFamily: "sans-serif",
                      // fontWeight: "bold",
                    }}
                  >
                    {record}
                  </span>
                ),
              },
            ]}
            pagination={{
              pageSize: 6,
            }}
            // Displaying data from the backend
            dataSource={finalShuffle}
          ></Table>
        </div>

        {/* {finalShuffle.map((data)=>(
          <p>{data}</p>
      ))} */}

        <div className="TbaleBUttons">
          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            onClick={handleDownload}
            icon={<DownloadOutlined />}
            size={size}
            className="ViewTableButtons"
          >
            Download
          </Button>

          <Button
            type="primary"
            style={{ marginLeft: "20px" }}
            onClick={handleSingleEliminate}
            size={size}
            className="ViewTableButtons"
          >
            Single Eliminate
          </Button>
          {/* <button onClick={handleDownload}>Download</button> */}
          {/* <button onClick={handleSingleEliminate}>Single Eliminate</button> */}
        </div>
      </SideBar>
    </>
  );
}
