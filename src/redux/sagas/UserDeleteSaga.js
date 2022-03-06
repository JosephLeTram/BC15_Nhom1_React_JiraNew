import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  DELETE_USER_SAGA,
  GET_LIST_USER_SAGA,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* deleteUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.deleteUser(action.userId)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction(
        "success",
        `User {${action.name}}`,
        "User is succesfully deleted"
      );
      //Refresh List of Users
      yield put({
        type: GET_LIST_USER_SAGA,
      });
    }
  } catch (err) {
    console.log(err);
    notificationFunction(
      "error",
      `User {${action.name}}`,
      "User fails to delete"
    );
  }
}

export function* followDeleteUserSaga() {
  //only take the latest input from users
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
