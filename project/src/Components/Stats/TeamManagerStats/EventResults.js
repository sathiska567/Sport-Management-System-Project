import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { message } from "antd";

const UpcomingEvents = () => {
  const [allCreatedPointTableDetails, setAllCreatedPointTableDetails] = useState([]);
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
      tickAmount: 0,
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    min: 0,
  });

  const getAllCreatedPointTable = async () => {
    try {
      const getAllResponse = await axios.get("http://localhost:8080/api/v1/PointTableForm/getAllPointTableForm");
      setAllCreatedPointTableDetails(getAllResponse.data.allCreatedPointTableDetails);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllCreatedPointTable();
  }, []);

  useEffect(() => {
    if (allCreatedPointTableDetails.length > 0) {
      const teamNames = allCreatedPointTableDetails.map(detail => detail.nameOfTheTeam);
      const wonMatches = allCreatedPointTableDetails.map(detail => detail.wonMatches);
      const lostMatches = allCreatedPointTableDetails.map(detail => detail.lostMatches);

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

      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: teamNames,
        },
        yaxis: {
          ...prevOptions.yaxis,
          tickAmount: Math.max(...wonMatches, ...lostMatches) + 1,
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
