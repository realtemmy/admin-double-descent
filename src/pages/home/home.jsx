import { Routes, Route } from "react-router";

import Navigation from "../../components/navigation/navigation";
import Dashboard from "../dashboard/dashboard";
import Categories from "../category/categories";
import CreateCategory from "../../components/create-category/create-category";
import EditCategory from "../../components/edit-category/edit-category";
import Sections from "../sections/sections";
import CreateSection from "../../components/create-section/create-section";
import EditSection from "../../components/edit-section/edit-section";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<Categories />} />
          <Route
            path="/category/create-category"
            element={<CreateCategory />}
          />
          <Route path="/category/edit-category" element={<EditCategory />} />
          <Route path="/section" element={<Sections />} />
          <Route path="/section/create-section" element={<CreateSection />} />
          <Route path="/section/edit-section" element={<EditSection />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Home;
