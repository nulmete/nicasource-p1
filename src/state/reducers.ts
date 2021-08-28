import { combineReducers } from "redux";
import statisticsReducer from "../components/Statistics/statistics.reducer";

const rootReducer = combineReducers({
  statistics: statisticsReducer,
});

export default rootReducer;
