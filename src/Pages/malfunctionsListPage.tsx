import React, {useEffect, useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import '../App.css';
import '../Layout/topbar.tsx';
import List from '@material-ui/core/List';
import {Button, DialogActions, DialogContent, DialogTitle,
    ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Malfunction, deleteMalfunction, getMalfunctions} from "../Api/malfunctionsApi";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import DescriptionIcon from '@material-ui/icons/Description';
import { themeWarning, useStyles } from "../Styles/style";

export const MalfunctionsListPage = () => {
    const classes = useStyles();
    const [openedDeleteDialogIndex, setOpenedDeleteDialogIndex] = useState<number>(-1);
    const [openedDescriptionDialogIndex, setOpenedDescriptionDialogIndex] = useState<number>(-1);
    const [malfunctionList, setMalfunctionList] = React.useState<Malfunction[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const [getMalfunctionsTrigger, setMalfunctionsTrigger] = React.useState(true);
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
                                                    onClick={() => setOpenedDescriptionDialogIndex(index)}> DESCRIPTION
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisDescriptionDialogOpened(index)} onClose={handleCloseMalfunctionDescriptionDialog}>
                                                <DialogTitle>{"Malfunction report description:"}</DialogTitle>
                                                <DialogContent>
                                                    {malfunction.description}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseMalfunctionDescriptionDialog}>
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        
                                            <Button className={classes.reportMalfunctionButton} id="delete_malfunction_button"
                                                    startIcon={<ReportProblemIcon/>}
                                                    onClick={() => setOpenedDeleteDialogIndex(index)}> DELETE REPORT
                                            </Button>
                                            <Dialog disableBackdropClick open={isThisDeleteDialogOpened(index)} onClose={handleCloseDeleteMalfunctionDialog}>
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