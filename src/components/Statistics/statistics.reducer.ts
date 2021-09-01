import {
  CountryError,
  Statistic,
  StatisticsDispatchTypes,
  STATISTICS_ERROR,
  STATISTICS_LOADING,
  STATISTICS_SUCCESS,
} from "./statistics.actionTypes";

interface DefaultStateI {
  loading: boolean;
  error: boolean | CountryError;
  statistics: Statistic[];
}

const defaultState: DefaultStateI = {
  loading: false,
  error: false,
  statistics: [],
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
    default:
      return state;
  }
};

export default statisticsReducer;
