import { Routes, Route } from "react-router";

import Navigation from "../../components/navigation/navigation";
import Dashboard from "../dashboard/dashboard";
import Categories from "../category/categories";
import CreateCategory from "../../components/create-category/create-category";
import EditCategory from "../../components/edit-category/edit-category";
import Sections from "../sections/sections";
import CreateSection from "../../components/create-section/create-section";
import EditSection from "../../components/edit-section/edit-section";
import Product from "../product/product";
import CreateProduct from "../../components/create-product/create-product";
import EditProduct from "../../components/edit-product/edit-product";
import Order from "../order/order";
import Customers from "../../components/customer/customer";
import ImageUploader from "../../components/test";
import EmailComponent from "../../components/email/email";

const Shop = () => {
  return (
    <div className="px-2">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<Categories />} />
          <Route
            path="/category/create-category"
            element={<CreateCategory />}
          />
          <Route path="/upload" element={<ImageUploader />} />
          <Route path="/category/edit-category/:categoryId" element={<EditCategory />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/sections/create-section" element={<CreateSection />} />
          <Route path="/sections/edit-section/:sectionId" element={<EditSection />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/create-product" element={<CreateProduct />} />
          <Route path="/products/edit-product" element={<EditProduct />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/send-email" element={<EmailComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Shop
