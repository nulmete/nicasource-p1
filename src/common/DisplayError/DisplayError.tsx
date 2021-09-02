import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    error: {
      fontWeight: "bold",
    },
  })
);

const DisplayError: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.error}>
      {children}
    </Typography>
  );
};

export default DisplayError;
