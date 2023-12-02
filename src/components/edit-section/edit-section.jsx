import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDocument } from "../../helperFunctions";
import { setSection } from "../../redux/slices/section/sectionSlice";
import Loader from "../loader/Loader";

// import "./edit-section.scss";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";

const EditSection = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.section.sections);
  const sectionId = useSelector((state) => state.section.sectionId);
  const categories = useSelector((state) => state.category.categories);

  const defaultSectionField = {
    name: "",
    category: "",
  };

  useEffect(() => {
    console.log(sections);
    const section = sections.find((section) => section.id === sectionId);
    // const sec = getDocument(sections, "65676b246eb7686fb870d339");
    // console.log(sec, section);
    setStateSection(section);
    setIsLoading(false);
  }, [sectionId]);

  const [section, setStateSection] = useState(defaultSectionField);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateSection({ ...section, [name]: value });
  };
  const { name, category } = section;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(section);
    try {
      const res = await (await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/sections/${sectionId}`
      )).json();
      // await res.json()
      console.log(res);
      if(res.status === "success"){
        dispatch(setSection(res.data));
        toast.success("Section edited successfully")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {isLoading && <Loader />}
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
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-2">
          <select
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
            defaultValue={category}
            onChange={handleChange}
          >
            <option selected defaultValue={category} hidden>
              {getDocument(categories, category)?.name}
            </option>
            {categories.map((cat, idx) => (
              <option
                value={cat._id}
                key={idx}
                className="text-gray-900 hover:bg-gray-100"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <Button color="blue-gray" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSection;
