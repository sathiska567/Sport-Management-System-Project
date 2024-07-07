import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

function AvailableCoaches(props) {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Available Coaches",
        data: [],
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
        text: "Available Coaches for Events",
        align: "center",
        style: { cursor: "pointer" },
        events: {
          click: () => navigate("/EventView"),
        },
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
        categories: [],
        title: {
          text: "Event Names",
        },
      },
      yaxis: {
        title: {
          text: "Number of Coaches",
        },
        min: 0,
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

  const getAvailableCoachForEvent = async () => {
    try {
      const eventAvailableCoach = await axios.get(
        "http://localhost:8080/api/v1/availability/get-event-available-coach"
      );
      console.log(eventAvailableCoach);

      const eventData = eventAvailableCoach.data.data;
      const latestEventData = eventData.slice(-10); // get the 10 latest data

      const eventNames = latestEventData.map(
        (event) => event.event.nameOfTheEvent
      );
      const availableCoaches = latestEventData.map(
        (event) => event.availableCoachCount
      );

      const maxValue = Math.max(...availableCoaches);

      setChartData((prevData) => ({
       ...prevData,
        series: [{...prevData.series[0], data: availableCoaches }],
        options: {
         ...prevData.options,
          xaxis: {...prevData.options.xaxis, categories: eventNames },
          yaxis: {
           ...prevData.options.yaxis,
            max: maxValue,
            forceNiceScale: true, // enable nice scaling
          },
        },
      }));
    } catch (error) {
      message.error("Error in fetching available coaches for events");
    }
  };

  useEffect(() => {
    getAvailableCoachForEvent();
  }, []);

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
}

export default AvailableCoaches;