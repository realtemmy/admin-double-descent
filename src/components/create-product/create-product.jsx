import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createdProduct } from "../../redux/slices/product/productSlice";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import Loader from "../loader/Loader";

// import "./create-product.scss";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  // category, createdAt, description, isFeatured, name, price, section, image
  const defaultProductField = {
    name: "",
    price: "",
    description: "",
    brand: "",
  };
  const [image, setImage] = useState();
  const [isFeatured, setIsFeatured] = useState("")
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [product, setProduct] = useState(defaultProductField);
  const { name, description, price, brand } = product;

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
      setSections(data);
    }
  };

  const handleChangeCall = (e) => {
    setCategory(e)
    getSectionsFromCategory(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // return console.log(product, category, section, image);
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", category);
      formData.append("section", section);
      formData.append("description", product.description);
      formData.append("isFeatured", isFeatured);
      formData.append("brand", product.brand);
      const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/products`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin-token"),
        },
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        // update redux store
        dispatch(createdProduct(data.data));
        toast.success("Product successfully created.");
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };
  // name, brand, price, desc
  // category, section, isFeatured, image

  // console.log(categories);

  return (
    <div>
      {loading && <Loader />}
      <div className="mt-10">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {/* Add text gradient here for title? */}
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
