import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Details, Home, NotFound } from "./pages";
import { HOME, DETAILS } from "./constants/routes";
import { getStatistics } from "./components/Statistics/statistics.action";
import { RootStore } from "./state/store";

const App: React.FC = () => {
  // Testing that redux setup works
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  const statisticsState = useSelector((state: RootStore) => state.statistics);

  // TODO: remove - just for testing purposes
  console.log({ statisticsState });

  return (
    <div>
      <Router>
        <Switch>
          <Route component={Home} exact path={HOME} />
          <Route component={Details} exact path={DETAILS} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
