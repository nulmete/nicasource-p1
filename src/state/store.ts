import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// TODO: ask for NODE_ENV === production
// if yes, I should use normal compose, without devTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
