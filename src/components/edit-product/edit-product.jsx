import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDocument } from "../../helperFunctions";

import "./edit-product.scss";
// import "./edit-section.scss";

const EditProduct = () => {
  //   // category, createdAt, description, isFeatured, name, price, section
  //   // On category change, get all the value of sections in the category

  const { products, productId } = useSelector((state) => state.product);
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const product = getDocument(products, productId);
    setProduct(product);
    setIsLoading(false);
  }, [productId, products]);

  const { name, category, description, price, section, isFeatured, image } =
    product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="edit-product-container">
      {isLoading ? (
        <h5>Edit section page loading...</h5>
      ) : (
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Product Name:</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={name}
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
                value={description}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="image">Image</label>
            <div className="image-upload">
              <br />
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                // onChange={(e) => setImage(e.target.files[0])}
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
            <div className="select-container">
              <div className="category">
                <label htmlFor="category">Category</label>
                <br />
                <select name="category" id="category" onChange={handleChange}>
                  <option defaultValue={category}>Provisions</option>
                  <option value="2">Cosmetics</option>
                  <option value="3">Kids</option>
                </select>
              </div>
              <div className="section">
                <label htmlFor="section">Section</label>
                <br />
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  required
                >
                  <option defaultValue={section}>facials</option>
                  <option value="2">canned foods</option>
                  <option value="3">toys</option>
                </select>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <label htmlFor="price">Price:</label>
                <br />
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ms-5">
                <label htmlFor="featured">isFeatured</label>
                <select name="isFeatured" id="featured" onChange={handleChange}>
                  <option defaultValue={isFeatured}>{isFeatured}</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary my-3">Edit product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
