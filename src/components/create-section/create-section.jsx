import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button, Input, Select, Option } from "@material-tailwind/react";

import Loader from "../loader/Loader";

import axiosService from "../../axios";

const CreateSection = () => {
  // const sections = useSelector((state) => state.section.sections);

  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const { isLoading, data:categories, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosService.get("/category");
      return response.data;
    },
  });
  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!category || !name) {
      return toast.warning("Category cannot be empty.");
    }
    try {
      setLoader(false);
      const { status } = await axiosService.post(`/sections`, {
        name,
        category,
      });

      if (status === "success") {
        toast.success("Section created successfully!");
      }

      // console.log(data);
    } catch (error) {
      setLoader(false);
      console.log("error: ", error);
      toast.error(
        error.message === "jwt malformed"
          ? "Your session has expired, Login again"
          : "There was an error creating session"
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  // console.log("Data: ",data);
  
  return (
    <div className="max-w-md mx-auto">
      <div>
        {loader && <Loader />}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSectionSubmit}
        >
          <h4 className="text-xl font-bold text-center text-slate-600 mb-4">
            Create section
          </h4>
          <div>
            <Input
              label="Section name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="my-2">
            <Select
              name="category"
              // onChange={handleChange}
              onChange={(e) => setCategory(e)}
              label="Choose category"
            >
              {categories.map((category, idx) => (
                <Option value={category.id} key={idx}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="text-end">
            <Button color="blue-gray" className="hover:bg-blue-gray-400" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;
