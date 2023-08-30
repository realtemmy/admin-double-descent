import React from "react";

const EditCategory = ({ category }) => {
  const defaultFields = { ...category };
  console.log(category);
  const handleSubmit = () => {};
  return (
    <div>
      <div className="container">
        <h4>Create Category</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Category name:</label>
            <br />
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <br />
            <input type="file" name="image" id="image" required />
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

export default EditCategory;
