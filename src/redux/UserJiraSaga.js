import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
} from "redux-saga/effects";
import Axios from "axios";
import { USER_SIGNIN_API } from "./constants/CyberJiraNew";
import { jiraNewService } from "./services/JiraNewService";

// quản lý các actions
function* signin(action) {
  try {
    // gọi API
    const { data, status } = yield jiraNewService.jiraSignin(action.userLogin);
    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followSignin() {
  yield takeLatest(USER_SIGNIN_API, signin);
}
