import { all } from "redux-saga/effects";
import dishSaga from "./dish.saga";

export default function* rootSaga() {
  yield all([dishSaga()]);
}
