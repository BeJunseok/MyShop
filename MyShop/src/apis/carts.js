import instance from "./instance";
import handleApiError from "./handleApiError";

export async function fetchCart() {
  try {
    const response = await instance.get("/carts");
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}

export async function fetchAddToCart({ productId, quantity }) {
  try {
    const response = await instance.post("/carts", {
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
    const response = await instance.delete(`/carts/${id}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}
