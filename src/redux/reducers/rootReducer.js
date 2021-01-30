import { combineReducers } from "redux";
import { dishReducer } from "./dish.reducer";
const rootReducer = combineReducers({
  allDishes: dishReducer,
});

export default rootReducer;
