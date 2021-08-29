import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Details, Home, NotFound } from "./pages";
import { HOME, DETAILS } from "./constants/routes";

const App: React.FC = () => {
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
