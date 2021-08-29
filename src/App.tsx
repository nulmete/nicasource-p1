import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Details, NotFound } from "./pages";
import { HOME, DETAILS } from "./constants/routes";
import { Statistics } from "./components/Statistics/Statistics";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route component={Statistics} exact path={HOME} />
          <Route component={Details} exact path={DETAILS} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
