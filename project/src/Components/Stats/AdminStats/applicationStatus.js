import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApplicationStatus = () => {
  const [approveForms, setApproveForms] = useState([]);
  const [pendingForms, setPendingForms] = useState([]);

  const getApplicationWithCategory = async () => {
    try {
      const categoryResponse = await axios.get("http://localhost:8080/api/v1/admin/get-all-details-with-category");
      if (categoryResponse.data.success) {
        setApproveForms(categoryResponse.data.approveForms);
        setPendingForms(categoryResponse.data.pendingForms);
      } else {
        message.error("Error in fetching application with category");
      }
    } catch (error) {
      message.error("Error in fetching application with category");
    }
  };

  useEffect(() => {
    getApplicationWithCategory();
  }, []);

  const series = [approveForms.length, pendingForms.length];

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
    labels: ["Accepted", "Pending"],
    colors: ["#5CA6FF", "#ff4d4f"],
  };

  return <ReactApexChart options={options} series={series} type="donut" />;
};

export default ApplicationStatus;
