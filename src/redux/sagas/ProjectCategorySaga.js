import { call, takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_CATEGORY_REDUCER,
} from "../constants/JiraNewConstants";
import { jiraNewService } from "../services/JiraNewService";
import { STATUS_CODE } from "../../GlobalSetting/domain";

function* getAllProjectCategory(action) {
  try {
    const { data, status } = yield call(() =>
      jiraNewService.getAllProjectCategory()
    );
    // Check status before dispatch to Store
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY_REDUCER,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followGetAllProjectCategory() {
  //only take the latest input from users
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
