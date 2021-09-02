import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./common/NotFound/NotFound";
import StatisticsContainer from "./components/Statistics/containers/StatisticsContainer";
import { HOME, NOT_FOUND } from "./constants/routes";

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
    <Container className={classes.container} maxWidth="xl">
      <BrowserRouter>
        <Switch>
          <Route path={NOT_FOUND} exact component={NotFound} />
          <Route path={HOME} component={StatisticsContainer} />
          {/* ...other routes here... */}
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
