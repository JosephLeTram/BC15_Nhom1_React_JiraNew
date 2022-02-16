import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserReducer } from "./userReducer";
import { LoadingReducer } from "./LoadingReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { ProjectListReducer } from "./ProjectListReducer";
import { ModalEditReducer } from "./ModalEditReducer";
import { ProjectEditReducer } from "./ProjectEditReducer";
const rootReducer = combineReducers({
  signInReducer,
  HistoryReducer,
  UserReducer,
  LoadingReducer,
  ProjectCategoryReducer,
  ProjectListReducer,
  ModalEditReducer,
  ProjectEditReducer,
});

export default rootReducer;
