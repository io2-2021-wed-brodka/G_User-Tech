import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ListItem, ListItemText, ListSubheader, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Malfunction, deleteMalfunction, getMalfunctions} from "../Api/malfunctionsApi";
import {Bike, BikeStatus, getBikes} from "../Api/bikeApi";
import { blockBike, unblockBike } from "../Api/bikeApi";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DescriptionIcon from '@material-ui/icons/Description';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckIcon from "@material-ui/icons/Check";
import { themeWarning, useStyles } from "../Styles/style";
import {prettify} from "../utils";

export const MalfunctionsListPage = () => {
    const classes = useStyles();
    const [openedDeleteDialogIndex, setOpenedDeleteDialogIndex] = useState<number>(-1);
    const [openedDescriptionDialogIndex, setOpenedDescriptionDialogIndex] = useState<number>(-1);
    const [openedBlockBikeDialogIndex, setOpenedBlockBikeDialogIndex] = useState<number>(-1);
    const [openedFixBikeDialogIndex, setOpenedFixBikeDialogIndex] = useState<number>(-1);
    const [malfunctionList, setMalfunctionList] = React.useState<Malfunction[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [getMalfunctionsTrigger, setMalfunctionsTrigger] = React.useState(true);
    const [bikeList, setBikeList] = React.useState<Bike[]>([]);
    const handleMalfunctionListItemClick = (index: number) => {
        setSelectedIndex(index);
    };
    const isThisDeleteDialogOpened = (dialogIndex: number) => {
        return openedDeleteDialogIndex === dialogIndex ? true : false
    };
    const handleCloseDeleteMalfunctionDialog = () => {
        setOpenedDeleteDialogIndex(-1);
    };
    const handleDeleteMalfunction = async () => {
      await deleteMalfunction(malfunctionList[selectedIndex].id);
      setOpenedDeleteDialogIndex(-1);
      setMalfunctionsTrigger(!getMalfunctionsTrigger);
    };
    const isThisDescriptionDialogOpened = (dialogIndex: number) => {
        return openedDescriptionDialogIndex === dialogIndex ? true : false
    };
    const handleCloseMalfunctionDescriptionDialog = () => {
        setOpenedDescriptionDialogIndex(-1);
    };
    const isThisBlockBikeDialogOpened = (dialogIndex: number) => {
        return openedBlockBikeDialogIndex === dialogIndex ? true : false
    };
    const handleCloseBlockBikeDialog = () => {
        setOpenedBlockBikeDialogIndex(-1);
    };
    const handleBlockBike = async () => {
      await blockBike(malfunctionList[selectedIndex].bikeId);
      setOpenedBlockBikeDialogIndex(-1);
      setMalfunctionsTrigger(!getMalfunctionsTrigger);
    };
    const isThisFixBikeDialogOpened = (dialogIndex: number) => {
        return openedFixBikeDialogIndex === dialogIndex ? true : false
    };
    const handleCloseFixBikeDialog = () => {
        setOpenedFixBikeDialogIndex(-1);
    };
    const handleFixBike = async () => {
        await unblockBike(malfunctionList[selectedIndex].bikeId);
        await deleteMalfunction(malfunctionList[selectedIndex].id);
        setOpenedFixBikeDialogIndex(-1);
        setMalfunctionsTrigger(!getMalfunctionsTrigger);
    };

    useEffect(() => {
        getMalfunctions().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setMalfunctionList(r.data?.malfunctions || []);
        });
        getBikes().then(r => {
            if (r.isError) {
                alert("Error");
                return;
            }
            setBikeList(r.data?.bikes || []);
        });
    }, [getMalfunctionsTrigger]);

    const renderButtons = (malfunction : Malfunction, index : number) => {
        let bikeStatus = bikeList.find((bike : Bike) => bike.id === malfunction.bikeId)?.status;
        switch(bikeStatus?.toString())
        {
            // TODO change hardcoded cases to BikeStatus enum values
            case "available":
                return (
                    <React.Fragment>
                        <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
                        startIcon={<DescriptionIcon/>}
                        onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
                        </Button>
                        <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)}>
                            <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                            <DialogContent>
                                {malfunction.description}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseMalfunctionDescriptionDialog} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    
                        <Button className={classes.blockButton}
                                startIcon={<ErrorOutlineIcon/>}
                                onClick={() => setOpenedBlockBikeDialogIndex(index)}> APPROVE
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
                    
                        <Button className={classes.reportMalfunctionButton} id="delete_malfunction_button"
                            startIcon={<ReportProblemIcon/>}
                            onClick={() => setOpenedDeleteDialogIndex(index)}> DENY
                    </Button>
                    <Dialog disableBackdropClick open={isThisDeleteDialogOpened(index)}>
                        <DialogTitle>{"Delete this malfunction report?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteMalfunctionDialog}>
                                No
                            </Button>
                            <Button onClick={handleDeleteMalfunction} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                    </React.Fragment>
                    );
                break;
            case "blocked":
                return (
                    <React.Fragment>
                        <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
                        startIcon={<DescriptionIcon/>}
                        onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
                        </Button>
                        <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)}>
                            <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                            <DialogContent>
                                {malfunction.description}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseMalfunctionDescriptionDialog} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    
                        <Button className={classes.fixedButton}
                                startIcon={<CheckIcon/>}
                                onClick={() => setOpenedFixBikeDialogIndex(index)}> FIXED
                        </Button>
                        <Dialog disableBackdropClick open={isThisFixBikeDialogOpened(index)}>
                            <DialogTitle>{"Unblock this bike?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Do you really want to unblock this bike an delete malfunction report?
                                    </DialogContentText>
                                </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseFixBikeDialog} color="primary">
                                    No
                                </Button>
                                <Button onClick={handleFixBike} color="primary">
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    );
                break;
            case "reserved":
            case "rented":
                return (
                    <React.Fragment>
                        <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
                        startIcon={<DescriptionIcon/>}
                        onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
                        </Button>
                        <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)}>
                            <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                            <DialogContent>
                                {malfunction.description}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseMalfunctionDescriptionDialog} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    
                        <Button className={classes.disabledButton}> 
                        Bike is rented or reserved
                        </Button>
                    </React.Fragment>
                    );
                break;
                break;

        }
        // return (
        //     <React.Fragment>
        //     <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
        //             startIcon={<DescriptionIcon/>}
        //             onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
        //     </Button>
        //     <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)}>
        //         <DialogTitle>{"Malfunction report description:"}</DialogTitle>
        //         <DialogContent>
        //             {malfunction.description}
        //         </DialogContent>
        //         <DialogActions>
        //             <Button onClick={handleCloseMalfunctionDescriptionDialog} color="primary">
        //                 Close
        //             </Button>
        //         </DialogActions>
        //     </Dialog>
        //     </React.Fragment>
        // );
    };
    return (
        <div className={classes.generalContainer}>
            <h1 className={classes.pageTitle}>
                MALFUNCTIONS
            </h1>
            <List className={classes.ListStyle} subheader={<li/>}>
                <li className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader className={classes.listSubheaderStyle}>
                            <Box className={classes.listBox} 
                                 style={{width: '50%'}}>
                                <Box p={0} m={1}>
                                    Bike ID
                                </Box>
                            </Box>
                        </ListSubheader>
                        {malfunctionList.map((malfunction, index) => {
                            return (
                                <li key={malfunction.id}>
                                    <ListItem className={classes.listItemStyle}
                                              onClick={() => handleMalfunctionListItemClick(index)}>
                                        <Box className={classes.listBox} style={{width: '60%'}}>
                                            <Box p={0} m={1}>
                                                <ListItemText primary={prettify(malfunction.bikeId)}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            {renderButtons(malfunction, index)}
                                            {/* {!XD ? (
                                                <React.Fragment>

                                                </React.Fragment>
                                            ) : (

                                            )}
                                            <Button className={classes.malfunctionDescriptionButton} id="malfunction_description_button"
                                                    startIcon={<DescriptionIcon/>}
                                                    onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)}>
                                                <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                                                <DialogContent>
                                                    {malfunction.description}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseMalfunctionDescriptionDialog} color="primary">
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        
                                            <Button className={classes.blockButton}
                                                    startIcon={<ErrorOutlineIcon/>}
                                                    onClick={() => setOpenedBlockBikeDialogIndex(index)}> APPROVE
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
                                        
                                            <Button className={classes.reportMalfunctionButton} id="delete_malfunction_button"
                                                    startIcon={<ReportProblemIcon/>}
                                                    onClick={() => setOpenedDeleteDialogIndex(index)}> DENY
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisDeleteDialogOpened(index)}>
                                                <DialogTitle>{"Delete this malfunction report?"}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDeleteMalfunctionDialog}>
                                                        No
                                                    </Button>
                                                    <Button onClick={handleDeleteMalfunction} color="primary">
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog> */}
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