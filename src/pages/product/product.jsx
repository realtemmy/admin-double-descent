import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import axiosService from "../../axios";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/modal";
import Pagination from "../../components/pagination/pagination";

import "./product.scss";

const Product = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [prdId, setPrdId] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpen = () => setModal(!modal);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => axiosService.get(`/products?page=${currentPage}`),
  });

  const mutation = useMutation({
    mutationFn: () => axiosService.delete(`/products/${prdId}`),
    onSuccess: () => {
      queryClient.setQueryData(["sections"], (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((product) => product._id !== prdId);
        }
        return oldData;
      });
      toast.success("Product deleted successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "There was an error deleting product.");
    },
  });

  const handleEditProduct = (productId) => {
    // navigate to product/edit-product
    navigate(`/products/edit-product/${productId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchProductName);
  };

  const handleDeleteCall = (productId) => {
    setModal(true);
    setPrdId(productId);
  };

  const handleProductDelete = () => {
    mutation.mutate();
    setModal(false);
  };

  const handlePageChange = async (currentPage) => {
    setCurrentPage(currentPage);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  if (data.data.length < 1) {
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
      {(mutation.isPending || isLoading) && <Loader />}
      <div className="container">
        <Dialog open={modal} handler={handleOpen}>
          <DialogHeader className="text-center">
            Are you sure you want to delete section?
          </DialogHeader>
          <DialogBody>
            Deleting this section will delete all products available under
            section
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleProductDelete}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <div>
          <div className="flex justify-between items-center">
            <h3>Products</h3>
            <Button
              color="teal"
              className="hover:bg-teal-400"
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
            {data.data.map((product, idx) => (
              <section key={idx}>
                <div className="image">
                  <img src={product.image} alt={product.name} className="img" />
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
          <Pagination
            currentPage={currentPage}
            totalDocs={data.totalDocs}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
