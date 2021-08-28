import {
  StatisticsResponseError,
  Statistic,
  StatisticsDispatchTypes,
  STATISTICS_ERROR,
  STATISTICS_LOADING,
  STATISTICS_SUCCESS,
} from "./statistics.actionTypes";

interface DefaultStateI {
  loading: boolean;
  error: boolean | StatisticsResponseError;
  statistics?: Statistic[];
}

const defaultState: DefaultStateI = {
  loading: false,
  error: false,
};

const statisticsReducer = (
  state: DefaultStateI = defaultState,
  action: StatisticsDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case STATISTICS_LOADING:
      return {
        loading: true,
        error: false,
      };
    case STATISTICS_ERROR:
      return {
        loading: false,
        error: action.payload.errors,
      };
    case STATISTICS_SUCCESS:
      return {
        loading: false,
        error: false,
        statistics: action.payload.response,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
