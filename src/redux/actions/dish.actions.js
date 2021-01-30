import * as Services from "../../services/dish";

export const addNewDish = async (payload) => {
  try {
    const res = await Services.addDish(payload);
    return res;
  } catch (e) {
    throw e.response.data;
  }
};
