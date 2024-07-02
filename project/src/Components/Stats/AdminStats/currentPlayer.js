import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CurrentPlayer = () => {
  // State for chart data (example values)
  const [series] = useState([44, 55, 13]);

  // State for chart options
  const [options] = useState({
    chart: {
      width: 380, // Initial chart width
      type: "pie", // Chart type is pie
    },
    labels: ["Batsman", "Ballers", "All-Rounders"], // Labels for each segment
    colors: ["#1d39c4", "#597ef7", "#adc6ff"], // Colors for each segment
    responsive: [
      {
        breakpoint: 480, // Responsive breakpoint (screen width)
        options: {
          chart: {
            width: 200, // Chart width at this breakpoint
          },
          legend: {
            position: "bottom", // Legend position at this breakpoint
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      {/* Title styling */}
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "600",
          paddingBottom: "5px",
        }}
      >
        Current Players
      </div>

      {/* ReactApexChart component */}
      <ReactApexChart
        options={options} // Chart options (configuration)
        series={series} // Chart data
        type="pie" // Chart type (must match chart.type in options)
        width={340} // Chart width
      />
    </div>
  );
};

export default CurrentPlayer;
