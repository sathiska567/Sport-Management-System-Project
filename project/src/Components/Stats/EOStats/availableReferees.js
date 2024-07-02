import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import availableRefereesStyles from "./availableReferees.module.css";

function AvailableReferees(props) {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Available Referees",
        data: [1, 5, 3, 3, 5, 8, 0, 2, 8, 4],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#2f54eb"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Available Referee for Events",
        align: "center",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f0f5ff", "transparent"],
          opacity: 0.7,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [
          "Event 1",
          "Event 2",
          "Event 3",
          "Event 4",
          "Event 5",
          "Event 6",
          "Event 7",
          "Event 8",
          "Event 9",
          "Event 10",
        ],
        title: {
          text: "Event Names",
        },
      },
      yaxis: {
        title: {
          text: "Number of Referees",
        },
        min: 0,
        // max : 10
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  const handleTitleClick = () => {
    navigate("/EO-EventView");
  };

  return (
    <div id="chart" onClick={handleTitleClick} style={{cursor: "pointer"}}>
      <ReactApexChart
        id={availableRefereesStyles.chart}
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
}

export default AvailableReferees;
