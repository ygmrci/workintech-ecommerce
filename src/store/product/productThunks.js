import api from "../../api/axiosInstance";
import {
  setCategories,
  setProductList,
  setTotal,
  setFetchState,
  setFilter,
  setOffset,
  setLimit,
} from "./productActions";
import { toast } from "react-toastify";

// Fetches products with pagination, filtering, and sorting
export const fetchProductsThunk =
  ({ limit = 25, offset = 0, filter = "" } = {}) =>
  async (dispatch, getState) => {
    // Check if already fetching to prevent duplicate requests
    const state = getState();
    if (state.product.fetchState === "FETCHING") {
      return;
    }

    try {
      dispatch(setFetchState("FETCHING"));
      dispatch(setLimit(limit));
      dispatch(setOffset(offset));
      dispatch(setFilter(filter));

      const params = {
        limit,
        offset,
      };

      if (filter) {
        params.search = filter;
      }

      const { data } = await api.get("/products", { params });

      dispatch(setProductList(data.products));
      dispatch(setTotal(data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (err) {
      dispatch(setFetchState("FAILED"));
      toast.error("Ürünler yüklenemedi");
      console.error("Products fetch error:", err);
    }
  };

// Fetches all categories
export const fetchCategoriesThunk = () => async (dispatch) => {
  try {
    const { data } = await api.get("/categories");
    // Handle both array and object with categories key
    const categories = Array.isArray(data) ? data : data.categories || data;
    dispatch(setCategories(categories));
  } catch (err) {
    toast.error("Kategoriler yüklenemedi");
    console.error("Categories fetch error:", err);
  }
};
