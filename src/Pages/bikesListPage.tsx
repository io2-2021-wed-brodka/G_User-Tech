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
  Switch,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { Bike, getBlockedBikes, getActiveBikes, blockBike, unblockBike } from "../Api/bikeApi";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { themeWarning, useStyles } from "../Styles/style";
import {prettify} from "../utils";

export const BikesListPage = () => {
    const classes = useStyles();
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const [openedBlockBikeDialogIndex, setOpenedBlockBikeDialogIndex] = useState<number>(-1);
    const [openedUnblockBikeDialogIndex, setOpenedUnblockBikeDialogIndex] = useState<number>(-1);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const [viewBlockedBikes, setViewBlockedBikes] = React.useState(false);
    const handleBikeListItemClick = (index: number) => {
        setSelectedIndex(index);
    };
    const isThisBlockBikeDialogOpened = (dialogIndex: number) => {
        return openedBlockBikeDialogIndex === dialogIndex ? true : false
    };
    const handleCloseBlockBikeDialog = () => {
        setOpenedBlockBikeDialogIndex(-1);
    };
    const handleBlockBike = async () => {
        await blockBike(bikeList[selectedIndex].id);
        setOpenedBlockBikeDialogIndex(-1);
        setBikesTrigger(!getBikesTrigger);
    };
    const isThisUnblockBikeDialogOpened = (dialogIndex: number) => {
        return openedUnblockBikeDialogIndex === dialogIndex ? true : false
    };
    const handleCloseUnblockBikeDialog = () => {
        setOpenedUnblockBikeDialogIndex(-1);
    };
    const handleUnblockBike = async () => {
        await unblockBike(bikeList[selectedIndex].id);
        setOpenedUnblockBikeDialogIndex(-1);
        setBikesTrigger(!getBikesTrigger);
    };
    useEffect(() => {
        if(!viewBlockedBikes)
            getActiveBikes().then((r) => {
                setBikeList(r.bikes)
            });
        else
            getBlockedBikes().then((r) => {
                if (r.isError) {
                    alert("Error");
                    return;
                }
                setBikeList(r.data?.bikes || []);
            });
    }, [getBikesTrigger, viewBlockedBikes]);
  return (
    <div className={classes.generalContainer}>
        <h1 className={classes.pageTitle}>
            BIKES
        </h1>
      <List className={classes.ListStyle} subheader={<li />}>
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheaderStyle}>
                <Box className={classes.listBox} style={{ width: "70%" }}>
                    <Box p={0} m={1} style={{width: "90px"}}>
                        Bike ID
                    </Box>
                    <Box p={0} m={1}>
                        Station
                    </Box>
                </Box>
                <Box>
                    <Switch
                        id={`bikes-switch-blocked`}
                        checked={viewBlockedBikes}
                        onChange={() => setViewBlockedBikes(!viewBlockedBikes)}
                        edge="start"
                    />
                    Display blocked bikes
                </Box>
            </ListSubheader>
            {bikeList.map((bike, index) => {
              return (
                <li key={bike.id}>
                  <ListItem className={classes.listItemStyle}
                    onClick={() => handleBikeListItemClick(index)}
                  >
                    <Box className={classes.listBox} style={{ width: "90%" }}>
                        <Box p={0} m={1} style={{width: "90px"}}>
                            <ListItemText primary={prettify(bike.id)} />
                        </Box>
                        <Box p={0} m={1}>
                            <ListItemText primary={bike.station == null ? "" : bike.station.name} />
                        </Box>
                    </Box>
                    <ThemeProvider theme={themeWarning}>
                        {!viewBlockedBikes ? (
                            <React.Fragment>
                                <Button id={`bikes-block-{index}`} className={classes.blockButton}
                                    startIcon={<ErrorOutlineIcon/>}
                                    onClick={() => setOpenedBlockBikeDialogIndex(index)}> BLOCK
                                </Button>
                                <Dialog disableBackdropClick open={isThisBlockBikeDialogOpened(index)}>
                                    <DialogTitle>{"Block this bike?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Do you really want to block this bike?
                                            </DialogContentText>
                                        </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseBlockBikeDialog} color="primary">
                                            No
                                        </Button>
                                        <Button onClick={handleBlockBike} color="primary">
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button className={classes.blockButton}
                                    startIcon={<ErrorOutlineIcon/>}
                                    onClick={() => setOpenedUnblockBikeDialogIndex(index)}> UNBLOCK
                                </Button>
                                <Dialog disableBackdropClick open={isThisUnblockBikeDialogOpened(index)}>
                                    <DialogTitle>{"Unlock this bike?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Do you really want to unblock this bike?
                                            </DialogContentText>
                                        </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseUnblockBikeDialog} color="primary">
                                            No
                                        </Button>
                                        <Button onClick={handleUnblockBike} color="primary">
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        )}
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
}

export default BikesListPage;
