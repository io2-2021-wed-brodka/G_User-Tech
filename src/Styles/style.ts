import {createStyles, makeStyles, Theme, createMuiTheme} from '@material-ui/core/styles';
import bicycleWallpaper from '../Resources/bikeWP.jpg';
export const useStyles = makeStyles((theme: Theme) =>
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
        rentButton: {
            backgroundColor: '#f2e20e',
            variant: 'contained',
            margin: '5px'
        },
        blockButton: {
            backgroundColor: '#f2e20e',
            variant: 'contained',
            margin: '5px'
        },
        cancelReservationButton: {
            backgroundColor: '#D11A2A ',
            variant: 'contained',
            margin: '5px'
        },
        generalContainer: {
            height: '91vh',
            display: 'flex',
            flexDirection: 'column'
        },
        formContainerBlue: {
            backgroundColor: '#aec6cf',
            opacity: '0.95',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            marginTop: '50px',
            width: '300px',
            background: 'linear-gradient(rgba(0,0,255,0.5),transparent)',         
          },
          textFieldStyle: {
              margin: '10px',
              backgroundColor: 'white',
              color: 'white',         
          },
          welcomeLabel: {
            color: 'white',
            marginTop: '10%',
            fontSize: '35px',
            marginBottom: '20px',
            textAlign: 'center'
          },
          windowContainer: {
            display: 'flex',
            flexDirection: 'column',
          },
          formContainerRed: {
            backgroundColor: '#aec6cf',
            opacity: '0.95',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            marginTop: '50px',
            width: '300px',  
            background: 'linear-gradient(rgba(250,0,0,0.5),transparent)',             
          },
          welcomeLabelSmall: {
            color: 'white',
            marginTop: '10%',
            fontSize: '15px',
            marginBottom: '20px',
            textAlign: 'center'
          },
        returnBikeButton: {
            backgroundColor: '#f2e20e ',
            variant: 'contained',
            margin: '5px'
        },
        reserveBikeButton: {
            backgroundColor: '#ffb347 ',
            variant: 'contained',
            margin: '5px'
        },
        reportMalfunctionButton: {
            backgroundColor: '#ff581a ',
            variant: 'contained',
            margin: '5px',
            lineHeight: 0.95
        },
        malfunctionDescriptionButton: {
            backgroundColor: '#2ca5b8 ',
            variant: 'contained',
            margin: '5px',
        },
        listSubheader: {
            backgroundColor: '#4E4E50', 
            display: 'flex', 
            fontWeight: 'bold',
            height: '50px', 
            borderRadius: '15px',
        },
        listSubheaderStyle: {
          backgroundColor: "#4E4E50",
          color: "white",
          display: "flex",
          height: "50px",
          marginBottom: "5px",
          marginTop: "5px",
          borderRadius: "15px",
        },
        listBox: {
          display: "flex",
          flexDirection: "row",
          padding: theme.spacing(1),
          margin: theme.spacing(1),
          alignSelf: "center",
        },
        listItemStyle: {
            backgroundColor: '#69696e',
            color: 'white',
            display: 'flex',
            height: '50px',
            marginBottom: '5px',
            marginTop: '5px',
            borderRadius: '15px',
        },
        webpageStyle: {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            width: '100%',
            backgroundImage: `url(${bicycleWallpaper})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }
    }),
);
export const themeWarning = createMuiTheme({
    palette: {
        primary: {
            main: '#950740'
        }
    },
});