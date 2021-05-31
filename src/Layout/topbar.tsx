import {
  createMuiTheme,
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { postLogout } from "../Api/UserApi";
import BookIcon from "@material-ui/icons/Book";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import InboxIcon from "@material-ui/icons/HowToVote";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginRight: "20px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#4E4E50",
    },
    primary: {
      main: "#1A1A1D",
    },
    warning: {
      main: "#950740",
    },
  },
});

export const LoggedIn = () => {
  return sessionStorage.length ? true : false;
};

export const HasUserRole = () => {
  return sessionStorage.role === "user" ? true : false;
};

export const TopBar = () => {
  const classes = useStyles();
  const handleLogout = () => {
    postLogout();
  };
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          {!LoggedIn() ? (
              <Toolbar className={classes.toolbar}>
                <div>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    component={Link}
                    to="/"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div>
                  <Button
                    color="inherit"
                    startIcon={<PersonOutlineIcon />}
                    className={classes.title}
                    component={Link}
                    to="/login"
                  >
                    {" "}
                    Login{" "}
                  </Button>
                </div>
              </Toolbar>
            ) : [HasUserRole() ? (
                  <Toolbar className={classes.toolbar}>
                    <div>
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        component={Link}
                        to="/main-menu"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Button
                        id="topbar-station-button-confirm"
                        color="inherit"
                        startIcon={<LocalParkingIcon />}
                        className={classes.title}
                        component={Link}
                        to="/stations/active"
                      >
                        {" "}
                        Stations{" "}
                      </Button>
                      <Button
                        id="topbar-rented-button-confirm"
                        color="inherit"
                        startIcon={<BookIcon />}
                        className={classes.title}
                        component={Link}
                        to="/bikes/rented"
                      >
                        {" "}
                        My Rented Bikes{" "}
                      </Button>
                      <Button
                        color="inherit"
                        startIcon={<HourglassEmptyIcon />}
                        className={classes.title}
                        component={Link}
                        to="/bikes/reserved"
                      >
                        {" "}
                        My Reservations{" "}
                      </Button>
                    </div>
                    <div>
                      <Button
                        id="logout-button-confirm"
                        color="inherit"
                        startIcon={<ExitToAppIcon />}
                        className={classes.title}
                        onClick={handleLogout}
                      >
                        {" "}
                        Logout{" "}
                      </Button>
                    </div>
                  </Toolbar>
              ) : (
                <Toolbar className={classes.toolbar}>
                  <div>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      component={Link}
                      to="/main-menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Button
                      color="inherit"
                      startIcon={<DirectionsBikeIcon />}
                      className={classes.title}
                      component={Link}
                      to="/bikes"
                    >
                      {" "}
                      Bikes{" "}
                    </Button>
                    <Button
                      color="inherit"
                      startIcon={<InboxIcon />}
                      className={classes.title}
                      component={Link}
                      to="/malfunctions"
                    >
                      {" "}
                      Malfunctions{" "}
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="inherit"
                      startIcon={<ExitToAppIcon />}
                      className={classes.title}
                      onClick={handleLogout}
                    >
                      {" "}
                      Logout{" "}
                    </Button>
                  </div>
                </Toolbar>
              )
            ]
          }
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
};
