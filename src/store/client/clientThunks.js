import api from "../../api/axiosInstance";
import { setUser, setRoles } from "./clientActions";
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

      if (rememberMe) localStorage.setItem("token", data.token);
      else localStorage.removeItem("token");

      return data;
    } catch (err) {
      toast.error("Giriş başarısız");
      throw err;
    }
  };
