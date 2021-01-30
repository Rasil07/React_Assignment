import * as ACTION from "../types/dish.actions.types";

const initialState = {
  dishes: [],
  details: null,
  isLoading: false,
};

export const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION.ADD_SUCCESS:
      return {
        ...state,
        dishes: action.payload,
      };
    case ACTION.LIST_SUCCESS:
      return {
        ...state,
        dishes: action.payload,
      };
    case ACTION.SELECT_DISH_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case ACTION.REMOVE_DISH_DETAILS:
      return {
        ...state,
        details: null,
      };

    default:
      return state;
  }
};
