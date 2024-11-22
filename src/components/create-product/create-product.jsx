import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import Loader from "../loader/Loader";
import axiosService from "../../axios";

const CreateProduct = () => {
  const queryClient = useQueryClient();
  // const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultProductField = {
    name: "",
    price: "",
    description: "",
    brand: "",
  };
  const [image, setImage] = useState();
  const [isFeatured, setIsFeatured] = useState("");
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [product, setProduct] = useState(defaultProductField);
  const { name, description, price, brand } = product;

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosService.get("/category");
      return response.data;
    },
  });

  const {
    data: sections = [],
    isLoading: secLoading,
    secError,
  } = useQuery({
    queryKey: ["sections", category],
    queryFn: async () => {
      const response = await axiosService.get(`/category/${category}/section`);
      return response.data;
    },
    enabled: !!category,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setProduct({ ...product, [name]: value });
  };

  const getSectionsFromCategory = async (categoryId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_HOST}/category/${categoryId}/section`
    );
    const { data, status } = await res.json();
    if (status === "success") {
      // setSections(data);
    }
  };

  const handleChangeCall = (e) => {
    setCategory(e);
    getSectionsFromCategory(e);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", category);
      formData.append("section", section);
      formData.append("description", product.description);
      formData.append("isFeatured", isFeatured);
      formData.append("brand", product.brand);
      const response = await axiosService.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product created successfully.");
      setProduct({ name: "", price: "", description: "", brand: "" });
      setImage(null);
      setCategory("");
      setSection("");
      setIsFeatured("");
    },
    onError: (error) => {
      toast.error(error.message || "There was a problem creating product.");
      console.log(error);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>There was an error fetching categories.</div>;
  }
  return (
    <div>
      {(isLoading || mutation.isPaused) && <Loader />}
      <div className="mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-xl font-bold text-center uppercase text-slate-600 mb-4">
            Create Product
          </h4>
          <section className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <Input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => handleChange(e)}
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
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="h-16 w-20 object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="mb-4">
                  <Select
                    name="category"
                    label="Category"
                    onChange={(e) => handleChangeCall(e)}
                  >
                    {categories.map((category, idx) => (
                      <Option value={category._id} key={idx}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-4">
                  <Select
                    name="section"
                    onChange={(e) => setSection(e)}
                    label="Section"
                  >
                    {sections.map((section, idx) => (
                      <Option value={section._id} key={idx}>
                        {section.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="mb-6">
                <Select
                  name="isFeatured"
                  onChange={(e) => setIsFeatured(e)}
                  label="IsFeatured"
                >
                  <Option value="true">True</Option>
                  <Option value="false">False</Option>
                </Select>
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

export default CreateProduct;
