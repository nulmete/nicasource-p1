import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CellProps } from "react-table";
import { GenericTable } from "../../../common/GenericTable/GenericTable";
import { buildDetailsRoute } from "../../../constants/routes";
import { RootStore } from "../../../state/store";
import { formatDate } from "../../../utils/formatDate";
import { getStatistics } from "../statistics.action";
import { CountryError, Statistic } from "../statistics.actionTypes";

interface LocationState {
  searchValue?: string;
}

export const Statistics: React.FC = () => {
  const { error, loading, statistics } = useSelector(
    (state: RootStore) => state.statistics
  );

  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const locationState = location?.state as LocationState;

  useEffect(() => {
    if (!locationState?.searchValue) {
      (async () => {
        await dispatch(getStatistics());
      })();
    }
    window.history.replaceState({}, document.title);
  }, []);

  const handleSelectCountry = async (selectedCountry: string) => {
    history.push(buildDetailsRoute(selectedCountry));
  };

  // TODO: move to separate component
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
        // TODO accessibility
        onKeyDown={() => {
          console.log("keydown");
        }}
        style={{ cursor: "pointer" }}
      >
        {valueToShow}
      </div>
    );
  };

  const CustomCell: React.FC<CellProps<Statistic>> = ({ cell }) => {
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
        Cell: CustomCell,
      },
      {
        Header: "Country",
        accessor: "country",
        Cell: CustomCell,
      },
      {
        Header: "Last Update",
        accessor: <T extends Statistic>(originalRow: T) => {
          const { time } = originalRow;
          return <>{formatDate(time!)}</>;
        },
        Cell: CustomCell,
      },
    ],
    [statistics]
  );

  if (loading) return <div>Loading</div>;

  if (error) {
    return (
      <div>
        {(error as CountryError).country || "Network error. Try again later."}
      </div>
    );
  }

  if (!loading && statistics.length === 0) return <div>No results found</div>;

  return <GenericTable columns={columns} data={statistics} />;
};
