import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const MyPerformance = () => {
  // Use useState to manage series and options
  const [series, setSeries] = useState([
    {
      name: "Won Matches",
      data: [4, 5, 1,2, 2, 3, 4, 6, 2, 3, 3],
    },
    {
      name: "Lost Matches",
      data: [3, 3, 5, 8, 1, 7, 4, 5, 6, 3, 3],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "text",
      categories: [
        "Team 1",
        "Team 2",
        "Team 3",
        "Team 4",
        "Team 5",
        "Team 6",
        "Team 7",
        "Team 8",
        "Team 9",
        "Team 10",
      ],
      title: {
        text: "Team Names",
      },
    },
    yaxis: {
      title: {
        text: "Matches",
      },
      // Calculate tickAmount dynamically
      // Use Math.max to get the highest number from all series
      // Use flatMap to combine data from all series
      // Add 1 to ensure the maximum value is included
      // Example: how function works with series data [4, 5, 1, 7, 2, 3, 4, 6, 2, 3, 3]
      // Math.max(...series.flatMap((serie) => serie.data)) + 1
      // Math.max(4, 5, 1, 7, 2, 3, 4, 6, 2, 3, 3) + 1
      // Math.max(7) + 1
      // 7 + 1
      // 8
      tickAmount: 6,
      labels: {
        formatter: function (value) {
          return value; // Display the value directly
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#2f54eb", "#85a5ff"],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options} // Use options from state
          series={series} // Use series from state
          type="bar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MyPerformance;
