import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_LIST_USER_REDUCER,
  GET_LIST_USER_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getUserListSaga(action) {
  try {
    const { data, status } = yield call(() => jiraNewService.getUserList());

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_USER_REDUCER,
        userList: data.content,
      });

      // dispatch on default to get users from first project
      //   yield put({
      //     type: SEARCH_USER_BY_PROJECT_ID_SAGA,
      //     projectId: data.content[0].id,
      //   });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetUserListSaga() {
  yield takeLatest(GET_LIST_USER_SAGA, getUserListSaga);
}
