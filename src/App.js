import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";

import { getCategories } from "./redux/slices/category/categorySlice";
import { getSections } from "./redux/slices/section/sectionSlice";
import { getProducts } from "./redux/slices/product/productSlice";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  // seems page would have to reload when delete method is called
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSections());
  }, [dispatch]);
  return (
    <><Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    <ToastContainer />
    </>
    
  );
}

export default App;
