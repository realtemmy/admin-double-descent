import { useEffect } from "react";
import Shop from "../shop/shop";
import Sidebar from "../sidebar/sidebar";

const Home = () => {
  useEffect(() => {
    document.title = "Double decent | Admin"
  })
  return (
    <div>
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-full px-4">
          <Shop />
        </div>
      </div>
    </div>
  );
};

export default Home;
