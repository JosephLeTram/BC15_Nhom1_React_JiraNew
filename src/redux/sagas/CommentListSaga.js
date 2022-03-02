import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_COMMENT_REDUCER,
  GET_ALL_COMMENT_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getCommentListSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getAllComment(action.taskId)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_REDUCER,
        commentList: data.content,
        dateTime: data.dateTime,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* followGetCommentListSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getCommentListSaga);
}
