import { all } from "redux-saga/effects";
import * as UserJiraSaga from "../UserJiraSaga";

export function* rootSaga() {
  yield all([UserJiraSaga.followSignin()]);
}
