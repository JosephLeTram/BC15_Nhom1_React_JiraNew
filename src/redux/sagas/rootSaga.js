import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";
import * as ProjectCategorySaga from "./ProjectCategorySaga";
import * as CreateProjectSaga from "./CreateProjectSaga";

export function* rootSaga() {
  yield all([
    SignInSaga.followSignin(),
    ProjectCategorySaga.followGetAllProjectCategory(),
    CreateProjectSaga.followCreateProjectSaga(),
  ]);
}
