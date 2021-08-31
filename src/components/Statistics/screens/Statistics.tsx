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

  interface ClickableCellProps {
    valueToShow: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }
  const ClickableCell: React.FC<ClickableCellProps> = ({
    valueToShow,
    onClick,
  }) => {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={() => {
          console.log("keydown");
        }}
      >
        {valueToShow}
      </div>
    );
  };

  const CustomCell: React.FC<CellProps<any>> = ({ cell }) => {
    return (
      <ClickableCell
        valueToShow={cell.value}
        onClick={() => handleSelectCountry(cell.row.values.country)}
      />
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Continent",
        accessor: "continent",
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
        Cell: () => {
          return CustomCell;
        },
      },
      {
        Header: "Country",
        accessor: "country",
        Cell: CustomCell,
      },
      // TODO: format time.
      {
        Header: "Last Update",
        accessor: <T extends Statistic>(originalRow: T) => {
          const { country } = originalRow;
          return <span>{country}</span>;
        },
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
