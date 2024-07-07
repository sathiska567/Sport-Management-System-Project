import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { message } from "antd";

const UpcomingEvents = () => {
  const [allCreatedPointTableDetails, setAllCreatedPointTableDetails] =
    useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
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
      categories: [],
    },
    yaxis: {
      title: {
        text: "Number of Matches",
      },
      
    min: 0,
    },
    fill: {
      opacity: 1,
    },
    min: 0,
  });

  const getAllCreatedPointTable = async () => {
    try {
      const getAllResponse = await axios.get(
        "http://localhost:8080/api/v1/PointTableForm/getAllPointTableForm"
      );
      setAllCreatedPointTableDetails(
        getAllResponse.data.allCreatedPointTableDetails
      );
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllCreatedPointTable();
  }, []);

  useEffect(() => {
    if (allCreatedPointTableDetails.length > 0) {
      const latestData = allCreatedPointTableDetails.slice(-10); // get the 10 latest data

      const teamNames = latestData.map((detail) => detail.nameOfTheTeam);
      const wonMatches = latestData.map((detail) => detail.wonMatches);
      const lostMatches = latestData.map((detail) => detail.lostMatches);

      const maxValue = Math.max(...wonMatches, ...lostMatches);

      setSeries([
        {
          name: "Won Matches",
          data: wonMatches,
        },
        {
          name: "Lost Matches",
          data: lostMatches,
        },
      ]);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: teamNames,
        },
        yaxis: {
          ...prevOptions.yaxis,
          max: maxValue,
          forceNiceScale: true, // enable nice scaling
        },
      }));
    }
  }, [allCreatedPointTableDetails]);

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
