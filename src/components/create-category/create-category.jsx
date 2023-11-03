import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { createdCategory } from "../../redux/slices/category/categorySlice";

import "./create-category.scss";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || image === "") {
      toast.warning("Cannot submit empty name and image");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/category`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        // Should be formdata
        body: formData,
      });
      const data = await res.json();
      if(data.status === "success"){
        dispatch(createdCategory(data.data))
        toast.success("Category created successfully!")
      }else{
        toast.error(data.message)
      }
      // console.log(data);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  // console.log(name, image);
  return (
    <div className="create-category-container">
      <div className="container">
        <h4>Create Category</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Category name:</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-info">
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
          <button className="btn btn-primary my-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
