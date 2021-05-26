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
import { MalfunctionsListPage } from "./Pages/malfunctionsListPage";

let userOpen: boolean = true;
// const setLoginOpen = (open: boolean) => {
//   userOpen = open;
// }
export default function App() {
  const classes = useStyles();
  const [userLoginOpen, setUserLoginOpen] = useState<boolean>(true);
  const handleLogInAsUser = () => {
    console.log("set as true")
    setUserLoginOpen(true);
    userOpen=true;
  };
  const handleLogInAsTechnician = () => {
    console.log("set as falsz")
    setUserLoginOpen(false);
    userOpen=false;
  };
  return (
    <div className={classes.webpageStyle}>
      <Router>
        <div>
          <TopBar />
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
              <RegisterLoginPage />
            </Route>
            <ProtectedRoute path="/main-menu">
              <MainMenuPage />
            </ProtectedRoute>
            <ProtectedRoute path="/malfunctions">
              <MalfunctionsListPage/>
            </ProtectedRoute>
            <Route path="/"></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
