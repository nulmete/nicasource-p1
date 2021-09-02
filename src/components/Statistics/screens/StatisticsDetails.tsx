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
import GoBackHome from "../../../common/GoBackHome/GoBackHome";
import KeyValueSection from "../../../common/KeyValueSection/KeyValueSection";
import Spinner from "../../../common/Spinner/Spinner";
import { NOT_FOUND } from "../../../constants/routes";
import { RootStore } from "../../../state/store";
import { formatDate } from "../../../utils/formatDate";
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

  if (loading && !currentStatisticExists) return <Spinner size="4rem" />;

  if (!loading && currentStatisticExists) {
    const { country, continent, population, time, cases, tests, deaths } =
      currentStatistic;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <KeyValueSection
            header={country!}
            content={[
              { key: "Continent", value: continent },
              { key: "Population", value: population },
              {
                key: "Last updated",
                value: formatDate(time!),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <KeyValueSection
              header="Cases"
              content={[
                { key: "New", value: cases?.new },
                { key: "Active", value: cases?.active },
                { key: "Critical", value: cases?.critical },
                { key: "Recovered", value: cases?.recovered },
                { key: "Per 1M population", value: cases?.["1M_pop"] },
                { key: "Total", value: cases?.total },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <KeyValueSection
              header="Tests"
              content={[
                { key: "Per 1M population", value: tests?.["1M_pop"] },
                { key: "Total", value: tests?.total },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <KeyValueSection
              header="Deaths"
              content={[
                { key: "New", value: deaths?.new },
                { key: "Per 1M population", value: deaths?.["1M_pop"] },
                { key: "Total", value: deaths?.total },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <GoBackHome />
        </Grid>
      </Grid>
    );
  }

  if (wasURLTypedManually && !foundFlag && !currentStatisticExists)
    return <Redirect to={NOT_FOUND} />;

  return null;
};

export default StatisticsDetails;
