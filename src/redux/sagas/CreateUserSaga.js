import { call, takeLatest, put, delay, select } from "redux-saga/effects";

import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";
import {
  CREATE_USER_SAGA,
  GET_LIST_USER_SAGA,
  NEW_USER_LOGIN,
  PASSWORD,
} from "../constants/JiraNewConstants";
import { notificationFunction } from "../../util/Notification/notificationJira";

function* createUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.createUser(action.userCreateModel)
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(NEW_USER_LOGIN, JSON.stringify(data.content));
      localStorage.setItem(PASSWORD, JSON.stringify(data.content.passWord));
      //Refresh List of Users
      yield put({
        type: GET_LIST_USER_SAGA,
      });
      notificationFunction(
        "success",
        `User {${action.userCreateModel.name}}`,
        "User is succesfully created"
      );

      // Connect to store and change state
      let history = yield select((state) => state.HistoryReducer.history);

      notificationFunction(
        "success",

        "Redirecting to User Management"
      );
      //Chage web link directory
      history.push("/usermanagement");
    }
  } catch (err) {
    console.log(err);
    notificationFunction(
      "error",
      `Email ${action.userCreateModel.email}`,
      "Email is already taken"
    );
  }
}

export function* followCreateUserSaga() {
  //only take the latest input from users
  yield takeLatest(CREATE_USER_SAGA, createUserSaga);
}
