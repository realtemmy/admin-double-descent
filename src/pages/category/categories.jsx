import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  setCategoryId,
  deletedCategory,
} from "../../redux/slices/category/categorySlice";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/modal";

// import "./category.scss";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Double decent | Category";
  });

  const [modal, setModal] = useState(false);
  const [catId, setCatId] = useState("");
  const [loader, setLoader] = useState(false);

  const categories = useSelector((state) => state.category.categories);

  const handleEditCategory = (categoryId) => {
    dispatch(setCategoryId(categoryId));
    navigate("/category/edit-category");
  };

  const handleDeleteCategory = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/category/${catId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin-token"),
          },
        }
      );
      if (res.ok) {
        // remove from redux
        dispatch(deletedCategory(catId));
        toast.success("Category deleted successfully.");
        return;
      }
      toast.error("There was a problem deleting category.");
    } catch (error) {
      console.log(error);
      toast.error(
        error.message || "There was a problem deleting this category"
      );
    } finally {
      setLoader(false);
    }
  };

  const handleViewCategory = (categoryId) => {
    console.log(categoryId);
  };

  const handleDeleteCall = (categoryId) => {
    setModal(true);
    setCatId(categoryId);
  };

  if (categories.length < 1) {
    return (
      <div className="flex items-center h-full justify-center gap-4">
        <h3 className="text-lg font-bold">
          No categories yet, would you like to create a category?
        </h3>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => navigate("/category/create-category")}
        >
          <i className="fa fa-plus"></i> category
        </Button>
      </div>
    );
  }

  return (
    <div className="categories-container">
      {loader && <Loader />}
      {modal && (
        <Modal
          message={"delete category"}
          onClose={() => setModal(false)}
          onCallAction={handleDeleteCategory}
        />
      )}
      <div className="container">
        <div className="flex justify-between items-center">
          <h3>Categories</h3>
          <Button
            color="teal"
            onClick={() => navigate("/category/create-category")}
          >
            <i className="fa fa-plus"></i> Category
          </Button>
        </div>
        <div className="content">
          <header className="grid grid-cols-3 border-b border-gray-500 font-semibold px-2 py-1">
            <div>Image</div>
            <div>Category name</div>
            <div>Created At (d/m/y)</div>
          </header>
          {categories.map((category, idx) => (
            <section
              className="grid grid-cols-3 items-center justify-center text-lg text-slate-600 border-t px-3 border-gray-300 last:border-b last:border-gray-500"
              key={idx}
            >
              <div className="py-2">
                <img
                  src={category.image}
                  alt="category-img"
                  className="img rounded-md object-cover object-center w-14 "
                />
              </div>
              <div className="capitalize">{category.name}</div>
              <div className="flex justify-between capitalize">
                <div>
                  {`${new Date(category.createdAt).getDate()}/${
                    new Date(category.createdAt).getMonth() + 1
                  }/${new Date(category.createdAt).getFullYear()}`}
                </div>
                <div className="flex gap-2">
                  <div
                    title="Edit"
                    className="cursor-pointer"
                    onClick={() => handleEditCategory(category._id)}
                  >
                    <i className="fa fa-edit text-orange-700"></i>
                  </div>
                  <div
                    title="view"
                    className="cursor-pointer"
                    onClick={() => handleViewCategory(category._id)}
                  >
                    <i className="fa-solid fa-eye text-blue-gray-600"></i>
                  </div>
                  <div
                    title="delete"
                    className="cursor-pointer"
                    onClick={() => handleDeleteCall(category._id)}
                  >
                    <i className="fa fa-trash text-red-700"></i>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
