import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {Button, DialogActions, DialogContent, DialogTitle, InputLabel,
    ListItem, ListItemText, ListSubheader, Input, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Bike, returnBike, getRentedBikes} from "../Api/bikeApi";
import { reportMalfunction } from "../Api/malfunctionsApi"
import {getActiveStations, Station} from "../Api/StationApi";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { themeWarning, useStyles } from "../Styles/style";
import {prettify} from "../utils";

const RentedBikesListPage = () => {
    const classes = useStyles();
    const [openedReturnBikeDialogIndex, setOpenedReturnBikeDialogIndex] = useState<number>(-1);
    const [openedReportMalfunctionDialogIndex, setOpenedReportMalfunctionDialogIndex] = useState<number>(-1);
    const [chosenStationId, setChosenStationId] = React.useState<string>("");
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const [stationList, setStationList] = React.useState<Station[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [getBikesTrigger, setBikesTrigger] = React.useState(true);
    const [malfunctionDescription, setMalfunctionDescription] = React.useState("");
    const handleBikeListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    const handleChangeChosenStation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setChosenStationId(String(event.target.value));
    };
    const handleOpenReturnBikeDialog = (index: number) => {
        setChosenStationId(stationList[0].id);
        setOpenedReturnBikeDialogIndex(index);
    };
    const isThisReturnBikeDialogOpened = (dialogIndex: number) => {
        return openedReturnBikeDialogIndex === dialogIndex ? true : false
    };
    const handleCloseReturnBikeDialog = () => {
        setOpenedReturnBikeDialogIndex(-1);
    };
    const handleReturnBike = async () => {
        await returnBike(bikeList[selectedIndex].id, chosenStationId);
        setOpenedReturnBikeDialogIndex(-1);
        setBikesTrigger(!getBikesTrigger);
    };
    const handleOpenReportMalfunctionDialog = (index: number) => {
        setMalfunctionDescription("");
        setOpenedReportMalfunctionDialogIndex(index);
    };
    const isThisReportMalfunctionDialogOpened = (dialogIndex: number) => {
        return openedReportMalfunctionDialogIndex === dialogIndex ? true : false
    };
    const handleCloseReportMalfunctionDialog = () => {
        setOpenedReportMalfunctionDialogIndex(-1);
    };
    const handleReportMalfunction = async () => {
        reportMalfunction(bikeList[selectedIndex].id, malfunctionDescription);
        setOpenedReportMalfunctionDialogIndex(-1);
    };
    const handleChangeMalfunctionDescription = (description: string) => {
        setMalfunctionDescription(description);
    }
    useEffect(() => {
        getRentedBikes().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setBikeList(r.data?.bikes || []);
        });
        getActiveStations().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setStationList(r.data?.stations || []);
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
                                                <ListItemText primary={prettify(bike.id)}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.returnBikeButton} id="return_bike_button"
                                                    startIcon={<DirectionsBikeIcon/>}
                                                    onClick={() => handleOpenReturnBikeDialog(index)}> RETURN
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisReturnBikeDialogOpened(index)}>
                                                <DialogTitle>Fill the form</DialogTitle>
                                                <DialogContent>
                                                    <form className={classes.container}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="demo-dialog-native">
                                                                Station
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
                                                    <Button onClick={handleReturnBike} color="primary">
                                                        OK
                                                    </Button>
                                                    <Button onClick={handleCloseReturnBikeDialog} color="primary">
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Button className={classes.reportMalfunctionButton} id="report_malfunction_button"
                                                    startIcon={<ReportProblemIcon/>}
                                                    onClick={() => handleOpenReportMalfunctionDialog(index)}> REPORT MALFUNCTION
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisReportMalfunctionDialogOpened(index)}>
                                                <DialogTitle>Fill the form</DialogTitle>
                                                <DialogContent>
                                                    <form className={classes.container}>
                                                        <FormControl className={classes.formControl}>
                                                        <label>Enter malfunction description: </label>
                                                        <TextField
                                                            multiline
                                                            rows={10}
                                                            variant="outlined"
                                                            onChange={(event: any) => handleChangeMalfunctionDescription(event.target.value)}
                                                        />
                                                        </FormControl>
                                                    </form>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleReportMalfunction} color="primary">
                                                        Send
                                                    </Button>
                                                    <Button onClick={handleCloseReportMalfunctionDialog} color="primary">
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
