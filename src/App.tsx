//import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import './App.css';
import './Layout/topbar.tsx';
import {TopBar} from './Layout/topbar';
import BikeListPage from './bikesList';
import StationListPage from './stationList';
import RentedBikesListPage from './rentedBikesList';
import ReservedBikesListPage from './reservedBikesList';
import bicycleWallpaper from './Resources/bikeWP.jpg';
import {RegisterLoginPage} from "./Register";
import {ProtectedRoute} from "./ProtectedRoute";

export default function App() {
    return (
        <div className="App" style={{
            height: "100vh", display: "flex", flexDirection: "column", width: '100%',
            backgroundImage: `url(${bicycleWallpaper})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
        }}>
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