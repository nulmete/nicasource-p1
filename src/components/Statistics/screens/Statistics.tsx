import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CellProps } from "react-table";
import DisplayError from "../../../common/DisplayError/DisplayError";
import ClickableCell from "../../../common/GenericTable/ClickableCell";
import { GenericTable } from "../../../common/GenericTable/GenericTable";
import Spinner from "../../../common/Spinner/Spinner";
import { buildDetailsRoute } from "../../../constants/routes";
import { RootStore } from "../../../state/store";
import { formatDate } from "../../../utils/formatDate";
import isNotNullOrUndefined from "../../../utils/isNotNullOrUndefined";
import renderValueIfExists from "../../../utils/renderValueIfExists";
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
    if (!isNotNullOrUndefined(locationState?.searchValue)) {
      (async () => {
        await dispatch(getStatistics());
      })();
    }

    if (isNotNullOrUndefined(locationState?.searchValue)) {
      window.history.replaceState({}, document.title);
    }
  }, []);

  const handleSelectCountry = async (selectedCountry: string) => {
    history.push(buildDetailsRoute(selectedCountry));
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
        Cell: ({ value }: { value: any }) => {
          return renderValueIfExists(value);
        },
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
      {
        Header: "Last updated",
        accessor: <T extends Statistic>(originalRow: T) => {
          const { time } = originalRow;
          return <>{formatDate(time!)}</>;
        },
        Cell: CustomCell,
      },
    ],
    [statistics]
  );

  if (loading) return <Spinner size="4rem" />;

  if (error) {
    return (
      <DisplayError>
        {(error as CountryError).country || "Network error. Try again later."}
      </DisplayError>
    );
  }

  if (!loading && statistics.length === 0)
    return <DisplayError>No results found.</DisplayError>;

  return <GenericTable columns={columns} data={statistics} />;
};
