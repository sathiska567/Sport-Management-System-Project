import React from "react";
import ReactApexChart from "react-apexcharts";

class currentUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Number of users", // Series name (used for tooltip/legend)
          data: [1, 2, 5, 3, 5], // Data values for each bar
        },
      ],
      options: {
        chart: {
          type: "bar", // Chart type: "bar" for vertical bars
          height: 250, // Chart height in pixels
          toolbar: {
            show: true, // Show chart toolbar (zoom, download, etc.)
          },
        },
        title: {
          // Main chart title options
          text: "Active Users",
          align: "center", // Title alignment
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: {
          // X-axis options
          categories: [
            "Event Organizers",
            "Team Managers",
            "Coaches",
            "Players",
            "Referees",
          ], // Category labels for the bars
          title: {
            text: "User Category", // X-axis title text
          },
        },
        yaxis: {
          // Y-axis options
          title: {
            text: "Number of Users", // Y-axis title text
          },
          tickAmount: 5, // Approximate number of ticks on the Y-axis
          labels: {
            // Y-axis label formatting
            formatter: function (val) {
              return Math.trunc(val); // Remove decimals from labels
            },
          },
        },
        plotOptions: {
          // Options for "bar" chart type
          bar: {
            borderRadius: 4, // Rounded corners for the bars
            dataLabels: {
              position: "top", // Position of the data labels (values)
            },
            columnWidth: "40%", // Bar width as a percentage of space
          },
        },
        dataLabels: {
          // Data label options (values on bars)
          enabled: true, // Show data labels
          offsetY: -20, // Vertical offset of labels
          style: {
            fontSize: "12px",
            colors: ["#304758"], // Color of the data label text
          },
        },
        fill: {
          // Bar fill color
          colors: ["#4096ff"], // Single color for all bars
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series} // Data for the chart
          type="bar"
          height={250}
        />
      </div>
    );
  }
}

export default currentUsers;
