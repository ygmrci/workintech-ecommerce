import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import { verifyTokenThunk } from "./store/client/clientThunks";
import { fetchCategoriesThunk } from "./store/product/productThunks";
import api from "./api/axiosInstance";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // On app load, check for token in localStorage and verify it
    const token = localStorage.getItem("token");
    if (token) {
      // Set token in axios default header
      api.defaults.headers.common.Authorization = token;
      // Verify token with backend
      dispatch(verifyTokenThunk());
    }

    // Fetch categories on app load
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
