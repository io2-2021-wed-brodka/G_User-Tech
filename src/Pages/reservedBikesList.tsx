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
    const [openedRentBikeDialogIndex, setOpenedRentBikeDialogIndex] = useState<number>(-1);
    const [openedCancelReservationDialogIndex, setOpenedCancelReservationDialogIndex] = useState<number>(-1);
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const handleBikeListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleCloseRentBike = () => {
        setOpenedRentBikeDialogIndex(-1);
    };
    const handleCloseCancelReservation = () => {
        setOpenedCancelReservationDialogIndex(-1);
    };
    const handleRentBike = async () => {
        await rentBike(bikeList[selectedIndex].id);
        setOpenedRentBikeDialogIndex(-1);
        setBikesTrigger(!getBikesTrigger);
    };
    const handleCancelReservation = async () => {
        await cancelReservation(bikeList[selectedIndex].id);
        setOpenedCancelReservationDialogIndex(-1);
        setBikesTrigger(!getBikesTrigger);
    };
    const isThisRentBikeDialogOpened= (dialogIndex: number) => {
      return openedRentBikeDialogIndex === dialogIndex ? true : false;
    }
    const isThisCancelReservationDialogOpened= (dialogIndex: number) => {
      return openedCancelReservationDialogIndex === dialogIndex ? true : false;
    }
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
            <h1 className={classes.pageTitle}>
                RESERVED BIKES
            </h1>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader className={classes.listSubheaderStyle}>
                            <Box className={classes.listBox}
                                 style={{width: '90%'}}>
                                <Box p={0} m={1}>
                                    Bike ID
                                </Box> 
                                <Box p={0} m={1} >
                                    Station name
                                </Box>                                    
                            </Box>
                        </ListSubheader>
                        {bikeList.map((bike, index) => {
                            return (
                                <li key={bike.id}>
                                    <ListItem className={classes.listItemStyle}
                                              onClick={() => handleBikeListItemClick(index)}>
                                        <Box className={classes.listBox}
                                             style={{width: '90%'}}>
                                            <Box p={0} m={1}>
                                                <ListItemText primary={prettify(bike.id)}/>
                                            </Box>
                                            <Box p={0} m={1}>
                                                <ListItemText primary={bike.station == null ? "" : bike.station.name}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.cancelReservationButton} id="cancel_reservation_button"
                                                    startIcon={<DeleteOutlineSharpIcon/>}
                                                    onClick={() => setOpenedCancelReservationDialogIndex(index)}
                                                    style={{height: '100%'}}> CANCEL</Button>
                                            <Button className={classes.rentButton} id="rent_bike_button"
                                                    startIcon={<DirectionsBikeIcon/>}
                                                    onClick={() => setOpenedRentBikeDialogIndex(index)}> RENT</Button>
                                            <Dialog open={isThisCancelReservationDialogOpened(index)}
                                                    keepMounted>
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
                                                    <Button onClick={handleCancelReservation} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={isThisRentBikeDialogOpened(index)}
                                                    keepMounted>
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
                                                    <Button onClick={handleRentBike} color="primary">
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
