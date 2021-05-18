import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../Styles/style";

export const MainMenuPage = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.webpageStyle}>
      <Button
        variant="contained"
        component={Link}
        to="/stations/active"
        style={{
          borderRadius: "20px",
          minHeight: "100px",
          height: "20%",
          marginTop: "10%",
          marginRight: "30%",
          marginLeft: "30%",
          background: "linear-gradient(#69696e, #4E4E50)",
          fontFamily: "Goblin One",
          color: "white",
        }}
      >
        {" "}
        Rent/Reserve bike{" "}
      </Button>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/bikes/reserved"
          style={{
            borderRadius: "20px",
            minHeight: "100px",
            height: "20%",
            marginLeft: "30%",
            width: "20%",
            background: "linear-gradient(to left,#4E4E50, #69696e)",
            fontFamily: "Goblin One",
            color: "white",
          }}
        >
          {" "}
          Your reservations{" "}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/bikes/rented"
          style={{
            borderRadius: "20px",
            minHeight: "100px",
            height: "20%",
            marginRight: "20%",
            width: "20%",
            background: "linear-gradient(to right,#4E4E50, #69696e)",
            fontFamily: "Goblin One",
            color: "white",
          }}
        >
          {" "}
          Your rented bikes{" "}
        </Button>
      </div>
    </Grid>
  );
};
