import React, { Suspense } from "react";
import ReactApexChart from "react-apexcharts";

const ApplicationStatus = ({ acceptedCount, rejectedCount }) => {
  const series = [acceptedCount, rejectedCount];

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
    labels: ["Accepted", "Rejected"],
    colors: ["#5CA6FF", "#ff4d4f"],
  };

  return (
    <Suspense fallback={<div>Loading Chart...</div>}>
      <ReactApexChart options={options} series={series} type="donut" />
    </Suspense>
  );
};

export default ApplicationStatus;
