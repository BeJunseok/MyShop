import instance from "./instance";
import handleApiError from "./handleApiError";

export async function fetchAllProducts() {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}

export async function fetchProductById(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}

export async function fetchProductsByName(name) {
  if (!name) return;
  try {
    const response = await instance.get(`/products?name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
}
