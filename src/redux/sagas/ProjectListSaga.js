import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_PROJECT_LIST_SAGA,
  GET_PROJECT_LIST_REDUCER,
  SEARCH_USER_BY_PROJECT_ID_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getProjectListSaga(action) {
  try {
    const { data, status } = yield call(() => jiraNewService.getProjectList());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_LIST_REDUCER,
        projectList: data.content,
      });

      // dispatch on default to get users from first project
      yield put({
        type: SEARCH_USER_BY_PROJECT_ID_SAGA,
        projectId: data.content[0].id,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetProjectListSaga() {
  yield takeLatest(GET_PROJECT_LIST_SAGA, getProjectListSaga);
}
