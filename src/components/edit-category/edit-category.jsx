import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "@material-tailwind/react";
import Loader from "../loader/Loader";

// import "./edit-category.scss";

const EditCategory = () => {
  const categories = useSelector((state) => state.category.categories);
  const categoryId = useSelector((state) => state.category.categoryId);

  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const category = categories.find((category) => category._id === categoryId);
    setCategory(category);
    setIsLoading(false);
  }, [categoryId, categories, setIsLoading]);

  const handleSubmit = async (e) => {
    // I'd still change to formdata type
    e.preventDefault();
    if (!selectedFile && !categoryName) {
      return;
    }
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", categoryName);
    console.log(formData);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/category/${category._id}`,
        {
          method: "PATCH",
          headers: {
            "Authorization":
              "Bearer " + localStorage.getItem("admin-token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(image);
  return (
    <div className="max-w-md mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <h4 className="text-xl font-bold text-center text-slate-600 mb-4">
              Edit Category
            </h4>
            <div className="mb-4">
              <Input
                value={category.name}
                label="Category name"
                name="name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                type="file"
                accept="image/*"
                label="Choose another image"
                name="image"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <div className="flex justify-between">
                {selectedFile && (
                  <span>
                    Selected image: <img src={selectedFile} alt="alt" />{" "}
                  </span>
                )}
                <span>
                  Current Image:
                  <img
                    className="h-14 mt-2 rounded-lg object-cover object-center"
                    src={category.image}
                    alt={category.name}
                  />{" "}
                </span>
              </div>
            </div>
            <div className="text-end">
              <Button color="blue-gray" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
