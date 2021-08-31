import {
  CountryError,
  Statistic,
  StatisticsDispatchTypes,
  STATISTICS_ERROR,
  STATISTICS_LOADING,
  STATISTICS_SUCCESS,
  STATISTIC_DETAIL,
} from "./statistics.actionTypes";

interface DefaultStateI {
  loading: boolean;
  error: boolean | CountryError;
  statistics: Statistic[];
  currentStatistic: Statistic;
}

const defaultState: DefaultStateI = {
  loading: false,
  error: false,
  statistics: [],
  currentStatistic: {},
};

const statisticsReducer = (
  state: DefaultStateI = defaultState,
  action: StatisticsDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case STATISTICS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case STATISTICS_ERROR:
      return {
        ...state,
        loading: false,
        error: <CountryError>action.payload.errors,
      };
    case STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        statistics: action.payload.response,
      };
    case STATISTIC_DETAIL: {
      const { selectedCountry } = action.payload;
      const foundCountry =
        state.statistics.find((s) => s.country === selectedCountry) || {};
      return {
        ...state,
        loading: false,
        error: false,
        currentStatistic: foundCountry,
      };
    }
    default:
      return state;
  }
};

export default statisticsReducer;
