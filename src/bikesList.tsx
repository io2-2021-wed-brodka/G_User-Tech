import React, {useEffect, useState} from "react";
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import './App.css';
import './Layout/topbar.tsx';
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
import {Bike, BikeStatus, getBikesAtStation, rentBike, reserveBike} from "./Api/bikeApi";
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListStyle: {
            overflowY: 'auto',
            opacity: '0.92',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '2%',
            marginBottom: '2%',
        },
        ListFont: {
            color: 'white'
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        rentButton: {
            backgroundColor: '#D11A2A ',
            variant: 'contained',
            margin: '5px'
        },
        reserveBikeButton: {
            backgroundColor: '#D11A2A ',
            variant: 'contained',
            margin: '5px'
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        generalContainer: {
            height: '91vh',
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);
const themeWarning = createMuiTheme({
    palette: {
        primary: {
            main: '#950740'
        }
    },
});


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
                        <ListSubheader
                            style={{
                                backgroundColor: '#4E4E50', display: 'flex', fontWeight: 'bold',
                                height: '50px', borderRadius: '15px'
                            }}>
                            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '90%'}}>
                                <Box p={1} m={1}>
                                    State
                                </Box>
                                <Box p={1} m={1} style={{marginLeft: '6%'}}>
                                    Station
                                </Box>
                            </Box>
                        </ListSubheader>
                        {bikeList.map((bike, index) => {
                            return (
                                <li key={bike.id}>
                                    <ListItem style={{
                                        backgroundColor: '#69696e', color: 'white', display: 'flex',
                                        height: '50px', marginBottom: '5px', marginTop: '5px', borderRadius: '15px'
                                    }}
                                              onClick={() => handleBikeListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={BikeStatus[bike.status]}/>
                                            </Box>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={bike.station == null ? "" : bike.station.name}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.rentButton} id="rent_bike_button"
                                                    startIcon={<DeleteOutlineSharpIcon/>}
                                                    onClick={() => setOpenRentBike(true)}> RENT</Button>
                                            <Button className={classes.reserveBikeButton} id="reserve_bike_button"
                                                    startIcon={<DeleteOutlineSharpIcon/>}
                                                    onClick={() => setOpenReserveBike(true)}> RESERVE</Button>
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
                                            <Dialog open={openReserveBike}
                                                    keepMounted
                                                    onClose={handleCloseReserveBike}>
                                                <DialogTitle
                                                    id="alert-dialog-slide-title">{"Reserve this bike?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-slide-description">
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
