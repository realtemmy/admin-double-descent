import { Routes, Route } from "react-router";

import Navigation from "../../components/navigation/navigation";
import Categories from "../category/categories";
import Dashboard from "../dashboard/dashboard";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<Categories />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Home;
