import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Loader from "../loader/Loader";

import "./edit-product.scss";
import { toast } from "react-toastify";
import axiosService from "../../axios";

const EditProduct = () => {
  const { productId } = useParams();
  const [categoryId, setCategoryId] = useState("");

  // Fetch product
  const { isLoading, data, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosService.get(`/products/${productId}`);
      return res.data;
    },
  });

  // Fetch categories
  const { isLoading: catLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosService.get("/category");
      return res.data;
    },
  });

  const [product, setProduct] = useState({
    name: data?.name || "",
    category: data?.category.id || "",
    description: data?.description || "",
    categoryName: data?.categoryName || "",
    price: data?.price || "",
    section: data?.section || "",
    image: data?.image || "",
    isFeatured: data?.isFeatured || false,
    brand: data?.brand || "",
  });

  // Fetch sections in categories
  const { isLoading: secLoading, data: sections } = useQuery({
    queryKey: ["sections", product.category],
    queryFn: async () => {
      const res = await axiosService.get(
        `/category/${product.category}/section`
      );
      console.log("Response: ", res.data);
      
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      setProduct({
        name: data?.name || "",
        category: data?.category.id || "",
        categoryName: data?.category.name || "",
        description: data?.description || "",
        price: data?.price || "",
        section: data?.section || "",
        image: data?.image || "",
        isFeatured: data?.isFeatured || false,
        brand: data?.brand || "",
      });
    }
  }, [data]);

  const [newImage, setNewImage] = useState("");
  let [resImage, setResImage] = useState(null);

  if (isLoading || catLoading || secLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChangeCall = (event) => {
    setCategoryId(event.target.value);
  };

  const handleImageChanges = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
    setResImage(event.target.files[0]);
  };

  console.log(product.category);
  console.log(sections);
  

  return (
    <div className="edit-product-container">
      {isLoading && <Loader />}
      <div className="mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          // onSubmit={handleSubmit}
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
                  value={product.name}
                  // onChange={handleChange}
                  label="Product name"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="brand"
                  required
                  value={product.brand}
                  // onChange={handleChange}
                  label="Brand"
                />
              </div>
              <div className="mb-4">
                <Textarea
                  name="description"
                  required
                  // onChange={handleChange}
                  value={product.description}
                  label="Description"
                />
              </div>
              <div>
                <Input
                  type="number"
                  name="price"
                  required
                  value={product.price}
                  onChange={product.handleChange}
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
                    Newly selected image:
                    <img
                      src={newImage}
                      alt="img"
                      className="h-16 w-full object-cover rounded"
                    />
                  </span>
                )}
                <span>
                  {newImage ? "Prev" : "Current"} image:
                  <img
                    src={product.image}
                    alt="preview"
                    className="h-16 rounded"
                  />
                </span>
              </div>
              <div>
                <div className="mb-4">
                  <select
                    name="category"
                    onChange={handleChangeCall}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
                  >
                    <option selected defaultValue={product.category} hidden>
                      {product.categoryName}
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
                    // onChange={(event) => setSecId(event)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
                  >
                    {sections.map((sec, idx) => (
                      <option
                        value={sec._id}
                        key={idx}
                        // defaultChecked={section === sec._id}
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
                  // onChange={(event) => setFeature(event.target.value)}
                >
                  <option
                    // defaultValue={`${isFeatured}`}
                    selected
                    hidden
                    className="capitalize"
                  >
                    {/* {`${isFeatured}`} */}
                  </option>
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
