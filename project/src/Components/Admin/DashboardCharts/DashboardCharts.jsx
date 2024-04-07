import React from "react";
import "./DashboardCharts.css";
import AdminDashBoard from "../AdminSideBar/AdminSideBar";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

const DashboardCharts = () => {
  return (
    <div>
      <AdminDashBoard>
        <div className="Stats flex-container">
          <div className="dataCard revenueCard">
            <Line
              className="chart"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                ],
                datasets: [
                  {
                    label: "Created Events",
                    data: [10, 20, 15, 35],
                    borderColor: "green",
                    fill: false,
                  },
                  {
                    label: "Cancelled Events",
                    data: [5, 10, 5, 26],
                    borderColor: "red",
                    fill: false,
                  },
                  {
                    label: "Delayed Events",
                    data: [7, 14, 21, 28,],
                    borderColor: "blue",
                    fill: false,
                  },
                ],
              }}
            />
          </div>
          <div className="dataCard customerCard">
            <Bar
              data={{
                labels: ["Requested", "Approved", "Pending", "Deleted"],
                datasets: [
                  {
                    label: "Number of Positions",
                    data: [150, 100, 75, 50],
                    backgroundColor: ["red", "blue", "green", "orange"],
                  },
                ],
              }}
            />
          </div>
          <div className="dataCard categoryCard">
            <Doughnut
              data={{
                labels: [
                  "Event Organizers",
                  "Players",
                  "Team Managers",
                  "Coaches",
                  "Referees",
                ],
                datasets: [
                  {
                    data: [10, 20, 30, 25, 15],
                    backgroundColor: [
                      "red",
                      "blue",
                      "green",
                      "yellow",
                      "purple",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </AdminDashBoard>
    </div>
  );
};

export default DashboardCharts;
