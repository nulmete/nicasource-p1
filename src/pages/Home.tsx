import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GenericTable } from "../common/GenericTable/GenericTable";
import { getStatistics } from "../components/Statistics/statistics.action";
import { RootStore } from "../state/store";
import { groupByKey } from "../utils/groupByKey";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  const statisticsState = useSelector((state: RootStore) => state.statistics);

  // Testing that grouping by key ("continent") works
  if (!statisticsState.loading && statisticsState.statistics.length > 0) {
    console.log({
      grouped: groupByKey(statisticsState.statistics, "continent"),
    });
  }

  return (
    <div>
      {/* TODO: pass 'data' and 'columns' to GenericTable (MUI Table) */}
      <GenericTable />
    </div>
  );
};

export default Home;
