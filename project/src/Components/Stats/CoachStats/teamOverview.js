import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { message } from 'antd';
import axios from "axios";

const TeamOverview = ({ createdCount, rejectedCount }) => {
   const [availableAllCoach , setAvailableAllCoach] = useState([]);
   const [allCoaches , setAllCoaches] = useState([]);

  const series = [availableAllCoach.length, allCoaches.length];


  const getAllCoaches = async()=>{
    try {
      const allPlayerResponse = await axios.get("http://localhost:8080/api/v1/coach/details")
        // console.log(allPlayerResponse.data.data);
        setAllCoaches(allPlayerResponse.data.data)
    } catch (error) {
      message.error('Something went wrong');
    }
  }


  const getAllAvailableCoaches = async () => {
    try {
      const availableCoachResponse = await axios.get("http://localhost:8080/api/v1/availability/get-available-coach");
      // console.log(availableCoachResponse.data.data);
      setAvailableAllCoach(availableCoachResponse.data.data)
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllAvailableCoaches();
    getAllCoaches()
  }, []);

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
    labels: ["Available", "All Coaches"],
    colors: ["#2f54eb", "#adc6ff"],
  };

  return <ReactApexChart options={options} series={series} type="donut" />;
};

export default TeamOverview;
