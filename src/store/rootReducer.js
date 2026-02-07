import { combineReducers } from "redux";
import clientReducer from "./client/clientReducer";
import productReducer from "./product/productReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: cartReducer,
});

export default rootReducer;
