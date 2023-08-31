import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./edit-section.scss";

const EditSection = () => {
  const sections = useSelector((state) => state.section.sections);
  const sectionId = useSelector((state) => state.section.sectionId);
  const categories = useSelector((state) => state.category.categories);

  // console.log(sections, sectionId);
  const [section, setSection] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const section = sections.find((section) => section._id === sectionId);
    setSection(section);
    setIsLoading(false);
  }, [sectionId, sections]);

  const getCategory = (categoryId) => {
    const doc = categories.find((category) => category._id === categoryId);
    return doc.name;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/sections/${section._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
          body: JSON.stringify(section),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(sectionId);
  // console.log(section);
  return (
    <div className="edit-section-container">
      {isLoading ? (
        <h5>Edit section page loading...</h5>
      ) : (
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Section name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={section.name}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <label htmlFor="categories">Choose category</label>
              <select name="categories">
                <option defaultValue={section._id}>
                  {getCategory(section.category)}
                </option>
                {categories.map((category, idx) => (
                  <option value={category._id} key={idx}>{category.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditSection;
