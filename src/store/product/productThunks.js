import api from "../../api/axiosInstance";
import {
  setCategories,
  setProductList,
  setTotal,
  setFetchState,
  setFilter,
  setOffset,
  setLimit,
  setCategory,
  setSort,
} from "./productActions";
import { toast } from "react-toastify";

// Fetches products with pagination, filtering, and sorting
export const fetchProductsThunk =
  ({ limit = 25, offset = 0, filter = "", category = null, sort = null, gender = null } = {}) =>
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
      dispatch(setCategory(category));
      dispatch(setSort(sort));

      const params = { limit, offset };
      if (filter) params.filter = filter;
      if (category) params.category = category;
      if (sort) params.sort = sort;
      if (gender) params.gender = gender;

      const { data } = await api.get("/products", { params });

      // Normalize response: API may return { products: [...], total } or an array directly
      const rawProducts = Array.isArray(data) ? data : data.products || [];
      const total = data && typeof data.total === "number" ? data.total : rawProducts.length;

      // Normalization: ensure predictable fields for UI
      const normalizeProduct = (p, idx) => {
        if (!p) {
          return null
        }
        const id = p.id ?? p._id ?? idx + 1;
        const title = p.title || p.name || "Untitled";

        // Normalize image field: API or local data may provide a string URL,
        // an import/module object (e.g. { default: '/path' }), or an array.
        let imageRaw = p.image ?? (Array.isArray(p.images) ? p.images[0] : null) ?? null;
        let image = null;
        if (typeof imageRaw === "string") {
          image = imageRaw;
        } else if (imageRaw && typeof imageRaw === "object") {
          // Common candidates
          image = imageRaw.default || imageRaw.src || imageRaw.url || imageRaw.path || null;
          // If still an object (nested), try first element or default again
          if (image && typeof image === "object") {
            image = image.default || null;
          }
        }
        // If not a string by now, set to null so UI shows placeholder
        if (typeof image !== "string") image = null;
        const priceValue = Number(p.priceValue ?? p.price ?? 0) || 0;
        const discountValue = Number(p.discountValue ?? p.discount ?? priceValue) || priceValue;
        const price = typeof p.price === "string" ? p.price : `$${priceValue.toFixed(2)}`;
        const discountPrice = typeof p.discountPrice === "string" ? p.discountPrice : `$${discountValue.toFixed(2)}`;
        const department = p.department || p.category || p.group || "";
        const gender = p.gender || p.genderType || "";

        // Warn for missing important fields (only in dev)
        // Use Vite's import.meta.env.MODE instead of process.env (process is undefined in browser)
        const isProd = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.MODE === "production";
        if (!isProd) {
          if (!p.id && !p._id) console.warn(`Product missing id, assigned ${id}`, p);
          if (!image) console.warn(`Product ${id} has no image or image could not be normalized`, { imageRaw });
        }

        return {
          ...p,
          id,
          title,
          image,
          priceValue,
          discountValue,
          price,
          discountPrice,
          department,
          gender,
        };
      };

      const products = rawProducts.map((p, i) => normalizeProduct(p, i)).filter(Boolean);

      dispatch(setProductList(products));
      dispatch(setTotal(total));
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
    const categories = Array.isArray(data) ? data : data.categories || [];
    dispatch(setCategories(categories));
  } catch (err) {
    toast.error("Kategoriler yüklenemedi");
    console.error("Categories fetch error:", err);
  }
};
