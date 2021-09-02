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
    <BrowserRouter>
      <Switch>
        <Route path={NOT_FOUND} exact component={NotFound} />
        <Container className={classes.container} maxWidth="xl">
          <Route path={HOME} component={StatisticsContainer} />
          {/* ...other routes... */}
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
