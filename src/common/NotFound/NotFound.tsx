import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import NotFoundImage from "../../assets/404.png";
import GoBackHome from "../GoBackHome/GoBackHome";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainer: {
      marginBottom: "2rem",
    },
    image: {
      display: "block",
      maxWidth: "100%",
    },
  })
);

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={NotFoundImage} alt="Not found" />
      </div>
      <GoBackHome />
    </div>
  );
};

export default NotFound;
