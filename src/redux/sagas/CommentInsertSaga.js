import { call, takeLatest, put } from "redux-saga/effects";
import {
  INSERT_COMMENT_REDUCER,
  INSERT_COMMENT_SAGA,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* insertCommentListSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.insertNewComment(action.commentModel)
    );

    if (status === STATUS_CODE.SUCCESS) {
      let user = action.commentModel.user;
      // add userLogin array to retrieve user's info to comment
      const userCommentModel = { ...data.content, user };
      yield put({
        type: INSERT_COMMENT_REDUCER,
        commentList: userCommentModel,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followInsertCommentListSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentListSaga);
}
