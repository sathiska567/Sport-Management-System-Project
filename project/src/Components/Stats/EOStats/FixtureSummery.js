import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const CurrentPlayer = () => {
  const navigate = useNavigate();

  const [createdFixture, setCreatedFixture] = useState([]);
  const [fixtureLength, setFixtureLength] = useState(0);
  const [series, setSeries] = useState([0, 0]); // Initialize with default values
  const labels = ["Created", "Viewed"];

  useEffect(() => {
    const getFixtureData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/get/get-fixture"
        );

        const viewFixtureResponse = await axios.get("http://localhost:8080/api/v1/shuffle/get-all-shuffleTeam")        

        const data = response.data.data;
        const fixtureLength = viewFixtureResponse.data.dataLength
        setCreatedFixture(data);
        setFixtureLength(data.length);
        setSeries([data.length, fixtureLength]); // Update series based on fetched data
      } catch (error) {
        message.error("Error fetching fixture data");
      }
    };

    getFixtureData();
  }, []);

  const routes = {
    Created: "/EOCreatedEventView",
    Viewed: "/eo-view-fixture",
    Deleted: "/eo-view-fixture",
  };

  const options = {
    chart: {
      width: 380,
      type: "pie",
      events: {
        click: function (event, chartContext, config) {
          const label = labels[config.dataPointIndex];
          navigate(routes[label]);
        },
      },
    },
    labels,
    colors: ["#1d39c4", "#85a5ff", "#d6e4ff"],
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
  };

  return (
    <div id="chart">
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "600",
          paddingBottom: "5px",
        }}
      >
        Fixture Summary
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={320}
      />
    </div>
  );
};

export default CurrentPlayer;
