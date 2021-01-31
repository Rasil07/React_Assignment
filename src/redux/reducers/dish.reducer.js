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
        dishes:
          action.payload.query && action.payload.query.length > 0
            ? action.payload.response.filter((dish) => {
                const ingName = dish.ingridients.map(
                  (ing) => ing.ingridientName
                );
                return action.payload.query.some((val) =>
                  ingName.includes(val)
                );
              })
            : action.payload.response,
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
