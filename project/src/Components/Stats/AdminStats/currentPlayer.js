import { message } from "antd";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

const CurrentPlayer = () => {
  // State for chart data (example values)
  const [bowlerArray, setBowlerArray] = useState([]);
  const [batsmanArray, setBatsmanArray] = useState([]);
  const [wicketKeeperArray, setWicketKeeperArray] = useState([]);
  const [allRounderArray, setAllRounderArray] = useState([]);
  const [series, setSeries] = useState([]);

  const getPlayerCategory = async () => {
    try {
      const getCategory = await axios.get("http://localhost:8080/api/v1/player/category");
      // console.log(getCategory);
      setBowlerArray(getCategory.data.bowlerArray);
      setBatsmanArray(getCategory.data.battingArray);
      setWicketKeeperArray(getCategory.data.wicketKeeperArray);
      setAllRounderArray(getCategory.data.allRounderArray);
    } catch (error) {
      message.error("Error fetching player category");
    }
  };

  useEffect(() => {
    getPlayerCategory();
  }, []); // empty dependency array ensures it runs once when the component mounts

  useEffect(() => {
    setSeries([
      batsmanArray.length,
      bowlerArray.length,
      wicketKeeperArray.length,
      allRounderArray.length
    ]);
  }, [batsmanArray, bowlerArray, wicketKeeperArray, allRounderArray]);

  // State for chart options
  const [options] = useState({
    chart: {
      width: 380, // Initial chart width
      type: "pie", // Chart type is pie
    },
    labels: ["Batsman", "Ballers","Wicket Keepers", "All-Rounders"], // Labels for each segment
    colors: ["#1d39c4", "#597ef7", "#adc6ff","#00bfff"], // Colors for each segment
    responsive: [
      {
        breakpoint: 480, // Responsive breakpoint (screen width)
        options: {
          chart: {
            width: 200, // Chart width at this breakpoint
          },
          legend: {
            position: "bottom", // Legend position at this breakpoint
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      {/* Title styling */}
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "600",
          paddingBottom: "5px",
        }}
      >
        Current Players
      </div>

      {/* ReactApexChart component */}
      <ReactApexChart
        options={options} // Chart options (configuration)
        series={series} // Chart data
        type="pie" // Chart type (must match chart.type in options)
        width={340} // Chart width
      />
    </div>
  );
};

export default CurrentPlayer;
