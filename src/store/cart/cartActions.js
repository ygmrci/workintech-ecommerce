export const SET_CART = "cart/SET_CART";
export const SET_PAYMENT = "cart/SET_PAYMENT";
export const SET_ADDRESS = "cart/SET_ADDRESS";
export const ADD_TO_CART = "cart/ADD_TO_CART";
export const UPDATE_CART_COUNT = "cart/UPDATE_CART_COUNT";
export const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
export const TOGGLE_CART_ITEM = "cart/TOGGLE_CART_ITEM";
export const TOGGLE_ALL_CART_ITEMS = "cart/TOGGLE_ALL_CART_ITEMS";

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });

// Add or increment a product (optionally with size/variant) in the shopping cart
export const addToCart = (product, size = null) => ({
	type: ADD_TO_CART,
	payload: { product, size },
});

// Change quantity by a delta (e.g. +1 / -1). If result 0, item is removed.
export const updateCartCount = (productId, size = null, delta = 1) => ({
	type: UPDATE_CART_COUNT,
	payload: { productId, size, delta },
});

// Remove a product (optionally by size) from the cart
export const removeFromCart = (productId, size = null) => ({
	type: REMOVE_FROM_CART,
	payload: { productId, size },
});

// Select / deselect a single cart item
export const toggleCartItem = (productId, size = null) => ({
	type: TOGGLE_CART_ITEM,
	payload: { productId, size },
});

// Select / deselect all cart items at once
export const toggleAllCartItems = (checked) => ({
	type: TOGGLE_ALL_CART_ITEMS,
	payload: { checked },
});
