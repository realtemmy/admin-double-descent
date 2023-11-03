import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createdProduct } from "../../redux/slices/product/productSlice";

import "./create-product.scss";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [sections, setSections] = useState([]);
  // category, createdAt, description, isFeatured, name, price, section, image
  const defaultProductField = {
    name: "",
    isFeatured: "",
    category: "",
    section: "",
    price: "",
    description: "",
    brand: "",
  };
  const [image, setImage] = useState();
  const [product, setProduct] = useState(defaultProductField);
  const { name, description, price, brand } = product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getSectionsFromCategory = async (categoryId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/category/${categoryId}/section`
    );
    const { data, status } = await res.json();
    if (status === "success") {
      setSections(data);
    }
  };

  const handleChangeCall = (e) => {
    handleChange(e);
    getSectionsFromCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(product);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("section", product.section);
      formData.append("description", product.description);
      formData.append("isFeatured", product.isFeatured);
      formData.append("brand", product.brand);
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/products`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        // update redux store
        dispatch(createdProduct(data.data));
        toast.success("Product successfully created.");
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="create-product-container">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h4 className="text-center">Create Product</h4>
          <div>
            <label htmlFor="name">Product Name:</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="brand">Brand:</label>
            <br />
            <input
              type="text"
              name="brand"
              id="brand"
              required
              value={brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <br />
            <textarea
              name="description"
              id="desc"
              cols="30"
              rows="10"
              className="text-area"
              placeholder="Type here"
              required
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="image-upload">
            <label htmlFor="image">Image</label>
            <br />
            <input
              type="file"
              name="image"
              id="image"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="upload">
              <span>
                <i className="fa fa-upload"></i>
              </span>
              <div>upload</div>
            </div>
          </div>
          <div className="select-container">
            <div className="category">
              <label htmlFor="category">Category</label>
              <br />
              <select
                name="category"
                id="category"
                required
                onChange={(e) => handleChangeCall(e)}
              >
                <option defaultValue="" hidden></option>
                {categories.map((category, idx) => (
                  <option value={category._id} key={idx}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="section">
              <label htmlFor="section">Section</label>
              <br />
              <select name="section" id="section" onChange={handleChange}>
                <option defaultValue=""></option>
                {sections.map((section, idx) => (
                  <option value={section._id} key={idx}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <label htmlFor="price">Price:</label>
              <br />
              <input
                type="number"
                name="price"
                id="price"
                required
                value={price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="featured">isFeatured</label>
              <select
                name="isFeatured"
                id="featured"
                className="py-1"
                onChange={handleChange}
              >
                <option defaultValue="" hidden></option>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary my-3">Create product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
