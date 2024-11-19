import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const EditSection = () => {
  const { sectionId } = useParams();

  const {
    isLoading,
    error,
    data: sections,
  } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/sections");
      return res.json();
    },
  });

  const { data: section } = useQuery({
    queryKey: ["sections", sectionId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/sections/${sectionId}`
      );
      return res.json();
    },
  });

  const [formData, setFormData] = useState({
    name: section?.data?.name || "",
    category: section?.data?.category || "",
  });

  useEffect(() => {
    setFormData({
      name: section?.data.name,
      category: section?.data.category,
    });
  }, [section?.data?.category, section?.data?.name]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/sections/${sectionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      if (result.status === "success") {
        toast.success("Section edited successfully!");
      } else {
        toast.error("Failed to edit section.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading sections: {error.message}</div>;
  if (!section || !sections) return <div>Section data is unavailable.</div>;


  return (
    <div className="max-w-md mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-xl font-bold text-center text-slate-600 mb-4">
          Edit section
        </h4>
        <div>
          <Input
            label="Section name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-2">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
          >
            {sections.data.map((sec) => (
              <option value={sec._id} key={sec._id}>
                {sec.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <Button
            color="blue-gray"
            className="hover:bg-blue-gray-400"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSection;
