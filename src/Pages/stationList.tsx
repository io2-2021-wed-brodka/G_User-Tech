import "../App.css";
import "../Layout/topbar.tsx";
import List from "@material-ui/core/List";
import React, { useEffect } from "react";
import {
  Button,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { ThemeProvider } from "@material-ui/core/styles";
import { getActiveStations, Station } from "../Api/StationApi";
import { Link } from "react-router-dom";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { themeWarning, useStyles } from "../Styles/style";

function StationListPage() {
  const classes = useStyles();
  const [stationList, setStationList] = React.useState<Station[]>([]);
  const [, setSelectedIndex] = React.useState(0);
  const [getActiveStationsTrigger] = React.useState(true);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    getActiveStations().then((r) => {
      if (r.isError) {
        window.location.href = "/login";
        return;
      }
      setStationList(r.data?.stations || []);
    });
  }, [getActiveStationsTrigger]);
  return (
    <div className={classes.generalContainer}>
      <h1 className={classes.pageTitle}>
          CHOOSE STATION
      </h1>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box className={classes.listBox}
                style={{ width: "90%" }}
              >
                <Box p={0} m={1} style={{ width: "120px" }}>
                  Station name
                </Box>
                <Box p={0} m={1}>
                  Bikes count
                </Box>
              </Box>
            </ListSubheader>
            {stationList.map((station, index) => {
              return (
                <div key={station.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleListItemClick(index)}
                  >
                    <Box className={classes.listBox}
                      style={{ width: "90%" }}
                    >
                      <Box p={0} m={1} style={{ width: "150px" }}>
                        <ListItemText primary={station.name} />
                      </Box>
                      <Box p={0} m={1}>
                        <ListItemText primary={station.activeBikesCount} />
                      </Box>
                    </Box>
                    <ThemeProvider theme={themeWarning}>
                      <Button
                        id={`station-button-confirm-${index}`}
                        className={classes.blockButton}
                        component={Link}
                        to={`${station.id}/bikes`}
                        startIcon={<SubdirectoryArrowRightIcon />}
                      >
                        {" "}
                        Select{" "}
                      </Button>
                    </ThemeProvider>
                  </ListItem>
                </div>
              );
            })}
          </ul>
        </li>
      </List>
    </div>
  );
}

export default StationListPage;
