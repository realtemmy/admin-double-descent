import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deletedSection } from "../../redux/slices/section/sectionSlice";
import { setSectionId } from "../../redux/slices/section/sectionSlice";
import { getDocument } from "../../helperFunctions";

import { Button } from "@material-tailwind/react";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/Loader";

import "./section.scss";

const Sections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secId, setSecId] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/v1/sections`);
      return response.json();
    },
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleSectionEdit = (sectionId) => {
    // dispatch(setSectionId(sectionId));
    navigate(`/sections/edit-section/${sectionId}`);
  };

  // const handleSectionDelete = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `${process.env.REACT_APP_SERVER_HOST}/sections/${secId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: "Bearer " + localStorage.getItem("admin-token"),
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //       dispatch(deletedSection(secId));
  //       toast.success("Section deleted successfully.");
  //     } else {
  //       toast.error("There was a problem deleting this section.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("There was a problem deleting this section.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDeleteCall = (sectionId) => {
    setModal(true);
    setSecId(sectionId);
  };

  if (data.data.length < 1) {
    return (
      <div className="flex items-center h-full justify-center gap-4">
        <h3 className="text-lg font-bold">
          No section yet, would you like to create section?
        </h3>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => navigate("/sections/create-section")}
        >
          <i className="fa fa-plus"></i> Section
        </Button>
      </div>
    );
  }

  return (
    <div className="sections-container">
      {loading && <Loader />}
      {modal && (
        <Modal
          message={"delete section"}
          onClose={() => setModal(false)}
          // onCallAction={handleSectionDelete}
        />
      )}
      <div className="container">
        <div className="flex justify-between items-center">
          <h3>Sections</h3>
          <Button
            color="teal"
            onClick={() => navigate("/sections/create-section")}
          >
            <i className="fa fa-plus"></i> Section
          </Button>
        </div>
        <div className="content">
          <header className="grid grid-cols-3">
            <div className="col-5">Section name</div>
            <div className="col-5">Category</div>
          </header>
          {data.data.map((section, idx) => (
            <section className="grid grid-cols-3" key={idx}>
              <div className="col-5 capitalize">{section.name}</div>
              <div className="col-5 capitalize">{section.category.name}</div>
              <div className="col-2 icons">
                <div
                  className="edit"
                  onClick={() => handleSectionEdit(section._id)}
                >
                  <i className="fa fa-edit"></i>
                </div>
                <div
                  className="delete"
                  onClick={() => handleDeleteCall(section._id)}
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
