import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "../App.css";
import "../Layout/topbar.tsx";
import List from "@material-ui/core/List";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { Bike, getBikesAtStation, rentBike, reserveBike } from "../Api/bikeApi";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { themeWarning, useStyles } from "../Styles/style";
import { prettify } from "../utils";

const BikeListPage = () => {
  const classes = useStyles();
  const [openedRentBikeDialogIndex, setOpenedRentBikeDialogIndex] = useState<number>(-1);
  const [openedReserveBikeDialogIndex, setOpenedReserveBikeDialogIndex] = useState<number>(-1);
  const [bikeList, setBikeList] = React.useState<Bike[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [getBikesTrigger, setBikesTrigger] = React.useState(true);
  const handleBikeListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleCloseRentBike = () => {
    setOpenedRentBikeDialogIndex(-1);
  };
  const handleCloseReserveBike = () => {
    setOpenedReserveBikeDialogIndex(-1);
  };
  const handleRentBike = async () => {
    await rentBike(bikeList[selectedIndex].id);
    setOpenedRentBikeDialogIndex(-1);
    setBikesTrigger(!getBikesTrigger);
  };
  const handleReserveBike = async () => {
    await reserveBike(bikeList[selectedIndex].id);
    setOpenedReserveBikeDialogIndex(-1);
    setBikesTrigger(!getBikesTrigger);
  };
  const isThisRentBikeDialogOpened= (dialogIndex: number) => {
    return openedRentBikeDialogIndex === dialogIndex ? true : false;
  }
  const isThisReserveBikeDialogOpened= (dialogIndex: number) => {
    return openedReserveBikeDialogIndex === dialogIndex ? true : false;
  }
  useEffect(() => {
    // TODO(tkarwowski): Is there a better way to do this?
    const url = window.location.href;
    const stationId =
      url.match(/.*?\/stations\/(?<stationId>[^/]*)\/bikes/)
        ?.groups?.stationId || "";
    getBikesAtStation(stationId).then((r) => {
      if (r.isError) {
        window.location.href = "/login";
        return;
      }
      setBikeList(r.data?.bikes || []);
    });
  }, [getBikesTrigger]);
  return (
    <div className={classes.generalContainer}>
      <h1 className={classes.pageTitle}>
          CHOOSE BIKE
      </h1>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
              <Box className={classes.listBox}
                style={{ width: "90%" }}
              >
                <Box p={0} m={1}>
                  Bike ID
                </Box>
              </Box>
            </ListSubheader>
            {bikeList.map((bike, index) => {
              return (
                <li key={bike.id}>
                  <ListItem
                    className={classes.listItemStyle}
                    onClick={() => handleBikeListItemClick(index)}
                  >
                    <Box className={classes.listBox}
                      style={{ width: "90%" }}
                    >
                      <Box p={0} m={1}>
                        <ListItemText primary={prettify(bike.id)} />
                      </Box>
                    </Box>
                    <ThemeProvider theme={themeWarning}>
                      <Button
                        id={`bike-rent-button-confirm-${index}`}
                        className={classes.rentButton}
                        startIcon={<DirectionsBikeIcon />}
                        onClick={() => setOpenedRentBikeDialogIndex(index)}
                      >
                        RENT
                      </Button>
                      <Button
                        id={`bike-reserve-button-confirm-${index}`}
                        className={classes.reserveBikeButton}
                        startIcon={<HourglassEmptyIcon />}
                        onClick={() => setOpenedReserveBikeDialogIndex(index)}
                      >
                        RESERVE
                      </Button>
                      <Dialog
                        open={isThisRentBikeDialogOpened(index)}
                        keepMounted
                      >
                        <DialogTitle>{"Rent this bike?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want you rent this bike?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseRentBike} color="primary">
                            No
                          </Button>
                          <Button id="bike-rent-button-confirm" onClick={handleRentBike} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={isThisReserveBikeDialogOpened(index)}
                        keepMounted
                      >
                        <DialogTitle>{"Reserve this bike?"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Do you really want you reserve this bike?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseReserveBike}
                            color="primary"
                          >
                            No
                          </Button>
                          <Button id="bike-reserve-button-confirm" onClick={handleReserveBike} color="primary">
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </ThemeProvider>
                  </ListItem>
                </li>
              );
            })}
          </ul>
        </li>
      </List>
    </div>
  );
};
export default BikeListPage;
