import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CellProps } from "react-table";
import { GenericTable } from "../../../common/GenericTable/GenericTable";
import { buildDetailsRoute } from "../../../constants/routes";
import { RootStore } from "../../../state/store";
import { getStatisticDetail } from "../statistics.action";
import { CountryError, Statistic } from "../statistics.actionTypes";

export const Statistics: React.FC = () => {
  const { error, loading, statistics } = useSelector(
    (state: RootStore) => state.statistics
  );

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSelectCountry = async (selectedCountry: string) => {
    await dispatch(getStatisticDetail(selectedCountry));
    history.push(buildDetailsRoute(selectedCountry));
  };

  const CustomCell: React.FC<CellProps<any>> = ({ cell }) => {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          handleSelectCountry(cell.row.values.country);
        }}
        // accessibility
        onKeyDown={() => {
          handleSelectCountry(cell.row.values.country);
        }}
      >
        {cell.value}
      </div>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Continent",
        accessor: "continent",
      },
      {
        Header: "Country",
        accessor: "country",
        Cell: CustomCell,
      },
      {
        Header: "Population",
        accessor: "population",
        aggregate: "sum",
        Aggregated: ({ cell: { value } }: CellProps<Statistic>) => `${value}`,
        Cell: CustomCell,
      },
      {
        Header: "Total cases",
        accessor: "cases.total",
        aggregate: "sum",
        Aggregated: ({ cell: { value } }: CellProps<Statistic>) => `${value}`,
        Cell: CustomCell,
      },
    ],
    [statistics]
  );

  // TODO: make a <Loader /> component
  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        {(error as CountryError).country || "Network error. Try again later."}
      </div>
    );
  }

  if (statistics.length === 0) return <div>No results found.</div>;

  return <GenericTable columns={columns} data={statistics} />;
};
