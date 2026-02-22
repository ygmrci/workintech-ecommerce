import api from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { setCart, setPayment, setAddress } from "./cartActions";

const ensureAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
};

// Creates an order from current cart and form data
// POST /order
export const createOrderThunk = (orderPayload) => async (dispatch) => {
  try {
    ensureAuthHeader();
    const { data } = await api.post("/order", orderPayload);

    toast.success("Siparişiniz başarıyla oluşturuldu.");

    // Reset cart-related state
    dispatch(setCart([]));
    dispatch(setPayment({}));
    dispatch(setAddress({}));

    return data;
  } catch (err) {
    toast.error("Sipariş oluşturulamadı. Lütfen tekrar deneyin.");
    console.error("Create order error:", err);
    throw err;
  }
};
