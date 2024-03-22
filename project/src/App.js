import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserApplication from "./Components/UserApplication/UserApplication.jsx";
import UserApplicationTable from "./Components/UserApplicationTable/UserApplicationTable.jsx";
import StatCards from "./Components/StatCard/StatCards.jsx";
import ForgotPassword from "./Components/Login/ForgetPassword.jsx";
import OTPPage from "./Components/Login/OTPPage.jsx";
import ResetPassword from "./Components/Login/CreateNewPassword.jsx";
import ApplyPosition from "./Components/ApplyPosition/ApplyPosition.jsx";
import NewLogin from "./Components/Login/Login.jsx";
import PublicRoute from "./Components/PublicRoute/PublicRoute.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.js";
import SignUp from "./Components/Login/SignUp.jsx";
import Fixture from "./Components/EventOrganizer/EOShuffleFixture/Fixture.jsx";
import FinalizeFixture from "./Components/EventOrganizer/EOShuffleFixture/FinalizeFixture.jsx";
import FinalizeFixtureUpdate from "./Components/EventOrganizer/EOShuffleFixture/FinalizeFixtureUpdate.jsx";
import FinalUpdate from "./Components/EventOrganizer/EOShuffleFixture/FinalUpdate.jsx";
import SetFixtureRound from "./Components/EventOrganizer/EOShuffleFixture/SetFixtureRound.jsx";
import AddTeam from "./Components/EventOrganizer/EOShuffleFixture/AddTeam.jsx";
import EOStats from "./Components/EventOrganizer/EOStats/EOStats.jsx";
import CreateFixture from "./Components/EventOrganizer/EOCreateFixture/EOCreateFixture.jsx";
import AssignStaff from "./Components/EventOrganizer/EOAssignStaff/EOAssignStaff.jsx";
import CreateEvent from "./Components/EventOrganizer/EOCreateEvent/EOCreateEventForm.jsx";
import EditEvent from "./Components/EventOrganizer/EOEditEvent/EOEditEvent.jsx";
import EditEventForm from "./Components/EventOrganizer/EOEditEvent/EOEditEventForm.jsx";
import EOProfile from "./Components/EventOrganizer/EOProfile/EOProfile.jsx";
import CoachAvailability from "./Components/Coach/CoachAvailability/CoachAvailability.jsx";
import CoachStats from "./Components/Coach/CoachStats/CoachStats.jsx";
//import CoachCreateTeam from "./Components/Coach/CoachCreateTeam/CreateTeam.jsx";
//import CoachEditTeam from "./Components/Coach/CoachEditTeam/EditTeam.jsx";
import CoachReviewPlayers from "./Components/Coach/CoachReviewPlayers/CoachReviewPlayers.jsx";
import CoachProfile from "./Components/Coach/CoachProfile/CoachProfile.jsx";
import EOViewFixture from "./Components/EventOrganizer/EOViewFixture/EOViewFixture.jsx";
import CoachReviewForm from "./Components/Coach/CoachReviewPlayers/CoachReviewForm.jsx";
import EOBracket from "./Components/EventOrganizer/EOBracket/EOBracket.jsx";
import PlayerStats from "./Components/PlayerComponents/PlayerStats/PlayerStats.jsx";
import PlayerAvailability from "./Components/PlayerComponents/PlayerAvailability/PlayerAvailability.jsx";
import PlayerReviews from "./Components/PlayerComponents/PlayerReviews/PlayerReviews.jsx";
import PlayerSearch from "./Components/PlayerComponents/PlayerSearch/PlayerSearch.jsx";
import PlayerProfile from "./Components/PlayerComponents/PlayerProfile/PlayerProfile.jsx";
import PlayerMatches from "./Components/PlayerComponents/PlayerMatches/PlayerMatches.jsx";
import RefereeStats from "./Components/Referee/RefereeStats/RefereeStats.jsx";
import RefereeAvailability from "./Components/Referee/RefereeAvailability/RefereeAvailability.jsx";
import RefereeMatches from "./Components/Referee/RefereeMatches/RefereeMatches.jsx";
import RefereeProfile from "./Components/Referee/RefereeProfile/RefereeProfile.jsx";
import TeamManagerStats from "./Components/TeamManager/TeamManagerStats/TeamManagerStats.jsx";
import TeamManagerCreateTeam from "./Components/TeamManager/TeamManagerCreateTeam/TeamManagerCreateTeam.jsx";
import TeamManagerAssignMembersTable from "./Components/TeamManager/TeamManagerAssignMembers/TeamManagerAssignMembersTable.jsx";
import TeamManagerAssignMembersCoach from "./Components/TeamManager/TeamManagerAssignMembers/TeamManagerAssignMembersCoach.jsx";
import TeamManagerAssignMembersPlayer from "./Components/TeamManager/TeamManagerAssignMembers/TeamManagerAssignMembersPlayer.jsx";
import TeamManagerProfile from "./Components/TeamManager/TeamManagerProfile/TeamManagerProfile.jsx";
import TeamManagerAssign from "./Components/TeamManager/TeamManagerAssign/TeamManagerAssign.jsx";
import AssignTab from "./Components/assignTab/AssignTab.jsx";

import TournamentBracket from "./Components/EventOrganizer/EOBracket/Bracket.jsx";
import CoachCreateTeam from "./Components/Coach/CoachCreateTeam/CreateTeam.jsx";
import SelectPlayers from "./Components/Coach/CoachCreateTeam/SelectPlayers.jsx"
import CoachEditTeam from "./Components/Coach/CoachEditTeam/EditTeam.jsx";
import UpdateTeam from "./Components/Coach/CoachEditTeam/UpdateTeam.jsx"


function App() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn, "login");

  return (
    <BrowserRouter>
      <Routes>
        {/* user login and registration */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* <Route 
      path="/" 
      element={<Login />} 
      /> */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <NewLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/otp-reset-pass"
          element={
            <PublicRoute>
              <OTPPage />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-pass"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Apply position routes */}
        <Route
          path="/apply-position"
          element={
            <ProtectedRoute>
              <ApplyPosition />
            </ProtectedRoute>
          }
        />

        {/* after login routes */}
        <Route
          path="/dashboad"
          element={
            <ProtectedRoute>
              <StatCards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/UserValidation"
          element={
            <ProtectedRoute>
              <UserApplicationTable />
            </ProtectedRoute>
          }
        />
        <Route
          // Need to change after add table of application
          path="/Applying-Details"
          element={
            <ProtectedRoute>
              <UserApplication />
            </ProtectedRoute>
          }
        />
        <Route
          // Need to change after add table of application
          path="/shuffle-fixture"
          element={
            <ProtectedRoute>
              <Fixture />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/final-fixture"
          element={
            <ProtectedRoute>
              <FinalizeFixture />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/update-fixture"
          element={
            <ProtectedRoute>
              <FinalizeFixtureUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/final-update-fixture"
          element={
            <ProtectedRoute>
              <FinalUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/test-fixture"
          element={
            <ProtectedRoute>
              <SetFixtureRound />
            </ProtectedRoute>
          }
        />

        <Route
          // Need to change after add table of application
          path="/addTeam"
          element={
            <ProtectedRoute>
              <AddTeam />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/create-fixture"
          element={
            <ProtectedRoute>
              <CreateFixture />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/eo-stats"
          element={
            <ProtectedRoute>
              <EOStats />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/eo-assign-staff"
          element={
            <ProtectedRoute>
              <AssignStaff />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/eo-create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/eo-edit-event"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/eo-edit-event-form"
          element={
            <ProtectedRoute>
              <EditEventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/eo-profile"
          element={
            <ProtectedRoute>
              <EOProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/coach-availability"
          element={
            <ProtectedRoute>
              <CoachAvailability />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/coach-stats"
          element={
            <ProtectedRoute>
              <CoachStats />
            </ProtectedRoute>
          }
        />
      </Routes>

   
      <Routes>
        <Route
          path="/coach-review-players"
          element={
            <ProtectedRoute>
              <CoachReviewPlayers />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/coach-profile"
          element={
            <ProtectedRoute>
              <CoachProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/eo-view-fixture"
          element={
            <ProtectedRoute>
              <EOViewFixture />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/coach-review-form"
          element={
            <ProtectedRoute>
              <CoachReviewForm />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/eo-bracket"
          element={
            <ProtectedRoute>
              <EOBracket />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-stats"
          element={
            <ProtectedRoute>
              <PlayerStats />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-availability"
          element={
            <ProtectedRoute>
              <PlayerAvailability />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-reviews"
          element={
            <ProtectedRoute>
              <PlayerReviews />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-search"
          element={
            <ProtectedRoute>
              <PlayerSearch />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-profile"
          element={
            <ProtectedRoute>
              <PlayerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/player-matches"
          element={
            <ProtectedRoute>
              <PlayerMatches />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/referee-stats"
          element={
            <ProtectedRoute>
              <RefereeStats />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/referee-availability"
          element={
            <ProtectedRoute>
              <RefereeAvailability />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/referee-matches"
          element={
            <ProtectedRoute>
              <RefereeMatches />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/referee-profile"
          element={
            <ProtectedRoute>
              <RefereeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-stats"
          element={
            <ProtectedRoute>
              <TeamManagerStats />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-create-team"
          element={
            <ProtectedRoute>
              <TeamManagerCreateTeam />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-assign-members"
          element={
            <ProtectedRoute>
              <TeamManagerAssignMembersTable />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-assign-member-coach"
          element={
            <ProtectedRoute>
              <TeamManagerAssignMembersCoach />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-assign-member-player"
          element={
            <ProtectedRoute>
              <TeamManagerAssignMembersPlayer />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/TeamManager-profile"
          element={
            <ProtectedRoute>
              <TeamManagerProfile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>


      <Routes>
        <Route
        path="/TeamManagerAssign"
       element={
        <ProtectedRoute>
          <TeamManagerAssign/>
        </ProtectedRoute>
       }
        >
         
        </Route>

      </Routes>

      <Routes>
        <Route
        path="/AssignTab"
        element={
          <AssignTab/>
        }
        
        >

        </Route>
      </Routes>


      <Routes>
        <Route path="/brackets" element={<ProtectedRoute><TournamentBracket /></ProtectedRoute>} />
        <Route path="/create-team" element={<ProtectedRoute><CoachCreateTeam /></ProtectedRoute>} />
        <Route path="/select-players" element={<ProtectedRoute><SelectPlayers /></ProtectedRoute>} />
        {/* <Route path="/create-match" element={<CreateMatch />} /> */}
        <Route path="/edit-team" element={<ProtectedRoute><CoachEditTeam /></ProtectedRoute>} />
        <Route path="/update-team" element={<ProtectedRoute><UpdateTeam /></ProtectedRoute>} />
      </Routes>

    </BrowserRouter>

    // <div className="App">

    //   <header className="App-header">
    //     <Navbar/>

    //   </header>
    // </div>
  );
}

export default App;
