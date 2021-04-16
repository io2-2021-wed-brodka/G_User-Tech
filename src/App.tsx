//import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 // Link,
} from "react-router-dom";
import './App.css';
import './Layout/topbar.tsx';
import { TopBar } from './Layout/topbar';
import BikeListPage from './bikesList';
import StationListPage from './stationList'
import bicycleWallpaper from './Resources/bikeWP.jpg';
import React from "react";
import { RegisterLoginPage } from "./Register";

export default function App() {
  return (
      <div className="App" style={{height: "100vh", display: "flex", flexDirection: "column", width: '100%', 
      backgroundImage:`url(${bicycleWallpaper})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <Router>
              <div>
                  <TopBar/>
                  <Switch>
                      <Route path="/bikes">
                          <BikeListPage/>
                      </Route>
                      <Route path="/stations">
                          <StationListPage/>
                      </Route>
                      <Route path="/register">
                          <RegisterLoginPage/>
                      </Route>
                      <Route path="/login">
                          <RegisterLoginPage/>
                      </Route>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}