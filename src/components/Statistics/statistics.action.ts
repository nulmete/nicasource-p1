import axios from "axios";
import { Dispatch } from "redux";
import {
  StatisticsDispatchTypes,
  STATISTICS_LOADING,
  STATISTICS_ERROR,
  STATISTICS_SUCCESS,
  Statistic,
} from "./statistics.actionTypes";

export const getStatistics =
  (country?: string) => async (dispatch: Dispatch<StatisticsDispatchTypes>) => {
    try {
      dispatch({
        type: STATISTICS_LOADING,
      });

      const res = await axios.get(
        "https://covid-193.p.rapidapi.com/statistics",
        {
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          },
          params: {
            country,
          },
        }
      );

      // There are some entries where continent === country
      // So, those are redundant and should not be shown
      const filteredResults = res.data.response.filter(
        (r: Statistic) => r.continent !== r.country
      );

      // Country param is bad
      const hasError = Object.keys(res.data.errors).length > 0;
      if (hasError) {
        return dispatch({
          type: STATISTICS_ERROR,
          payload: {
            errors: res.data.errors,
            response: filteredResults,
          },
        });
      }

      return dispatch({
        type: STATISTICS_SUCCESS,
        payload: {
          errors: res.data.errors,
          response: filteredResults,
        },
      });
    } catch (error) {
      // Handle network error
      return dispatch({
        type: STATISTICS_ERROR,
        payload: {
          errors: [],
          response: [],
        },
      });
    }
  };
