import axios from "axios";
import { Dispatch } from "redux";
import {
  StatisticsDispatchTypes,
  STATISTICS_LOADING,
  STATISTICS_ERROR,
  STATISTICS_SUCCESS,
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

      // Country param is bad
      const hasError = Object.keys(res.data.errors).length > 0;
      if (hasError) {
        return dispatch({
          type: STATISTICS_ERROR,
          payload: {
            errors: res.data.errors,
            response: res.data.response,
          },
        });
      }

      return dispatch({
        type: STATISTICS_SUCCESS,
        payload: {
          errors: res.data.errors,
          response: res.data.response,
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
