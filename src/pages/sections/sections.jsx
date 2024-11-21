import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import axiosService from "../../axios";

import Loader from "../../components/loader/Loader";

const Sections = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secId, setSecId] = useState("");

  const handleOpen = () => setModal(!modal);

  const mutation = useMutation({
    mutationKey: ["sections"],
    mutationFn: (secId) => deleteSection(secId),
    onSuccess: (secId) => {
      queryClient.setQueryData(["sections"], (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((section) => section.id !== secId);
        }
        return oldData;
      });
      toast.success("Section deleted successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("There was a problem deleting this section.");
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/api/v1/sections`);
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSectionEdit = (sectionId) => {
    navigate(`/sections/edit-section/${sectionId}`);
  };

  const deleteSection = async () => {
    setLoading(true);
    try {
      await axiosService.delete(
        `/sections/${secId}`
      );
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionDelete = (secId) => {
    mutation.mutate(secId);
    setModal(false);
  };

  const handleDeleteCall = (sectionId, name) => {
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
      <Dialog open={modal} handler={handleOpen}>
        <DialogHeader className="text-center">
          Are you sure you want to delete section?
        </DialogHeader>
        <DialogBody>
          Deleting section will delete all products available under section
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSectionDelete}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
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
