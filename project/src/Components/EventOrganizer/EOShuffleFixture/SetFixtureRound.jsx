import React, { useEffect, useRef, useState } from "react";
import { SingleElimination } from "tournament-pairings";
import SideBar from "../EOSideBar/EOSideBar";
import { Button, Table } from "antd";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import "./SetFixtureRound.css";

export default function SetFixtureRound() {
  const [fixture, setFixture] = useState([]);
  const pdfRef = useRef();
  const location = useLocation([]);
  const players = location.state.teamsCount;
  const [size, setSize] = useState("large");
  const [finalShuffle, setFinalShuffle] = useState([]);

  console.log(location);

  // handle single eliminate npm function
  const singleEliminate = async () => {
    const elimBracket = SingleElimination(players, 1, false);
    setFixture(elimBracket);
    console.log(elimBracket);
  };

  // handle download function
  const handleDownload = async () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // convert data as images
      const pdf = new jspdf("p", "mm", "a4", true); // use to generate pdf p - portrait mode (can use l - landscape mode), mm - dimension (can pass different dimensions), a4 - sheet format (can pass a1, a2..), true - optimization in pdf (reduce file size)
      
      const margin = 10; // Define a margin size (in mm)
      
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = margin + (pdfWidth - imgWidth * ratio) / 2;
      const imgY = margin + 30;

      pdf.setFillColor(200, 200, 255); // Light blue background color (RGB: 200, 200, 255)

      // pdf.rect(x, y, width, height, style)
      // 'F' stands for "filled", meaning the rectangle will be filled with the current fill color.
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F'); // Draw filled rectangle


      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("Fixture.pdf");
    });
  };

  useEffect(() => {
    setFinalShuffle(location.state.finalShuffle);
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
          <div ref={pdfRef} style={{ padding: "20px" }}>
            <Table
              className="Table"
              columns={[
                {
                  title: "Round",
                  dataIndex: "round",
                  backgroundColor: "blue",
                  render: (text, record) => (
                    <span style={{ color: "red" }}>
                      {record.round + " " + "Round " + " "}
                    </span>
                  ),
                },

                {
                  title: "Match",
                  dataIndex: "match",
                  render: (text, record) => (
                    <span style={{ color: "green" }}>
                      {"Match " + record.match}
                    </span>
                  ),
                },

                {
                  title: "Team Group 01",
                  dataIndex: "team01",
                  render: (text, record) => (
                    <span>
                      {finalShuffle[record.player1 - 1] ||
                        " That made it to this round"}
                    </span>
                  ),
                },

                {
                  title: "Team Group 02",
                  dataIndex: "team02",
                  render: (text, record) => (
                    <span>
                      {finalShuffle[record.player2 - 1] ||
                        " That made it to this round"}
                    </span>
                  ),
                },

                {
                  title: "Next Round",
                  dataIndex: "final-match",
                  render: (text, record) => (
                    <span>
                      {record.win ? (
                        <span>
                          <span style={{ color: "red" }}>
                            {" Goes To => " + "Round " +  record.win.round}
                          </span>
                        </span>
                      ) : (
                        <p style={{ color: "red" }}>🏆 Final</p>
                      )}
                    </span>
                  ),
                },
                {
                  title: "Next Match",
                  dataIndex: "final-match",
                  render: (text, record) => (
                    <span>
                      {record.win ? (
                        <span>
                          <span style={{ color: "green" }}>
                            { " Goes To => " + "Match " + record.win.match}
                          </span>
                        </span>
                      ) : (
                        <p style={{ color: "red" }}>🏆 Final</p>
                      )}
                    </span>
                  ),
                },
              ]}
              pagination={{
                style: {
                  marginTop: "50px",
                },
                pageSize: 6,
              }}
              // Displaying data from the backend
              dataSource={fixture}
            ></Table>
          </div>
          <div className="testFixtureButtonContainer">
            <Button
              className="testFixtureButton"
              type="primary"
              onClick={handleDownload}
              icon={<DownloadOutlined />}
              size={size}
            >
              Download
            </Button>
          </div>
        </div>
      </SideBar>
    </>
  );
}
