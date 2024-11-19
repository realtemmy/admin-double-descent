import { useEffect } from "react";
import Shop from "../shop/shop";
import Sidebar from "../sidebar/sidebar";

const Home = () => {
  useEffect(() => {
    document.title = "Double decent | Admin";
  }, []);
  return (
    <div>
      <div className="flex">
        <aside className="h-screen fixed">
          <Sidebar />
        </aside>
        <div className="flex-1 overflow-y-auto ml-64 p-4">
          <Shop />
        </div>
      </div>
    </div>
  );
};

export default Home;
