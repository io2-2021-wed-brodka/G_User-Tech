import './App.css';
import './Layout/topbar.tsx';
import List from '@material-ui/core/List';
import React, {useEffect, useState} from "react";
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
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from '@material-ui/core/styles';
import { Station } from './Api/StationApi';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ListStyle: {
            overflowY: 'auto',
            opacity: '0.92',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '2%',
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        deleteButton: {
            backgroundColor: '#D11A2A',
            variant: 'contained',
            margin: '5px'
        },
        blockButton: {
            backgroundColor: '#f2e20e',
            variant: 'contained',
            margin: '5px'
        },
    }),
);
const themeWarning = createMuiTheme({
  palette: {
      primary: {
          main: '#950740'
      }
  },
});

let stations: Station[] = [];

function StationListPage() {
  const classes = useStyles();
  const [list, setList] = React.useState<Station[]>(stations);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    index: number,
) => {
    setSelectedIndex(index);
};
    return (
      <div className="App" style={{ height: "91vh", display: "flex", flexDirection: "column" }}>  
          <List className={classes.ListStyle} subheader={<li/>}>
            <li className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader style={{
                                backgroundColor: '#4E4E50', display: 'flex', fontWeight: 'bold',
                                height: '50px', borderRadius: '15px'
                            }}>
                  <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 style={{width: '90%'}}>
                                <Box p={0} m={1}>
                                    Name
                                </Box>
                            </Box>
                </ListSubheader>
                {list.map((station, index) => {
                            return (
                                <div key={station.id}>
                                    <ListItem style={{
                                        backgroundColor: '#69696e', color: 'white', display: 'flex',
                                        height: '50px', marginBottom: '5px', marginTop: '5px', borderRadius: '15px'
                                    }}
                                              onClick={() => handleListItemClick(index)}>
                                        <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                             style={{width: '90%'}}>
                                            <Box p={0} m={1}>
                                                <ListItemText primary={station.name}/>
                                            </Box>
                                        </Box>
                                        <ThemeProvider theme={themeWarning}>
                                            <Button variant="contained" color="primary" className={classes.blockButton}
                                                    component={Link} to={`stations/${list[selectedIndex].id}/bikes`}
                                                    startIcon={<ErrorOutlineIcon/>}> Select </Button>
                                        </ThemeProvider>
                                    </ListItem>
                                </div>
                            );
                        })}
              </ul>
            </li>
          </List>
      </div>
    );
  }

  
export default StationListPage;