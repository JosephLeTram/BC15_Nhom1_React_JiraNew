import { call, takeLatest, put } from "redux-saga/effects";
import {
  SEARCH_USER_REDUCER,
  SEARCH_USER_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* searchUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.searchUser(action.keyWord)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SEARCH_USER_REDUCER,
        listUserSearch: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followSearchUserSaga() {
  yield takeLatest(SEARCH_USER_SAGA, searchUserSaga);
}
