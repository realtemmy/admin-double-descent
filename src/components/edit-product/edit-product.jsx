import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDocument } from "../../helperFunctions";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Loader from "../loader/Loader";

import "./edit-product.scss";
import { toast } from "react-toastify";

const EditProduct = () => {
  const categories = useSelector((state) => state.category.categories);

  const { products, productId } = useSelector((state) => state.product);
  const [product, setProduct] = useState({});
  const [sections, setSections] = useState([]);
  // const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const product = getDocument(products, productId);
    setProduct(product);
    setIsLoading(false);
  }, [productId, products]);

  const {
    name,
    category,
    description,
    price,
    section,
    image,
    isFeatured,
    brand,
  } = product;

  const [newImage, setNewImage] = useState("");
  let [resImage, setResImage] = useState(null);
  let [catId, setCatId] = useState(category);
  let [secId, setSecId] = useState("");
  let [feature, setFeature] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // name, category, description, price, section, resImage, brand
    try {
      setIsLoading(true);
      let categoryRes = catId ? catId : category;
      resImage = resImage ? resImage : image;
      secId = secId ? secId : section;
      catId = catId ? catId : category;
      feature = feature ? feature : isFeatured;
      const serverRes = {
        ...product,
        image: resImage,
        category: categoryRes,
        section: secId,
        isFeatured: feature,
      };
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admin-token"),
          },
          body: serverRes,
        }
      );
      const { data, status } = await res.json();
      if (status === "success") {
        // update store with data
        console.log(data);
        toast.success("Product edited successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSectionsFromCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/category/${categoryId}/section`
      );
      const { data, status } = await res.json();
      if (status === "success") {
        setSections(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCall = (event) => {
    getSectionsFromCategory(event.target.value);
    setCatId(event.target.value);
  };

  const handleImageChanges = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
    setResImage(event.target.files[0]);
  };

  return (
    <div className="edit-product-container">
      {isLoading && <Loader />}
      <div className="mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-xl font-bold text-center uppercase text-slate-600 mb-4">
            Edit Products
          </h4>
          <section className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={handleChange}
                  label="Product name"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="brand"
                  required
                  value={brand}
                  onChange={handleChange}
                  label="Brand"
                />
              </div>
              <div className="mb-4">
                <Textarea
                  name="description"
                  required
                  onChange={handleChange}
                  value={description}
                  label="Description"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  required
                  value={price}
                  onChange={handleChange}
                  label="Price"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  label="Product Image"
                  onChange={handleImageChanges}
                />
              </div>
              <div className="flex items-baseline justify-between my-2 text-sm">
                {newImage && (
                  <span>
                    Newly selected image:{" "}
                    <img src={newImage} alt="img" className="h-16 rounded" />
                  </span>
                )}
                <span>
                  {newImage ? "Prev" : "Current"} image:{" "}
                  <img src={image} alt="preview" className="h-16 rounded" />
                </span>
              </div>
              <div>
                <div className="mb-4">
                  <select
                    name="category"
                    onChange={handleChangeCall}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
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
                <div className="mb-4">
                  <select
                    name="section"
                    onChange={(event) => setSecId(event)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
                  >
                    {sections.map((sec, idx) => (
                      <option
                        value={sec._id}
                        key={idx}
                        defaultChecked={section === sec._id}
                        className="text-gray-900 hover:bg-gray-100"
                      >
                        {sec.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <select
                  name="category"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
                  onChange={(event) => setFeature(event.target.value)}
                >
                  <option
                    defaultValue={`${isFeatured}`}
                    selected
                    hidden
                    className="capitalize"
                  >{`${isFeatured}`}</option>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="text-end w-full">
                <Button color="blue-gray" type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
