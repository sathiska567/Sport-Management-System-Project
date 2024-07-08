import React, { useEffect, useState } from "react";
import adminStatStyles from "./AdminStats.module.css";
import DashboardSideBar from "../../DashboardSideBar/SideBar";
import { Card, message, Statistic } from "antd";
import CurrentPlayer from "./currentPlayer";
import PendingUsersTable from "./PendingUsersTable";
import { useNavigate } from "react-router-dom";
import CurrentUser from "./currentUsers";
import ApplicationStatus from "./applicationStatus";
import CountUp from "react-countup";
import axios from "axios";

const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    style={{
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#000000",
    }}
  />
);
const AdminStats = () => {
  const [pendingBowlers , setPendingBowlers] = useState([])
  const [pendingBatters , setPendingBatters] = useState([])
  const [pendingKeepers , setPendingKeepers] = useState([])
  const [pendingAllRounders , setPendingAllRounders] = useState([])


  const navigate = useNavigate();
  const handleTitleClick = () => {
    navigate("/UserValidation");
  };

  const pendingPlayerCategory = async()=>{
    try {
      const pendingCategoryResponse = await axios.get("http://localhost:8080/api/v1/player/pending-category")
      console.log(pendingCategoryResponse.data)
      setPendingBowlers(pendingCategoryResponse.data.PendingBowlerCategory)
      setPendingBatters(pendingCategoryResponse.data.PendingBatsmanCategory)
      setPendingKeepers(pendingCategoryResponse.data.PendingKeeperCategory)
      setPendingAllRounders(pendingCategoryResponse.data.PendingAllRounderCategory)

    } catch (error) {
      message.error(error)
    }
  }

  useEffect(()=>{
    pendingPlayerCategory()
  },[])

  return (
    <DashboardSideBar>
      <div className="admin-stats">
        <div className={adminStatStyles.divContainer}>
          <div className={adminStatStyles.firstRow}>
            <div className={adminStatStyles.firstCard}>
              <Card bordered={false} className={adminStatStyles.card1}>
                <CurrentUser />
              </Card>
            </div>
            <div className={adminStatStyles.secondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    onClick={handleTitleClick}
                    style={{ cursor: "pointer" }}
                  >
                    Pending Users
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "300",
                        marginLeft: "10px",
                      }}
                    >
                      [ User Category | No of Pending Users]
                    </span>
                  </span>
                }
                className={adminStatStyles.card2}
              >
                <div className={adminStatStyles.pendingUsers}>
                  <PendingUsersTable />
                </div>
              </Card>
            </div>
          </div>

          <div className={adminStatStyles.secondRow}>
            <div className={adminStatStyles.SfirstCard}>
              {/* Content for Player Overview card */}
              <Card className={adminStatStyles.card3}>
                <CurrentPlayer />
              </Card>
            </div>
            <div className={adminStatStyles.SsecondCard}>
              <Card
                bordered={false}
                title={
                  <span
                    onClick={handleTitleClick}
                    style={{ cursor: "pointer" }}
                  >
                    Pending Players
                  </span>
                }
                className={adminStatStyles.card4}
              >
                {/* Content for Current Users card */}
                <div className={adminStatStyles.pendingPlayers}>
                  <Statistic
                    title="Batsman"
                    value={pendingBatters.length}
                    formatter={formatter}
                    className={adminStatStyles.ppStat}
                  />
                  <Statistic
                    title="Ballers"
                    value={pendingBowlers.length}
                    formatter={formatter}
                    className={adminStatStyles.ppStat}
                  />
                  <Statistic
                    title="Keepers"
                    value={pendingKeepers.length}
                    formatter={formatter}
                    className={adminStatStyles.ppStat}
                  />
                  <Statistic
                    title="All-Rounders"
                    value={pendingAllRounders.length}
                    formatter={formatter}
                    className={adminStatStyles.ppStat}
                  />
                </div>
              </Card>
            </div>

            <div className={adminStatStyles.SthirdCard}>
              <Card
                bordered={false}
                className={adminStatStyles.card5}
                title="Application Status"
                style={{ textAlign: "center" }}
              >
                {/* Use ApplicationStatus (uppercase) here  */}
                <ApplicationStatus acceptedCount={12} rejectedCount={5} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardSideBar>
  );
};

export default AdminStats;
