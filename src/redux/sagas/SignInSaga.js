import {
  call,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  put,
  cancelled,
  select,
} from "redux-saga/effects";
import { TOKEN_AUTHORIZATION, USER_LOGIN } from "../../GlobalSetting/domain";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  USER_LOG_IN,
  USER_SIGNIN_API,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";

// quản lý các actions
function* signin(action) {
  // Create loading action
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(1000);

  try {
    // gọi API
    const { data } = yield call(() =>
      jiraNewService.jiraSignin(action.userLogin)
    );

    // add to localstorage when succesfully signed in
    localStorage.setItem(TOKEN_AUTHORIZATION, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({ type: USER_LOG_IN, userLogin: data.content });

    alert("Đăng nhập thành công!");

    // Connect to store and change state
    let history = yield select((state) => state.HistoryReducer.history);

    //Chage web link directory
    history.push("/projectmanagement");
  } catch (err) {
    //if data failed to retrieve

    alert(err.response.data.message); // drop down alert to notify users
  }

  //Hide loading action when data is retrieve
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followSignin() {
  //only take the latest input from users
  yield takeLatest(USER_SIGNIN_API, signin);
}
