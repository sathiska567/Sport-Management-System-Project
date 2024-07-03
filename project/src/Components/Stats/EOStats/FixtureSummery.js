import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const CurrentPlayer = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [series] = useState([55, 44, 13]); // State to hold data series for the chart
  const labels = ["Created", "Viewed", "Deleted"]; // Labels for the pie chart slices
  const routes = {
    Created: "/EOCreatedEventView",
    Viewed: "/eo-view-fixture",
    Deleted: "/eo-view-fixture", // Add a route for "Deleted" label
  };

  const [options] = useState({
    chart: {
      width: 380,
      type: "pie",
      events: {
        click: function (event, chartContext, config) {
          const label = labels[config.dataPointIndex];
          navigate(routes[label]);
        },
      },
    },
    labels, // Use the labels array
    colors: ["#1d39c4", "#85a5ff", "#d6e4ff"], // Colors for the pie chart slices
    responsive: [
      {
        breakpoint: 480, // Responsive design settings for smaller screens
        options: {
          chart: {
            width: 200, // Smaller chart width on small screens
          },
          legend: {
            position: "bottom", // Move legend to the bottom on small screens
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "600",
          paddingBottom: "5px",
        }}
      >
        Fixture Summary
      </div>
      <ReactApexChart
        options={options} // Pass the chart options
        series={series} // Pass the data series for the chart
        type="pie" // Chart type
        width={320} // Chart width
      />
    </div>
  );
};

export default CurrentPlayer;
