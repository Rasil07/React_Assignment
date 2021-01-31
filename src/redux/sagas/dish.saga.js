import { put, call, takeEvery } from "redux-saga/effects";
import { addNewDish, listAllDish } from "../actions/dish.actions";
import * as ACTIONTYPES from "../types/dish.actions.types";

function* listDishes(action) {
  try {
    const response = yield call(listAllDish);
    yield put({
      type: ACTIONTYPES.LIST_SUCCESS,
      payload: { response, query: action.query },
    });
  } catch (err) {
    console.log("dish saga ma error ", err);
  }
}
function* addDishes(action) {
  try {
    const response = yield call(addNewDish, action.payload);
    yield put({ type: ACTIONTYPES.ADD_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: ACTIONTYPES.ADD_FAILURE, payload: err });
  }
}

export default function* dishSaga() {
  yield takeEvery(ACTIONTYPES.ADD_REQUEST, addDishes);
  yield takeEvery(ACTIONTYPES.LIST_REQUEST, listDishes);
}
