import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { addNewDish } from "../actions/dish.actions";
import * as ACTIONTYPES from "../types/dish.actions.types";

function* addDish(action) {
  try {
    console.log("dish saga ma ", action.payload);
    const response = yield call(addNewDish, action.payload);
    yield put({ type: ACTIONTYPES.ADD, payload: response });
    // yield put({ type: PUT_MESSAGE, payload: response.message });
  } catch (err) {
    console.log("dish saga ma error ", err);

    // yield put({ type: ADD_COMMENT_FAILURE });
    // yield put({ type: PUT_MESSAGE, message: err });
  }
}

export default function* disgSaga() {
  yield takeEvery(ACTIONTYPES.ADD, addDish);
}
