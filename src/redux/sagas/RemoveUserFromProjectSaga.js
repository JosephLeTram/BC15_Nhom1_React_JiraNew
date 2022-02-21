import { call, takeLatest, put } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  GET_PROJECT_LIST_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* removeUserFromProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.removeUserFromProject(action.userProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notificationFunction(
        "success",
        `Project ${action.userProject.projectId}`,
        `A member ${action.userProject.userId} has been removed`
      );
      //Refresh Browwser after successfully adding
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followRemoveUserFromProjectSaga() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}
