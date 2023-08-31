import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "./redux/slices/category/categorySlice";
import { setSection } from "./redux/slices/section/sectionSlice";

import Home from "./pages/home/home";
import Sidebar from "./pages/sidebar/sidebar";


function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() =>{
    const fetchSections = async() =>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/sections`);
      const { data } = await res.json();
      dispatch(setSection(data))
      // console.log(data);
    }
    fetchSections();
  }, [dispatch])
  return (
    <div className="d-flex mx-1">
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="col-9">
        <Home />
      </div>
    </div>
  );
}

export default App;
