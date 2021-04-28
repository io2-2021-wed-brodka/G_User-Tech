import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Bike, getBikesAtStation, rentBike, reserveBike} from "../Api/bikeApi";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { themeWarning, useStyles } from "../Styles/style";

const BikeListPage = () => {
    const classes = useStyles();
    const [openRentBike, setOpenRentBike] = useState<boolean>(false);
    const [openReserveBike, setOpenReserveBike] = useState<boolean>(false);
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const handleBikeListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleCloseRentBike = () => {
        setOpenRentBike(false);
    };
    const handleCloseReserveBike = () => {
        setOpenReserveBike(false);
    };
    const rentBikeClicked = async () => {
        await rentBike(bikeList[selectedIndex].id);
        setOpenRentBike(false);
        setBikesTrigger(!getBikesTrigger);
    };
    const reserveBikeClicked = async () => {
        await reserveBike(bikeList[selectedIndex].id);
        setOpenReserveBike(false);
        setBikesTrigger(!getBikesTrigger);
    };
    useEffect(() => {
        // TODO(tkarwowski): Is there a better way to do this?
        const url = window.location.href;
        const stationId = url.match(/http:\/\/localhost:3000\/stations\/(?<stationId>[^/]*)\/bikes/)?.groups?.stationId || "";
        getBikesAtStation(stationId).then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            let list: Bike[] = r.data as Bike[] || [];
            list = list.map(e => {
                return {id: e.id, status: e.status, station: e.station}
            });
            setBikeList(list);
        });
    }, [getBikesTrigger]);
    return (
        <div className={classes.generalContainer}>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader className={classes.listSubheader}>
                            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '90%'}}>
                                <Box p={1} m={1}>
                                    Id
                                </Box>
                            </Box>
                        </ListSubheader>
                        {bikeList.map((bike, index) => {
                            return (
                                <li key={bike.id}>
                                    <ListItem className={classes.listItemStyle}
                                              onClick={() => handleBikeListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={bike.id}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.rentButton}
                                                    startIcon={<DirectionsBikeIcon/>}
                                                    onClick={() => setOpenRentBike(true)}> 
                                                RENT
                                            </Button>
                                            <Button className={classes.reserveBikeButton}
                                                    startIcon={<HourglassEmptyIcon/>}
                                                    onClick={() => setOpenReserveBike(true)}>
                                                RESERVE
                                            </Button>
                                            <Dialog open={openRentBike}
                                                    keepMounted
                                                    onClose={handleCloseRentBike}>
                                                <DialogTitle>
                                                    {"Rent this bike?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Do you really want you rent this bike?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseRentBike} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={rentBikeClicked} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={openReserveBike}
                                                    keepMounted
                                                    onClose={handleCloseReserveBike}>
                                                <DialogTitle>
                                                    {"Reserve this bike?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Do you really want you reserve this bike?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseReserveBike} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={reserveBikeClicked} color="primary">
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
}
export default BikeListPage;
