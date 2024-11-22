import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";

import Loader from "../loader/Loader";

// import "./create-category.scss";

const CreateCategory = () => {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || image === "") {
      toast.warning("Cannot submit empty name and image");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name.trim());
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/category`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        // Should be formdata
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        setLoading(false);
        // dispatch(createdCategory(data.data));
        toast.success("Category created successfully!");
      } else {
        setLoading(false);
        console.log(data);
        toast.error(data.message || "There was an error creating category");
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };
  // console.log(name, image);
  return (
    <div className="max-w-md mx-auto">
      {loading && <Loader />}
      <div className="mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-xl font-bold text-center text-slate-600 mb-4">
            Create Category
          </h4>
          <div className="mb-4">
            <Input
              type="text"
              label="Category Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              type="file"
              label="Image"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="text-end">
            <Button color="blue-gray" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
