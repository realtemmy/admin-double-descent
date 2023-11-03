import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";

import {
  setCategoryId,
  deletedCategory,
} from "../../redux/slices/category/categorySlice";
import Modal from "../../components/modal/modal";

import "./category.scss";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [catId, setCatId] = useState("");

  const categories = useSelector((state) => state.category.categories);

  const handleEditCategory = (categoryId) => {
    dispatch(setCategoryId(categoryId));
    navigate("/category/edit-category");
  };

  const handleDeleteCategory = async () => {
    try {
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
      toast.error("There was a problem deleting this category");
    }
  };

  const handleDeleteCall = (categoryId) => {
    setModal(true);
    setCatId(categoryId);
  };
  return (
    <div className="categories-container">
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
          <Button color="teal" onClick={() => navigate("/category/create-category")}>
            <i className="fa fa-plus"></i> Category
          </Button>
        </div>
        <div className="content">
          <header className="grid grid-cols-3">
            <div className="">Image</div>
            <div className="">Category name</div>
            <div className="">Created At</div>
          </header>
          {categories.map((category, idx) => (
            <section
              className="grid grid-cols-3 items-center text-lg text-slate-600"
              key={idx}
            >
              <div className="image">
                <img src={category.image} alt="category-img" className="img" />
              </div>
              <div className="capitalize">{category.name}</div>
              <div className="flex justify-between capitalize">
                <div>
                  {`${new Date(category.createdAt).getDate()} - ${new Date(
                    category.createdAt
                  ).getMonth()} - ${new Date(
                    category.createdAt
                  ).getFullYear()}`}
                </div>
                <div className="icons">
                  <div
                    className="edit"
                    onClick={() => handleEditCategory(category._id)}
                  >
                    <i className="fa fa-edit"></i>
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleDeleteCall(category._id)}
                  >
                    <i className="fa fa-trash"></i>
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
