import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import './App.css';
import './Layout/topbar.tsx';
import {TopBar} from './Layout/topbar';
import BikeListPage from './Pages/bikesList';
import StationListPage from './Pages/stationList';
import RentedBikesListPage from './Pages/rentedBikesList';
import ReservedBikesListPage from './Pages/reservedBikesList';
import {RegisterLoginPage} from "./Pages/Register";
import {ProtectedRoute} from "./Pages/ProtectedRoute";
import { useStyles } from "./Styles/style";

export default function App() {
    const classes = useStyles();
    return (
        <div className={classes.webpageStyle}>
            <Router>
                <div>
                    <TopBar/>
                    <Switch>
                        <ProtectedRoute path="/stations/:id/bikes">
                            <BikeListPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/stations/active">
                            <StationListPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/bikes/rented">
                            <RentedBikesListPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/bikes/reserved">
                            <ReservedBikesListPage/>
                        </ProtectedRoute>
                        <Route path="/register">
                            <RegisterLoginPage/>
                        </Route>
                        <Route path="/login">
                            <RegisterLoginPage/>
                        </Route>
                        <Route path="/">
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}