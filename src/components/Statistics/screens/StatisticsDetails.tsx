import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../../state/store";
import { formatDate } from "../../../utils/formatDate";
import isNotNullOrUndefined from "../../../utils/isNotNullOrUndefined";
import renderValueIfExists from "../../../utils/renderValueIfExists";
import { getStatistics } from "../statistics.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
);

interface StatisticsDetailsParams {
  name: string;
}

const StatisticsDetails: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const location = useParams<StatisticsDetailsParams>();

  const { loading } = useSelector((state: RootStore) => state.statistics);

  const currentStatistic = useSelector(
    (state: RootStore) =>
      state.statistics.statistics.find((s) => s.country === location.name) ||
      {},
    shallowEqual
  );

  const currentStatisticExists = Object.keys(currentStatistic!).length > 0;

  useEffect(() => {
    if (!currentStatisticExists) {
      (async () => {
        await dispatch(getStatistics(location.name));
      })();
    }
  }, []);

  if (loading) return <div>loading</div>;

  if (!loading && currentStatisticExists) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <p>Continent: {renderValueIfExists(currentStatistic?.continent)}</p>
            <p>Country: {renderValueIfExists(currentStatistic?.country)}</p>
            <p>
              Population: {renderValueIfExists(currentStatistic?.population)}
            </p>
            <p>
              Time:{" "}
              {isNotNullOrUndefined(currentStatistic?.time)
                ? formatDate(currentStatistic!.time!)
                : "Unknown"}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>Cases</h2>
            <p>New: {renderValueIfExists(currentStatistic?.cases?.new)}</p>
            <p>
              Active: {renderValueIfExists(currentStatistic?.cases?.active)}
            </p>
            <p>
              Critical: {renderValueIfExists(currentStatistic?.cases?.critical)}
            </p>
            <p>
              Recovered:{" "}
              {renderValueIfExists(currentStatistic?.cases?.recovered)}
            </p>
            <p>
              1M_pop: {renderValueIfExists(currentStatistic?.cases?.["1M_pop"])}
            </p>
            <p>Total: {renderValueIfExists(currentStatistic?.cases?.total)}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>Tests</h2>
            <p>
              1M_pop: {renderValueIfExists(currentStatistic?.tests?.["1M_pop"])}
            </p>
            <p>Total: {renderValueIfExists(currentStatistic?.tests?.total)}</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <h2>Deaths</h2>
            <p>New: {renderValueIfExists(currentStatistic?.deaths?.new)}</p>
            <p>
              1M_pop:{" "}
              {renderValueIfExists(currentStatistic?.deaths?.["1M_pop"])}
            </p>
            <p>Total: {renderValueIfExists(currentStatistic?.deaths?.total)}</p>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  // Avoid initial flickering when app is loaded
  // from /country/:name route,
  // i.e.: when user types URL manually
  return null;
};

export default StatisticsDetails;
