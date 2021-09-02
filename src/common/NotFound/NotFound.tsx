import { Button, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NotFoundImage from "../../assets/404.png";
import { HOME } from "../../constants/routes";

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
    image: {
      display: "block",
      width: "100%",
    },
  })
);

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src={NotFoundImage} alt="Not found" />
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={HOME}
      >
        Go back home
      </Button>
    </div>
  );
};

export default NotFound;
