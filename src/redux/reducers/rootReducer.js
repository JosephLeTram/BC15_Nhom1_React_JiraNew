import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import { HistoryReducer } from "./HistoryReducer";
import { UserReducer } from "./userReducer";
import { LoadingReducer } from "./LoadingReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { ProjectListReducer } from "./ProjectListReducer";
import { ModalEditReducer } from "./ModalEditReducer";
import { ProjectEditReducer } from "./ProjectEditReducer";
import { SearchUserReducer } from "./SearchUserReducer";
import { SearchUserReducerByProjectId } from "./SearchUserByProjectIdReducer";
import { TaskTypeReducer } from "./TaskTypeReducer";
import { PriorityTypeReducer } from "./PriorityTypeReducer";
import { StatusReducer } from "./StatusReducer";
import { TaskDetailReducer } from "./TaskDetailReducer";

const rootReducer = combineReducers({
  signInReducer,
  HistoryReducer,
  UserReducer,
  LoadingReducer,
  ProjectCategoryReducer,
  ProjectListReducer,
  ModalEditReducer,
  ProjectEditReducer,
  SearchUserReducer,
  TaskTypeReducer,
  PriorityTypeReducer,
  StatusReducer,
  SearchUserReducerByProjectId,
  TaskDetailReducer,
});

export default rootReducer;
