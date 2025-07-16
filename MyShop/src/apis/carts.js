import instance from "./instance";
import handleApiError from "./handleApiError";

const TEMP_USER_ID = 1;

export async function fetchCart() {
  try {
    const response = await instance.get(`/carts?userId=${TEMP_USER_ID}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}

export async function fetchAddToCart({ productId, quantity }) {
  try {
    const response = await instance.post(`/carts?userId=${TEMP_USER_ID}`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}

export async function fetchRemoveCartItem(id) {
  try {
    const response = await instance.delete(`/carts/${id}?userId=${TEMP_USER_ID}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}
