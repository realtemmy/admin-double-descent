import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";

import { setProductId } from "../../redux/slices/product/productSlice";
import { deletedProduct } from "../../redux/slices/product/productSlice";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/modal";

import "./product.scss";
import { Button } from "@material-tailwind/react";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);

  const [modal, setModal] = useState(false);
  const [prdId, setPrdId] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [loader, setLoader] = useState(false);

  const handleEditProduct = (productId) => {
    // dispatch the productId
    dispatch(setProductId(productId));
    // navigate to product/edit-product
    navigate("/products/edit-product");
  };

  const handleProductDelete = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/products/${prdId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("admin-token"),
          },
        }
      );
      console.log(res);
      if (res.ok) {
        // delete from product slice
        dispatch(deletedProduct(prdId));
        toast.success("Product deleted successfully.");
      } else {
        toast.error("There was a problem deleting this product.");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was a problem deleting this product.");
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchProductName);
  };

  const handleDeleteCall = (productId) => {
    setModal(true);
    setPrdId(productId);
  };

  if (products.length < 1) {
    return (
      <div className="flex items-center h-full justify-center gap-4">
        <h3 className="text-lg font-bold">
          No product yet, would you like to create product?
        </h3>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => navigate("/products/create-product")}
        >
          <i className="fa fa-plus"></i> product
        </Button>
      </div>
    );
  }
  return (
    <div className="products-container">
      {loader && <Loader />}
      <div className="container">
        {modal && (
          <Modal
            message={"delete product"}
            onClose={() => setModal(false)}
            onCallAction={handleProductDelete}
          />
        )}
        <div>
          <div className="flex justify-between items-center">
            <h3>Products</h3>
            <Button
              color="teal"
              onClick={() => navigate("/products/create-product")}
            >
              <i className="fa fa-plus"></i> Product
            </Button>
          </div>
          <header className="my-4">
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <Input
                type="search"
                label="Search Products"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                onChange={(event) => setSearchProductName(event.target.value)}
              />
              <Button color="blue-gray" type="submit">
                Search
              </Button>
            </form>
          </header>
          <p className="text-2xl pl-4p font-bold my-4">Product catalogue</p>
          <div className="content">
            {products.map((product, idx) => (
              <section key={idx}>
                <div className="image">
                  <img src={product.image} alt="dano" className="img" />
                </div>
                <div className="product-details">
                  <div className="name">{product.name}</div>
                  <div className="price">&#x20A6;{product.price}</div>
                  <div className="btn-container">
                    <button
                      className="edit"
                      onClick={() => handleEditProduct(product._id)}
                    >
                      <i className="fa fa-edit"></i>edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteCall(product._id)}
                    >
                      <i className="fa fa-trash"></i>delete
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
