import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../../redux/slices/category/categorySlice";

import "./category.scss";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Here should be get all categories, would change later
  // requirements -> name, image, date
  // section -> name, category
  // Create modal

  const categories = useSelector((state) => state.category.categories);

  const handleEditCategory = (categoryId) => {
    // console.log(categoryId);
    dispatch(setCategoryId(categoryId));
    navigate("/category/edit-category");
  };

  const handleDeleteCategory = async (categoryId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/category/${categoryId}`,
      {
        method: "DELETE",
      }
    );
    console.log(await res.json());
  };
  return (
    <div className="categories-container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categories</h3>
          <Link className="btn btn-primary" to="/category/create-category">
            <i className="fa fa-plus"></i> Category
          </Link>
        </div>
        <div className="content">
          <header className="row">
            <div className="col-2">Image</div>
            <div className="col-4">Category name</div>
            <div className="col-4">Created At</div>
          </header>
          {categories.map((category, idx) => (
            <section className="row align-items-center" key={idx}>
              <div className="col-2 image">
                <img src={category.image} alt="category-img" className="img" />
              </div>
              <div className="col-4 name">{category.name}</div>
              <div className="col-3 date">
                {`${new Date(category.createdAt).getDate()} - ${new Date(
                  category.createdAt
                ).getMonth()} - ${new Date(category.createdAt).getFullYear()}`}
              </div>
              <div className="col-2 icons">
                <div
                  className="edit"
                  onClick={() => handleEditCategory(category._id)}
                >
                  <i className="fa fa-edit"></i>
                </div>
                <div
                  className="delete"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  <i className="fa fa-trash"></i>
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
