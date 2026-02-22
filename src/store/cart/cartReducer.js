import {
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  ADD_TO_CART,
  UPDATE_CART_COUNT,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM,
  TOGGLE_ALL_CART_ITEMS,
} from "./cartActions";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const payload = action.payload || {};
      const product = payload.product || payload;
      const incomingSize = payload.size ?? product.size ?? product.beden ?? null;
      if (!product) return state;

      const productId = product.id ?? product._id;
      if (productId == null) return state;

      const existingIndex = state.cart.findIndex((item) => {
        const existingProduct = item.product || {};
        const existingId = existingProduct.id ?? existingProduct._id;
        const existingSize =
          item.size ?? existingProduct.size ?? existingProduct.beden ?? null;
        return existingId === productId && existingSize === incomingSize;
      });

      if (existingIndex !== -1) {
        const nextCart = state.cart.map((item, index) =>
          index === existingIndex
            ? { ...item, count: (item.count || 0) + 1 }
            : item,
        );
        return { ...state, cart: nextCart };
      }

      const newEntry = {
        count: 1,
        checked: true,
        product,
        size: incomingSize,
      };

      return { ...state, cart: [...state.cart, newEntry] };
    }
    case UPDATE_CART_COUNT: {
      const { productId, size, delta } = action.payload || {};
      if (productId == null || !delta) return state;

      const nextCart = state.cart
        .map((item) => {
          const p = item.product || {};
          const id = p.id ?? p._id;
          const itemSize = item.size ?? p.size ?? p.beden ?? null;
          if (id !== productId || itemSize !== (size ?? itemSize)) return item;

          const nextCount = (item.count || 0) + delta;
          if (nextCount <= 0) return null;
          return { ...item, count: nextCount };
        })
        .filter(Boolean);

      return { ...state, cart: nextCart };
    }
    case REMOVE_FROM_CART: {
      const { productId, size } = action.payload || {};
      if (productId == null) return state;

      const nextCart = state.cart.filter((item) => {
        const p = item.product || {};
        const id = p.id ?? p._id;
        const itemSize = item.size ?? p.size ?? p.beden ?? null;
        return !(id === productId && itemSize === (size ?? itemSize));
      });

      return { ...state, cart: nextCart };
    }
    case TOGGLE_CART_ITEM: {
      const { productId, size } = action.payload || {};
      if (productId == null) return state;

      const nextCart = state.cart.map((item) => {
        const p = item.product || {};
        const id = p.id ?? p._id;
        const itemSize = item.size ?? p.size ?? p.beden ?? null;
        if (id === productId && itemSize === (size ?? itemSize)) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      return { ...state, cart: nextCart };}
    case TOGGLE_ALL_CART_ITEMS: {
      const { checked } = action.payload || {};
      const value = typeof checked === "boolean" ? checked : true;
      const nextCart = state.cart.map((item) => ({ ...item, checked: value }));
      return { ...state, cart: nextCart };
    }
    case SET_CART:
      return { ...state, cart: action.payload };
    case SET_PAYMENT:
      return { ...state, payment: action.payload };
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
}
