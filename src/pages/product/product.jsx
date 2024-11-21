import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Input, Button } from "@material-tailwind/react";

import axiosService from "../../axios";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/modal";
import Pagination from "../../components/pagination/pagination";

import "./product.scss";

const Product = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [prdId, setPrdId] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axiosService(`/products?page=${currentPage}`);

  //       // console.log(res);
  //       const { status, totalDocs, data } = res;
  //       if (status === "success") {
  //         setTotalDocs(totalDocs);
  //         setProducts(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message || "There was an error fetching products");
  //     }
  //   };
  //   fetchProducts();
  // }, [currentPage]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => axiosService.get(`/products?page=${currentPage}`),
  });

  const handleEditProduct = (productId) => {
    // navigate to product/edit-product
    navigate(`/products/edit-product/${productId}`);
  };

  const handleProductDelete = async () => {
    try {
      setLoader(true);
      await axiosService.delete(`/products/${prdId}`);
    } catch (error) {
      console.log(error);
      toast.error(
        error.message || "There was a problem deleting this product."
      );
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

  const handlePageChange = async (currentPage) => {
    setCurrentPage(currentPage);
  };
  
  // if (products.length < 1) {
  //   return (
  //     <div className="flex items-center h-full justify-center gap-4">
  //       <h3 className="text-lg font-bold">
  //         No product yet, would you like to create product?
  //       </h3>
  //       <Button
  //         variant="outlined"
  //         size="sm"
  //         onClick={() => navigate("/products/create-product")}
  //       >
  //         <i className="fa fa-plus"></i> product
  //       </Button>
  //     </div>
  //   );
  // }
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
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
