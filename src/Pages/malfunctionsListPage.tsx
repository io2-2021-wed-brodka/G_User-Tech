import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel,
    ListItem, ListItemText, ListSubheader, Input, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Malfunction, reportMalfunction, deleteMalfunction, getMalfunctions} from "../Api/malfunctionsApi";
import {getActiveStations, Station} from "../Api/StationApi";
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DescriptionIcon from '@material-ui/icons/Description';
import { themeWarning, useStyles } from "../Styles/style";
import {prettify} from "../utils";

export const MalfunctionsListPage = () => {
    const classes = useStyles();
    const [openCreateBike, setOpenRentBike] = useState<boolean>(false);
    const [openDeleteMalfunction, setOpenDeleteMalfunction] = useState<number>(-1);
    const [openMalfunctionDescription, setOpenMalfunctionDescription] = useState<number>(-1);
    const [chosenStationId, setChosenStationId] = React.useState<string>("");
    const [malfunctionList, setMalfunctionList] = React.useState<Malfunction[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [getMalfunctionsTrigger, setMalfunctionsTrigger] = React.useState(true);
    const [malfunctionDescription, setMalfunctionDescription] = React.useState("");
    const handleMalfunctionListItemClick = (index: number) => {
        setSelectedIndex(index);
    };
    const handleOpenReturnBike = () => {
        // setChosenStationId(stationList[0].id);
        setOpenRentBike(true);
    };
    const handleCloseReturnBike = () => {
        setOpenRentBike(false);
    };
    const handleReturnBike = async (bikeId: string) => {
        // returnBike(bikeId, chosenStationId).then(r => {});
        // setOpenRentBike(false);
        // setBikesTrigger(!getBikesTrigger);
    };
    const handleOpenReportMalfunction = () => {
        setMalfunctionDescription("");
        // setOpenReportMalfunction(true);
    };
    const handleCloseReportMalfunction = () => {
        // setOpenReportMalfunction(false);
    };
    const handleReportMalfunction = async (bikeId: string) => {
        reportMalfunction(bikeId, malfunctionDescription);
        // setOpenReportMalfunction(false);
    };
    const handleChangeMalfunctionDescription = (description: string) => {
        setMalfunctionDescription(description);
    }
    const handleOpenDeleteMalfunction = (listElementIndex: number) => {
        setOpenDeleteMalfunction(listElementIndex);
    }
    const handleCloseDeleteMalfunction = () => {
        setOpenDeleteMalfunction(-1);
    }
    const deleteMalfunctionClicked = async () => {
      await deleteMalfunction(malfunctionList[selectedIndex].id);
      setOpenDeleteMalfunction(-1);
      setMalfunctionsTrigger(!getMalfunctionsTrigger);
    };
    const handleOpenMalfunctionDescription = (listElementIndex: number) => {
        setOpenMalfunctionDescription(listElementIndex);
    }
    const handleCloseMalfunctionDescription = () => {
        setOpenMalfunctionDescription(-1);
    }
    useEffect(() => {
        getMalfunctions().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setMalfunctionList(r.data?.malfunctions || []);
        });
    }, [getMalfunctionsTrigger]);
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
                        {malfunctionList.map((malfunction, index) => {
                            return (
                                <li key={malfunction.id}>
                                    <ListItem className={classes.listItemStyle}
                                              onClick={() => handleMalfunctionListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '80%'}}>
                                            <Box p={2} m={1}>
                                                <ListItemText primary={malfunction.id}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
                                                    startIcon={<DescriptionIcon/>}
                                                    onClick={() => handleOpenMalfunctionDescription(index)}> DESCRIPTION
                                            </Button>
                                            <Dialog disableBackdropClick open={openMalfunctionDescription === index ? true : false} onClose={handleCloseMalfunctionDescription}>
                                                <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                                                <DialogContent>
                                                    {malfunction.description}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseMalfunctionDescription}>
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        
                                            <Button className={classes.reportMalfunctionButton} id="delete_malfunction_button"
                                                    startIcon={<ReportProblemIcon/>}
                                                    onClick={() => handleOpenDeleteMalfunction(index)}> DELETE REPORT
                                            </Button>
                                            <Dialog disableBackdropClick open={openDeleteMalfunction === index ? true : false} onClose={handleCloseDeleteMalfunction}>
                                                <DialogTitle>{"Delete this malfunction report?"}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDeleteMalfunction}>
                                                        No
                                                    </Button>
                                                    <Button onClick={deleteMalfunctionClicked} color="primary">
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
export default MalfunctionsListPage;