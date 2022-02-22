import { call, takeLatest, put, select } from "redux-saga/effects";
import {
  DISPLAY_LOADING,
  GET_PROJECT_DETAIL_REDUCER,
  GET_PROJECT_DETAIL_SAGA,
  HIDE_LOADING,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getProjectDetailSaga(action) {
  // Show loading
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getProjectDetail(action.projectId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_REDUCER,
        projectDetail: data.content,
      });
    }
  } catch (err) {
    console.log(err);

    // Connect to store and change state
    let history = yield select((state) => state.HistoryReducer.history);

    alert(" Lỗi 404 ! Đang chuyển về Project Management Page !");
    //Chage web link directory
    history.push("/projectmanagement");
  }

  //   Hide Loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
