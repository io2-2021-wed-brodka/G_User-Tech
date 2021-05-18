import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItem,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Bike, getReservedBikes, rentBike, cancelReservation} from "../Api/bikeApi";
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { themeWarning, useStyles } from "../Styles/style";
import {prettify} from "../utils";

const ReservedBikesListPage = () => {
    const classes = useStyles();
    const [openRentBike, setOpenRentBike] = useState<boolean>(false);
    const [openCancelReservation, setOpenCancelReservation] = useState<boolean>(false);
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
    const handleCloseCancelReservation = () => {
        setOpenCancelReservation(false);
    };
    const rentBikeClicked = async () => {
        await rentBike(bikeList[selectedIndex].id);
        setOpenRentBike(false);
        setBikesTrigger(!getBikesTrigger);
    };
    const cancelReservationClicked = async () => {
        await cancelReservation(bikeList[selectedIndex].id);
        setOpenCancelReservation(false);
        setBikesTrigger(!getBikesTrigger);
    };
    useEffect(() => {
        getReservedBikes().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setBikeList(r.data?.bikes || []);
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
                                <Box p={1} m={1} style={{marginRight: '30%'}}>
                                    Id
                                </Box> 
                                <Box p={1} m={1} >
                                    Station name
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
                                                <ListItemText primary={prettify(bike.id)}/>
                                            </Box>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={bike.station == null ? "" : bike.station.name}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.cancelReservationButton} id="cancel_reservation_button"
                                                    startIcon={<DeleteOutlineSharpIcon/>}
                                                    onClick={() => setOpenCancelReservation(true)}
                                                    style={{height: '100%'}}> CANCEL</Button>
                                            <Button className={classes.rentButton} id="rent_bike_button"
                                                    startIcon={<DirectionsBikeIcon/>}
                                                    onClick={() => setOpenRentBike(true)}> RENT</Button>
                                            <Dialog open={openCancelReservation}
                                                    keepMounted
                                                    onClose={handleCloseCancelReservation}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Cancel reservation?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
                                                        Do you really want to cancel reservation?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseCancelReservation} color="primary">
                                                        No
                                                    </Button>
                                                    <Button onClick={cancelReservationClicked} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={openRentBike}
                                                    keepMounted
                                                    onClose={handleCloseRentBike}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Rent this bike?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
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
export default ReservedBikesListPage;
