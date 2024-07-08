import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { message } from "antd";

class CurrentUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventOrganizers: [],
      teamManagers: [],
      coaches: [],
      players: [],
      referees: [],
      series: [
        {
          name: "Number of users",
          data: [0, 0, 0, 0, 0],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 250,
          toolbar: {
            show: true,
          },
        },
        title: {
          text: "Active Users",
          align: "center",
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        xaxis: {
          categories: [
            "Event Organizers",
            "Team Managers",
            "Coaches",
            "Players",
            "Referees",
          ],
          title: {
            text: "User Category",
          },
        },
        yaxis: {
          title: {
            text: "Number of Users",
          },
          tickAmount: 5,
          labels: {
            formatter: function (val) {
              return Math.trunc(val);
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            dataLabels: {
              position: "top",
            },
            columnWidth: "40%",
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        fill: {
          colors: ["#4096ff"],
        },
      },
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = async () => {
    await Promise.all([
      this.getOnlyEventOrganizers(),
      this.getOnlyTeamManagers(),
      this.getOnlyCoach(),
      this.handleGetAllPlayerDetails(),
      this.getAllRefereeDetails(),
    ]);
    this.updateSeries();
  };

  getOnlyEventOrganizers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/event-organizer/details"
      );
      if (response.data.success) {
        this.setState({ eventOrganizers: response.data.data });
      }
    } catch (error) {
      message.error("Error fetching event organizers");
    }
  };

  getOnlyTeamManagers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/team-manager/details"
      );
      if (response.data.success) {
        this.setState({ teamManagers: response.data.data });
      }
    } catch (error) {
      message.error("Error fetching team managers");
    }
  };

  getOnlyCoach = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/coach/details");
      if (response.data.success) {
        this.setState({ coaches: response.data.data });
      }
    } catch (error) {
      message.error("Error fetching coaches");
    }
  };

  handleGetAllPlayerDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/player/player-details");
      if (response.data.success) {
        this.setState({ players: response.data.players });
      }
    } catch (error) {
      message.error("Error fetching players");
    }
  };

  getAllRefereeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/referee/referee-details");
      if (response.data.success) {
        this.setState({ referees: response.data.referee });
      }
    } catch (error) {
      message.error("Error fetching referees");
    }
  };

  updateSeries = () => {
    const { eventOrganizers, teamManagers, coaches, players, referees } = this.state;
    this.setState({
      series: [
        {
          name: "Number of users",
          data: [
            eventOrganizers.length,
            teamManagers.length,
            coaches.length,
            players.length,
            referees.length,
          ],
        },
      ],
    });
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={250}
        />
      </div>
    );
  }
}

export default CurrentUsers;
