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
    InputLabel,
    ListItem,
    ListItemText,
    ListSubheader
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {Bike, returnBike, getRentedBikes} from "./Api/bikeApi";
import {getActiveStations, Station} from "./Api/StationApi";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';

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
        returnBikeButton: {
            backgroundColor: '#f2e20e ',
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
const RentedBikesListPage = () => {
    const classes = useStyles();
    const [openCreateBike, setOpenRentBike] = useState<boolean>(false);
    const [chosenStationId, setChosenStationId] = React.useState<string>("");
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const [stationList, setStationList] = React.useState<Station[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const handleBikeListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleChangeChosenStation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setChosenStationId(String(event.target.value));
    };
    const handleOpenReturnBike = () => {
        setChosenStationId(stationList[0].id);
        setOpenRentBike(true);
    };
    const handleCloseReturnBike = () => {
        setOpenRentBike(false);
    };
    const handleReturnBike = async (bikeId: string) => {
        returnBike(bikeId, chosenStationId).then(r => {});
        setOpenRentBike(false);
        setBikesTrigger(!getBikesTrigger);
    };
    useEffect(() => {
        getRentedBikes().then(r => {
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
        getActiveStations().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            let listStation: Station[] = r.data as Station[] || [];
            listStation = listStation.map(e => {
                return {id: e.id, name: e.name, state: e.state, bikes: e.bikes}
            });
            setStationList(listStation);
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
                                    Id
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
                                                <ListItemText primary={bike.id}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.returnBikeButton} id="return_bike_button"
                                                    startIcon={<DirectionsBikeIcon/>}
                                                    onClick={handleOpenReturnBike}> RETURN
                                            </Button>
                                            <Dialog disableBackdropClick open={openCreateBike} onClose={handleCloseReturnBike}>
                                                <DialogTitle>Fill the form</DialogTitle>
                                                <DialogContent>
                                                    <form className={classes.container}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="demo-dialog-native">
                                                                station
                                                            </InputLabel>
                                                            <Select native value={chosenStationId} onChange={handleChangeChosenStation}
                                                                    input={<Input/>}>
                                                                {stationList.map((station) => {
                                                                    return (
                                                                        <option value={station.id}> {station.name} </option>
                                                                    )
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </form>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleReturnBike(bike.id)} color="primary">
                                                        OK
                                                    </Button>
                                                    <Button onClick={handleCloseReturnBike} color="primary">
                                                        Cancel
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
export default RentedBikesListPage;
