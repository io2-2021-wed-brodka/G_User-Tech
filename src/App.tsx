import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "./Layout/topbar.tsx";
import { TopBar } from "./Layout/topbar";
import BikeListPage from "./Pages/bikesList";
import StationListPage from "./Pages/stationList";
import RentedBikesListPage from "./Pages/rentedBikesList";
import ReservedBikesListPage from "./Pages/reservedBikesList";
import { RegisterLoginPage } from "./Pages/Register";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { useStyles } from "./Styles/style";
import { MainMenuPage } from "./Pages/mainPage";

export default function App() {
  const classes = useStyles();
  const [userLoginOpen, setUserLoginOpen] = useState<boolean>(true);
  const handleLogInAsUser = () => {
    setUserLoginOpen(true);
  };
  const handleLogInAsTechnician = () => {
    setUserLoginOpen(false);
  };
  return (
    <div className={classes.webpageStyle}>
      <Router>
        <div>
          <TopBar handleLogInAsUser={handleLogInAsUser} handleLogInAsTechnician={handleLogInAsTechnician}/>
          <Switch>
            <ProtectedRoute path="/stations/:id/bikes">
              <BikeListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/stations/active">
              <StationListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/bikes/rented">
              <RentedBikesListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/bikes/reserved">
              <ReservedBikesListPage />
            </ProtectedRoute>
            <Route path="/login">
              <RegisterLoginPage userLoginOpen={userLoginOpen}/>
            </Route>
            <ProtectedRoute path="/main-menu">
              <MainMenuPage />
            </ProtectedRoute>
            <Route path="/"></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
