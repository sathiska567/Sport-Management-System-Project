import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const MyPerformance = () => {
  const [allCreatedPointTableDetails, setAllCreatedPointTableDetails] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "text",
      categories: [],
      title: {
        text: "Team Names",
      },
    },
    yaxis: {
      title: {
        text: "Matches",
      },
      tickAmount: 0,
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#2f54eb", "#85a5ff"],
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
      // Map the fetched data to extract team names, won matches, and lost matches
      const teamNames = allCreatedPointTableDetails.map(detail => detail.nameOfTheTeam);
      const wonMatches = allCreatedPointTableDetails.map(detail => detail.wonMatches);
      const lostMatches = allCreatedPointTableDetails.map(detail => detail.lostMatches);

      // Update series data
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

      // Update options with new categories and tickAmount
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
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MyPerformance;
