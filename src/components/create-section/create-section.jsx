import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createdSection } from "../../redux/slices/section/sectionSlice";

import "./create-section.scss";

const CreateSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  // const sections = useSelector((state) => state.section.sections);

  const defaultSectionField = {
    name: "",
    category: "",
  };

  const [section, setSection] = useState(defaultSectionField);
  const { name } = section;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };
  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/sections`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        body: JSON.stringify(section),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Section created successfully.");
        dispatch(createdSection(data.data));
      }else{
        toast.error(data.message)
      }
      // console.log(data);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message)
    }
  };
  return (
    <div className="create-section-container">
      <div className="container">
        <form className="form" onSubmit={handleSectionSubmit}>
          <div>
            <label htmlFor="name">Section name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-2">
            <label htmlFor="categories">Choose category</label>
            <select name="category" onChange={handleChange} required>
              <option defaultValue="" hidden></option>
              {categories.map((category, idx) => (
                <option value={category.id} key={idx}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;
