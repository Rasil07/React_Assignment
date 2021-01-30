import getBase64 from "../utils/imageToBase64";

export const addDish = async (payload) => {
  let dishes = JSON.parse(localStorage.getItem("dishes") || "[]");

  const { dish, file, content: steps } = payload;

  const image = await getBase64(file);
  image.replace(/^data:image\/(png|jpg);base64,/, "");
  const new_dish = { ...dish, image, steps };
  dishes.push(new_dish);
  localStorage.setItem("dishes", JSON.stringify(dishes));

  const res = JSON.parse(localStorage.getItem("dishes"));

  return res;
};

export const listAllDishes = async (query) => {
  let dishes = JSON.parse(localStorage.getItem("dishes") || "[]");
  return dishes;
};
