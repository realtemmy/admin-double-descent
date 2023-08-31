import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./edit-category.scss";

const EditCategory = () => {
  const categories = useSelector((state) => state.category.categories);
  const categoryId = useSelector((state) => state.category.categoryId);

  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const category = categories.find((category) => category._id === categoryId);
    setCategory(category);
    setIsLoading(false);
  }, [categoryId, categories, setIsLoading]);

  const { name, image } = category;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/category/${category._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          body: JSON.stringify(category),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="edit-category-container">
      {isLoading ? (
        "<h2>Loading Edit page</h2>"
      ) : (
        <div className="container">
          <h4>Edit Category</h4>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Category name:</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-info">
              <label htmlFor="image">Image</label>
              <br />
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
              />
              <div className="d-flex align-items-center">
                <div className="upload">
                  <span>
                    <i className="fa fa-upload"></i>
                  </span>
                  <div>upload</div>
                </div>
                <img src={image} alt={name} className="img" />
              </div>
            </div>
            <button className="btn btn-primary my-2">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
