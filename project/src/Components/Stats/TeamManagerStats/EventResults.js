import React from "react";
import ReactApexChart from "react-apexcharts";

const UpcomingEvents = () => {
  const series = [
    {
      name: "Won Matches",
      data: [7, 5, 6, 2, 6, 4, 2, 3, 1,6],
      color: "#597ef7",
    },
    {
      name: "Lost Matches",
      data: [2, 1, 4, 5, 3, 2, 6, 7, 2,8],
      color: "#adc6ff",
    },
  ];

  // Function to create chart options
  const createOptions = () => ({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
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
    },
    yaxis: {
      title: {
        text: "Number of Matches",
      },
      tickAmount: Math.max(...series.flatMap((serie) => serie.data)) + 1,
      labels: {
        formatter: function (value) {
          return value; // Display the value directly
        },
      },
    },
    fill: {
      opacity: 1,
    },
    min: 0,
  });

  const options = createOptions();

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default UpcomingEvents;
