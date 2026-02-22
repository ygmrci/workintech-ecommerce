import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_SELECTED_PRODUCT,
  SET_SELECTED_PRODUCT_FETCH_STATE,
} from "./productActions";

const initialState = {
  categories: [],
  productList: [],
  selectedProduct: null,
  selectedProductFetchState: "NOT_FETCHED", // for product detail page
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  category: null,
  sort: "",
  fetchState: "NOT_FETCHED", // "NOT_FETCHED" | "FETCHING" | "FETCHED" | "FAILED"
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      // Ensure categories is always an array and remove duplicates by id
      const incoming = Array.isArray(action.payload)
        ? action.payload
        : action.payload
          ? [action.payload]
          : [];
      const uniqueCategories = Array.from(
        new Map(incoming.map((item) => [item.id, item])).values(),
      );
      return { ...state, categories: uniqueCategories };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case SET_SELECTED_PRODUCT_FETCH_STATE:
      return { ...state, selectedProductFetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case "product/SET_CATEGORY":
      return { ...state, category: action.payload };
    case "product/SET_SORT":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}
