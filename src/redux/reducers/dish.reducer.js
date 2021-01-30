import * as ACTION from "../types/dish.actions.types";

const initialState = {
  dishes: [],
  isLoading: false,
};

export const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ADD:
      return {
        ...state,
        dishes: [...state.dishes, ...action.payload],
      };

    default:
      return state;
  }
};
