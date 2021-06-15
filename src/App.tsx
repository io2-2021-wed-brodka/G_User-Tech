import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./Layout/topbar.tsx";
import { TopBar } from "./Layout/topbar";
import { Footer } from "./Layout/footer";
import StationBikeListPage from "./Pages/stationBikesListPage";
import StationListPage from "./Pages/stationList";
import RentedBikesListPage from "./Pages/rentedBikesList";
import ReservedBikesListPage from "./Pages/reservedBikesList";
import { RegisterLoginPage } from "./Pages/Register";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { useStyles } from "./Styles/style";
import { MainMenuPage } from "./Pages/mainPage";
import { MalfunctionsListPage } from "./Pages/malfunctionsListPage";
import { BikesListPage } from "./Pages/bikesListPage";

export default function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.webpageStyle}>
        <Router>
          <div>
            <TopBar />
            <Switch>
              <ProtectedRoute path="/stations/:id/bikes">
                <StationBikeListPage />
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
                <MalfunctionsListPage />
              </ProtectedRoute>
              <ProtectedRoute path="/bikes">
                <BikesListPage />
              </ProtectedRoute>
              <Route path="/"></Route>
            </Switch>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
