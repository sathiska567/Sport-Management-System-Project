import React from "react";
import ReactApexChart from "react-apexcharts";

const MyPerformance = () => {
  const series = [
    {
      name: "Batting",
      data: [79, 52, 65, 23, 67, 42, 27, 32, 11, 65],
      color: "#ff7875",
    },
    {
      name: "Balling",
      data: [21, 13, 42, 54, 33, 22, 69, 70, 21, 82],
      color: "#95de64",
    },
    {
      name: "Fielding",
      data: [63, 18, 27, 51, 68, 26, 24, 53, 41, 27],
      color: "#85a5ff",
    },
  ];

  // Function to create chart options
  const createOptions = () => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Hide the toolbar entirely
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
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
        "Coach 1",
        "Coach 2",
        "Coach 3",
        "Coach 4",
        "Coach 5",
        "Coach 6",
        "Coach 7",
        "Coach 8",
        "Coach 9",
        "Coach 10",
      ],
    },
    yaxis: {
      title: {
        text: "Performance Percentage",
      },
      tickAmount: 10,
      labels: {
        formatter: function (value) {
          return value + "%"; // Add percentage symbol
        },
      },
    },
    fill: {
      opacity: 1,
    },
    min: 0,
    title: {
      text: "My Performance", // Chart title
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  });

  const options = createOptions();

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={260}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MyPerformance;
