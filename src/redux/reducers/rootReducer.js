import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserReducer } from "./userReducer";
import { LoadingReducer } from "./LoadingReducer";

const rootReducer = combineReducers({
  signInReducer,
  HistoryReducer,
  UserReducer,
  LoadingReducer,
});

export default rootReducer;
