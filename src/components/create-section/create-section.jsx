import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { createdSection } from "../../redux/slices/section/sectionSlice";
import Loader from "../loader/Loader";

// import "./create-section.scss";

const CreateSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const categories = useSelector((state) => state.category.categories);
  // const sections = useSelector((state) => state.section.sections);

  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!category || !name) {
      return toast.warning("Category cannot be empty.");
    }
    try {
      setLoader(false);
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/sections`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        body: JSON.stringify({ name, category }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setLoader(false);
        toast.success("Section created successfully.");
        dispatch(createdSection(data.data));
      } else {
        setLoader(false);
        console.log(data.message);
        toast.error(
          data.message === "jwt malformed"
            ? "Your session has expired, Login again"
            : data.message
        );
        if(data.message === "jwt malformed"){
          navigate('/login')
        }
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
            <Button color="blue-gray" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;
