import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import NotFound from "../../../common/NotFound/NotFound";
import { DETAILS, HOME } from "../../../constants/routes";
import { Statistics } from "../screens/Statistics";
import StatisticsDetails from "../screens/StatisticsDetails";
import { getStatistics } from "../statistics.action";

const StatisticsContainer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getStatistics());
    })();
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");

  const location = useLocation();
  const history = useHistory();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.pathname !== HOME) {
      history.push(HOME);
    }
    await dispatch(getStatistics(searchValue));
  };

  return (
    <div>
      {/*
        Maybe it's OK to keep this search component
        even if the user reaches the NotFound route,
        so that they can use the search functionality.

        TODO: add a <Link /> to the homepage
      */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <button type="submit">search</button>
      </form>

      <Switch>
        <Route path={HOME} exact component={Statistics} />
        <Route path={DETAILS} exact component={StatisticsDetails} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default StatisticsContainer;
