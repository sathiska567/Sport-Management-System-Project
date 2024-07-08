import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { message } from "antd";
import { min } from "moment/moment";

const MyPerformance = () => {
  const [currentPlayerId, setCurrentPlayerId] = useState("");
  const [battingReviews, setBattingReviews] = useState([]);
  const [bowlingReviews, setBowlingReviews] = useState([]);
  const [fieldingReviews, setFieldingReviews] = useState([]);
  const [coachNames, setCoachNames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to get current user data and reviews
  const currentUserData = async (page) => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the state with the current user ID
      setCurrentPlayerId(res.data.user._id);

      const playerReviewResponse = await axios.get(
        "http://localhost:8080/api/v1/review/get-overall-review-without-pagination",
      );

      console.log(playerReviewResponse);

      if (!playerReviewResponse.data.success) {
        throw new Error("Failed to fetch player reviews");
      }

      const batting = [];
      const bowling = [];
      const fielding = [];
      const coaches = [];

      for (let review of playerReviewResponse.data.data) {
        if (review.playerId === res.data.user._id) {
          batting.push(review.battingReview);
          bowling.push(review.bowlingReview);
          fielding.push(review.fieldingReview);
          coaches.push(review.reviewGivenCoachName);
        }
      }

      setBattingReviews(batting);
      setBowlingReviews(bowling);
      setFieldingReviews(fielding);
      setCoachNames(coaches);
    } catch (error) {
      message.error("Error fetching user data or reviews");
    }
  };

  useEffect(() => {
    currentUserData(currentPage);
  }, [currentPage]);

  const series = [
    {
      name: "Batting",
      data: battingReviews.slice(-10), // Show only the 10 latest data
      color: "#ff7875",
    },
    {
      name: "Bowling",
      data: bowlingReviews.slice(-10), // Show only the 10 latest data
      color: "#95de64",
    },
    {
      name: "Fielding",
      data: fieldingReviews.slice(-10), // Show only the 10 latest data
      color: "#85a5ff",
    },
  ];

  const maxValue = Math.max(...series.flatMap((serie) => serie.data)); // Calculate the maximum value

  // Function to create chart options
  const createOptions = () => ({
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Hide the toolbar entirely
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
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
      categories: coachNames.slice(-10), // Show only the 10 latest data
    },
    yaxis: {
      title: {
        text: "Performance Percentage",
      },
      min: 0,
      max: maxValue, // Set the maximum value
      forceNiceScale: true, // Enable nice scaling
      labels: {
        formatter: (value) => {
          return `${Math.round((value / 5) * 100)}%`; // Convert 0-5 to 0-100%
        },
      },
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: "My Performance", // Chart title
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  });

  const options = createOptions();

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
    </div>
  );
};

export default MyPerformance;
