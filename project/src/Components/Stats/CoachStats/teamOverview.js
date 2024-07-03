import React from "react";
import ReactApexChart from "react-apexcharts";

const teamOverview = ({ createdCount, rejectedCount }) => {
  const series = [createdCount, rejectedCount];

  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    grid: {
      padding: {
        bottom: -80,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Created", "Cancelled"],
    colors: ["#2f54eb", "#adc6ff"],
  };

  return <ReactApexChart options={options} series={series} type="donut" createdCount={12} rejectedCount={5}/>;
};

export default teamOverview;
