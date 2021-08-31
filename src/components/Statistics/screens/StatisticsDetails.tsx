import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../../state/store";
import { getStatisticDetail, getStatistics } from "../statistics.action";

interface StatisticsDetailsParams {
  name: string;
}

const StatisticsDetails: React.FC = () => {
  const currentStatistic = useSelector(
    (state: RootStore) => state.statistics.currentStatistic
  );

  const dispatch = useDispatch();

  const location = useParams<StatisticsDetailsParams>();

  useEffect(() => {
    (async () => {
      // user manually entered the URL
      if (!Object.keys(currentStatistic!).length) {
        await dispatch(getStatistics());
        await dispatch(getStatisticDetail(location.name));
      }
    })();
  }, []);

  return <pre>{JSON.stringify(currentStatistic, null, 2)}</pre>;
};

export default StatisticsDetails;
