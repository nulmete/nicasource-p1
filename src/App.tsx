import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import StatisticsContainer from "./components/Statistics/containers/StatisticsContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: `${theme.spacing(3)}px`,
      paddingBottom: `${theme.spacing(3)}px`,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container className={classes.container} maxWidth="xl">
        <StatisticsContainer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
