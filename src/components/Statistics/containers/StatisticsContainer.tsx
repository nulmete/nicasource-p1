import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import NotFound from "../../../common/NotFound/NotFound";
import Search from "../../../common/Search/Search";
import { DETAILS, HOME } from "../../../constants/routes";
import { Statistics } from "../screens/Statistics";
import StatisticsDetails from "../screens/StatisticsDetails";
import { getStatistics } from "../statistics.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      "& > *:not(:last-child)": {
        marginBottom: theme.spacing(3),
      },
    },
  })
);

const StatisticsContainer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getStatistics());
    })();
  }, []);

  const location = useLocation();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (location.pathname !== HOME) {
        history.push(HOME);
      }
      await dispatch(getStatistics(searchValue));
    },
    [searchValue]
  );

  return (
    <Box flexDirection="column" className={classes.container}>
      <Search
        inputLabel="Country"
        inputPlaceholder="Enter a country..."
        handleSearch={handleSearchSubmit}
        handleInputChange={handleSearchInputChange}
      />

      <Switch>
        <Route path={HOME} exact component={Statistics} />
        <Route path={DETAILS} exact component={StatisticsDetails} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  );
};

export default StatisticsContainer;
