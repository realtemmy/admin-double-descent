import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSectionId } from "../../redux/slices/section/sectionSlice";

import "./section.scss";

const Sections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sections = useSelector((state) => state.section.sections);
  const categories = useSelector((state) => state.category.categories);

  const getCategory = (categoryId) => {
    const doc = categories.find((category) => category._id === categoryId);
    return doc.name;
  };

  const handleSectionEdit = (sectionId) => {
    dispatch(setSectionId(sectionId));
    navigate("/section/edit-section");
  };

  const handleSectionDelete = async (sectionId) => {
    console.log(sectionId);
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/sections/${sectionId}`,
      {
        method: "DELETE",
      }
    );
    console.log(await res.json());
  };
  return (
    <div className="sections-container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Sections</h3>
          <Link className="btn btn-primary" to="/section/create-section">
            <i className="fa fa-plus"></i> Section
          </Link>
        </div>
        <div className="content">
          <header className="row">
            <div className="col-5">Section name</div>
            <div className="col-5">Category</div>
          </header>
          {sections.map((section, idx) => (
            <section className="row align-items-center" key={idx}>
              <div className="col-5 text-capitalize">{section.name}</div>
              <div className="col-5 text-capitalize">
                {getCategory(section.category)}
              </div>
              <div className="col-2 icons">
                <div
                  className="edit"
                  onClick={() => handleSectionEdit(section._id)}
                >
                  <i className="fa fa-edit"></i>
                </div>
                <div
                  className="delete"
                  onClick={() => handleSectionDelete(section._id)}
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

export default Sections;
