import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Todos from "./pages/todo";

function App() {
  // seems page would have to reload when delete method is called
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todos />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
