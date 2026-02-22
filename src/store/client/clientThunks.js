import api from "../../api/axiosInstance";
import { setUser, setRoles, setAddressList, setCreditCards } from "./clientActions";
import { toast } from "react-toastify";

// Fetches roles from backend - only called when needed (e.g., during signup)
// Prevents unnecessary API calls by being triggered on-demand
export const fetchRolesThunk = () => async (dispatch) => {
  try {
    const { data } = await api.get("/roles");
    dispatch(setRoles(data));
  } catch (err) {
    toast.error("Roller yüklenemedi");
    console.error("Roles fetch error:", err);
  }
};

const ensureAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
};

// Verifies token on app load
// GET /verify with token header; if valid, returns user info and optionally new token
// On success: saves user to reducer and updates localStorage token if new one provided
// On failure: clears token from localStorage and axios header
export const verifyTokenThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return; // No token, skip verification

  try {
    // Set token in axios header for this request
    api.defaults.headers.common.Authorization = token;

    const { data } = await api.get("/verify");

    dispatch(
      setUser({
        name: data.name,
        email: data.email,
        role_id: Number(data.role_id),
        token: data.token || token, // Use new token if provided, else keep old
      }),
    );

    // Renew token in localStorage if backend provided new one
    if (data.token) {
      localStorage.setItem("token", data.token);
      api.defaults.headers.common.Authorization = data.token;
    }
  } catch (err) {
    // Token invalid or expired; clear it
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    console.error("Token verification failed:", err);
  }
};

// Logs user in with email and password
// Stores token in localStorage if "Remember Me" is checked
// Sets token in axios default header for authenticated requests
export const loginThunk =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      const { data } = await api.post("/login", { email, password });

      dispatch(
        setUser({
          name: data.name,
          email: data.email,
          role_id: Number(data.role_id),
          token: data.token,
        }),
      );

      // Set token in axios header for subsequent requests
      api.defaults.headers.common.Authorization = data.token;

      const shouldRemember = rememberMe === true;
      if (shouldRemember) localStorage.setItem("token", data.token);
      else localStorage.removeItem("token");

      return data;
    } catch (err) {
      throw err;
    }
  };

// Fetches saved addresses of the authenticated user
// GET /user/address
export const fetchAddressesThunk = () => async (dispatch) => {
  try {
    ensureAuthHeader();
    const { data } = await api.get("/user/address");
    dispatch(setAddressList(data));
  } catch (err) {
    toast.error("Adresler yüklenemedi");
    console.error("Addresses fetch error:", err);
  }
};

// Adds a new address for the user
// POST /user/address
export const addAddressThunk = (addressPayload) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.post("/user/address", addressPayload);
    toast.success("Adres eklendi");
    dispatch(fetchAddressesThunk());
  } catch (err) {
    toast.error("Adres eklenemedi");
    console.error("Add address error:", err);
  }
};

// Updates an existing address
// PUT /user/address
export const updateAddressThunk = (addressPayload) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.put("/user/address", addressPayload);
    toast.success("Adres güncellendi");
    dispatch(fetchAddressesThunk());
  } catch (err) {
    toast.error("Adres güncellenemedi");
    console.error("Update address error:", err);
  }
};

// Deletes an address by id
// DELETE /user/address/:addressId
export const deleteAddressThunk = (addressId) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.delete(`/user/address/${addressId}`);
    toast.success("Adres silindi");
    dispatch(fetchAddressesThunk());
  } catch (err) {
    toast.error("Adres silinemedi");
    console.error("Delete address error:", err);
  }
};

// CARD THUNKS

// GET /user/card - fetch saved cards
export const fetchCardsThunk = () => async (dispatch) => {
  try {
    ensureAuthHeader();
    const { data } = await api.get("/user/card");
    dispatch(setCreditCards(data));
  } catch (err) {
    toast.error("Kartlar yüklenemedi");
    console.error("Cards fetch error:", err);
  }
};

// POST /user/card - save new card
export const addCardThunk = (cardPayload) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.post("/user/card", cardPayload);
    toast.success("Kart kaydedildi");
    dispatch(fetchCardsThunk());
  } catch (err) {
    toast.error("Kart kaydedilemedi");
    console.error("Add card error:", err);
  }
};

// PUT /user/card - update existing card
export const updateCardThunk = (cardPayload) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.put("/user/card", cardPayload);
    toast.success("Kart güncellendi");
    dispatch(fetchCardsThunk());
  } catch (err) {
    toast.error("Kart güncellenemedi");
    console.error("Update card error:", err);
  }
};

// DELETE /user/card/:cardId - delete card
export const deleteCardThunk = (cardId) => async (dispatch) => {
  try {
    ensureAuthHeader();
    await api.delete(`/user/card/${cardId}`);
    toast.success("Kart silindi");
    dispatch(fetchCardsThunk());
  } catch (err) {
    toast.error("Kart silinemedi");
    console.error("Delete card error:", err);
  }
};
