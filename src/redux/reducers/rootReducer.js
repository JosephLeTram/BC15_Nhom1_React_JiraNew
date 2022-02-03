import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserReducer } from "./userReducer";

const rootReducer = combineReducers({
  signInReducer,
  HistoryReducer,
  UserReducer,
});

export default rootReducer;
