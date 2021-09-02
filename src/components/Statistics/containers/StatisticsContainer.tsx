import {
  Box,
  createStyles,
  Divider,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Search from "../../../common/Search/Search";
import { DETAILS, HOME, NOT_FOUND } from "../../../constants/routes";
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

  const location = useLocation();

  const history = useHistory();

  const handleSearchSubmit = useCallback(
    async (searchValue: string) => {
      if (location.pathname !== HOME) {
        history.push({
          pathname: HOME,
          state: { searchValue },
        });
      }
      dispatch(getStatistics(searchValue));
    },
    [location.pathname]
  );

  return (
    <Box flexDirection="column" className={classes.container}>
      <Search
        inputLabel="Country"
        inputPlaceholder="Enter a country..."
        handleSearch={handleSearchSubmit}
      />
      <Divider variant="fullWidth" />
      <Switch>
        <Route path={HOME} exact component={Statistics} />
        <Route path={DETAILS} exact component={StatisticsDetails} />
        <Redirect to={NOT_FOUND} />
      </Switch>
    </Box>
  );
};

export default StatisticsContainer;
