import { useState } from "react";

import CreateCategory from "../../components/create-category/create-category";

import "./category.scss";

const Categories = () => {
  // Here should be get all categories, would change later
  // requirements -> name, image, date
  // section -> name, category
  // Create modal
  const [createCategory, setCreateCategory] = useState(false);

  const handleDeleteCategory = ({ category }) => {
    console.log(category);
  };
  return (
    <div className="categories-container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categories</h3>
          <button className="btn btn-primary">
            <i className="fa fa-plus"></i> Category
          </button>
        </div>
        <div className="content">
          <header className="row">
            <div className="col-3">Image</div>
            <div className="col-4">Category name</div>
            <div className="col-3">Created At</div>
          </header>
          <section className="row align-items-center">
            <div className="col-3 image">
              <img
                src={require("./../../assets/dano.jpg")}
                alt="category-img"
                className="img"
              />
            </div>
            <div className="col-4 name">Provisions</div>
            <div className="col-3 date">28/08/2023</div>
            <div className="col-2 icons">
              <div className="edit">
                <i className="fa fa-edit"></i>
              </div>
              <div className="delete" onClick={handleDeleteCategory}>
                <i className="fa fa-trash"></i>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Categories;
