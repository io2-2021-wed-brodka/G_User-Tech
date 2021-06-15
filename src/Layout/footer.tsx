import React from "react";
import { useStyles } from "../Styles/style";

export function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerStyle}>
      <h1 style={{ color: "#950740", textAlign: "center", marginTop: "10px" }}>
        Two-tired: A bike rental applications for You
      </h1>
      <div className={classes.footerContainer}>
        <div className={classes.footerOneInfo}>
          Contact list: Service: service2tired@zyz.com +48123456789
        </div>
        <div className={classes.footerOneInfo}>Admin: admin@zyz.com</div>
        <div className={classes.footerOneInfo}>
          Join our team: careers2tired@zyz.com
        </div>
        <div className={classes.footerOneInfo}>
          Adress: Księcia Janusza 1/7 01-670 Warsaw
        </div>
      </div>
    </div>
  );
}
