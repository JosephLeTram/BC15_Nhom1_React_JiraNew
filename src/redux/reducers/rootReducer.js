import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserReducer } from "./userReducer";
import { LoadingReducer } from "./LoadingReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";

const rootReducer = combineReducers({
  signInReducer,
  HistoryReducer,
  UserReducer,
  LoadingReducer,
  ProjectCategoryReducer,
});

export default rootReducer;
