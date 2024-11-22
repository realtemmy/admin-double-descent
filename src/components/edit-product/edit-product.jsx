import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Loader from "../loader/Loader";

import "./edit-product.scss";
import { toast } from "react-toastify";
import axiosService from "../../axios";

const EditProduct = () => {
  const { productId } = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [sectionId, setSectionId] = useState();

  const queryClient = useQueryClient();

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
    queryKey: ["sections", categoryId],
    queryFn: async () => {
      const res = await axiosService.get(`/category/${categoryId}/section`);
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
      setCategoryId(data?.category.id || "");
    }
  }, [data]);

  const [newImage, setNewImage] = useState("");
  let [resImage, setResImage] = useState(null);

  const mutation = useMutation({
    mutationKey: ["product"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("isFeatured", product.isFeatured);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("section", product.section);
      if (resImage) {
        formData.append("image", resImage);
      }

      const response = await axiosService.patch(
        `/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  if (isLoading || catLoading || secLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleChangeCall = (event) => {
    setCategoryId(event.target.value);
    setProduct({ ...product, category: event.target.value });
  };

  const handleImageChanges = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(URL.createObjectURL(event.target.files[0]));
    }
    setResImage(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="edit-product-container">
      {(isLoading || catLoading || secLoading) && <Loader />}
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
                  value={product.name}
                  onChange={handleInputChange}
                  label="Product name"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="brand"
                  required
                  value={product.brand}
                  onChange={handleInputChange}
                  label="Brand"
                />
              </div>
              <div className="mb-4">
                <Textarea
                  name="description"
                  required
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-gray-800 sm:text-sm rounded-md bg-white"
                  >
                    {sections.map((sec, idx) => (
                      <option
                        value={sec._id}
                        key={idx}
                        defaultChecked={product.section}
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
                  onChange={handleInputChange}
                >
                  <option
                    defaultValue={`${product.isFeatured}`}
                    selected
                    hidden
                    className="capitalize"
                  >
                    {`${product.isFeatured}`}
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
