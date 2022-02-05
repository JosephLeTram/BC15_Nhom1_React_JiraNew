import { all } from "redux-saga/effects";
import * as SignInSaga from "./SignInSaga";

export function* rootSaga() {
  console.log("Redux-Saga-root Saga has been succesfully connected");
  yield all([SignInSaga.followSignin()]);
}
