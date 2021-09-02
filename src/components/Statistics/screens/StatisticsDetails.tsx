import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { NOT_FOUND } from "../../../constants/routes";
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
  const [foundFlag, setFoundFlag] = useState<boolean>(true);

  const classes = useStyles();

  const dispatch = useDispatch();

  const params = useParams<StatisticsDetailsParams>();

  const { loading } = useSelector((state: RootStore) => state.statistics);

  const currentStatistic = useSelector(
    (state: RootStore) =>
      state.statistics.statistics.find((s) => s.country === params.name) || {},
    shallowEqual
  );

  const currentStatisticExists = Object.keys(currentStatistic!).length > 0;

  const history = useHistory();
  const wasURLTypedManually = history.action !== "PUSH";

  useEffect(() => {
    if (wasURLTypedManually) {
      (async () => {
        await dispatch(getStatistics(params.name));
        setFoundFlag(false);
      })();
    }
  }, []);

  if (loading && !currentStatisticExists) return <div>Loading...</div>;

  // TODO: improve card content styles
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

  if (wasURLTypedManually && !foundFlag && !currentStatisticExists)
    return <Redirect to={NOT_FOUND} />;

  return null;
};

export default StatisticsDetails;
