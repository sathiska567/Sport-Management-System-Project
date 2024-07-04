import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import availableRefereesStyles from "./availableReferees.module.css";
import { message } from "antd";
import axios from "axios";

function AvailableReferees(props) {
  const navigate = useNavigate();
  const [createEvent, setCreateEvent] = useState([]);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Available Referees",
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
        text: "Available Referee for Events",
        align: "center",
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
          text: "Number of Referees",
        },
        min: 0,
        // max : 10
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

  const getCreatedEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event/get-all-events"
      );

      if (response.data.success) {
        setCreateEvent(response.data.data);
        const eventIds = response.data.data.map(event => event._id);
        const eventNames = response.data.data.map(event => event.nameOfTheEvent);

        const refereesPromises = eventIds.map(id =>
          axios.post("http://localhost:8080/api/v1/availability/event-available-referee", { eventId: id })
        );

        const refereesResponses = await Promise.all(refereesPromises);
        const availableReferees = refereesResponses.map(response => 
          response.data.success ? response.data.data.length : 0
        );

        setChartData(prevChartData => ({
          ...prevChartData,
          series: [
            {
              name: "Available Referees",
              data: availableReferees,
            },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              ...prevChartData.options.xaxis,
              categories: eventNames,
            },
          },
        }));
      }
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getCreatedEvents();
  }, []);

  const handleTitleClick = () => {
    navigate("/EO-EventView");
  };

  return (
    <div id="chart" onClick={handleTitleClick} style={{ cursor: "pointer" }}>
      <ReactApexChart
        id={availableRefereesStyles.chart}
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
}

export default AvailableReferees;
