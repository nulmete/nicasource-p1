import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellProps } from "react-table";
import { GenericTable } from "../../common/GenericTable/GenericTable";
import { RootStore } from "../../state/store";
import { getStatistics } from "./statistics.action";
import { Statistic } from "./statistics.actionTypes";

export const Statistics: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  const { error, loading, statistics } = useSelector(
    (state: RootStore) => state.statistics
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Continent",
        accessor: "continent",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Population",
        accessor: "population",
        aggregate: "sum",
        Aggregated: ({ cell: { value } }: CellProps<Statistic>) => `${value}`,
      },
      {
        Header: "Total cases",
        accessor: "cases.total",
        aggregate: "sum",
        Aggregated: ({ cell: { value } }: CellProps<Statistic>) => `${value}`,
      },
    ],
    [statistics]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return <GenericTable columns={columns} data={statistics} />;
};
