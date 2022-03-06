import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CLOSE_DRAWER,
  GET_LIST_USER_SAGA,
  SET_SUBMIT_EDIT_USER,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* updateUserSaga(action) {
  const { userUpdated } = action;

  try {
    const { data, status } = yield call(() =>
      jiraNewService.updateUser(userUpdated)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction(
        "success",
        `User {${action.userUpdated?.name}}`,
        "User is succesfully updated"
      );
      // Refresh brower
      yield put({
        type: GET_LIST_USER_SAGA,
      });
      // Turn off drawer
      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followUpdateUserSaga() {
  //only take the latest input from users
  yield takeLatest(SET_SUBMIT_EDIT_USER, updateUserSaga);
}
