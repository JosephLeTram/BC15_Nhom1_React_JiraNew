import { call, takeLatest, put } from "redux-saga/effects";
import {
  SEARCH_USER_BY_PROJECT_ID_REDUCER,
  SEARCH_USER_BY_PROJECT_ID_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* searchUserByProjectIdSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.searchUserByProjectId(action.projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SEARCH_USER_BY_PROJECT_ID_REDUCER,
        listUserSearchByProjectId: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: SEARCH_USER_BY_PROJECT_ID_REDUCER,
        listUserSearchByProjectId: [],
      });
    }
  }
}

export function* followSearchUserByProjectIdSaga() {
  yield takeLatest(SEARCH_USER_BY_PROJECT_ID_SAGA, searchUserByProjectIdSaga);
}
