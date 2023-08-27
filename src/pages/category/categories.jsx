import { useState } from "react";

import "./category.scss";

const Categories = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
  // Here should be get all categories, would change later
  // requirements -> name, image
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e.target.value);
  }
  console.log(name, image);
  return (
    <div className="categories-container">
      <div className="container">
        <h4>Create Category</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Category name:</label>
            <br />
            <input type="text" name="name" id="name" required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <br />
            <input type="file" name="image" id="image" required onChange={(e) => setImage(e.target.files[0])} />
            <div className="upload">
              <span>^</span>
              <div>upload</div>
            </div>
          </div>
          <button className="btn btn-primary my-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
