import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  // TabPanel,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { MediumLoader } from "../../components/loader/Loader";
import Loader from "../../components/loader/Loader";
import axiosService from "./../../axios";

import { commaSeparatedPrice } from "../../helperFunctions";

const Order = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all");
  // const [miniLoader, setMiniLoader] = useState(false);
  // const [orders, setOrders] = useState([]);

  const data = [
    {
      label: "All orders",
      value: "all",
    },
    {
      label: "Pending Orders",
      value: "confirmed",
    },
    {
      label: "Booked Orders",
      value: "paid",
    },
    {
      label: "Delivered Orders",
      value: "delivered",
    },
    {
      label: "Cancelled Orders",
      value: "cancelled",
    },
  ];

  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders", activeTab],
    queryFn: async () => {
      const response = await axiosService.get(
        `/order?type=${activeTab === "all" ? "" : activeTab}`
      );
      return response.data;
    },
  });

  const mutateOrderStatus = useMutation({
    mutationFn: async (orderId) => {
      await axiosService.patch(`/order/${orderId}/confirm`, {
        status: "confirmed",
      });
    },
    onSuccess: () => {
      toast.success("Order confirmed successfully");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to comfirm order. ");
      console.error(error);
    },
  });

  const handleConfirmOrder = (orderId) => {
    mutateOrderStatus.mutate(orderId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {mutateOrderStatus.isLoading && <Loader />}
      <div className="flex">
        <h2 className="text-slate-600 text-2xl font-bold">Orders:</h2>
        {/* <Tabs value="html" className="max-w-[10rem]">
          <TabsHeader
            className="bg-transparent"
            indicatorProps={{
              className: "bg-gray-900/10 shadow-none !text-gray-900",
            }}
          >
            <Tab
              key="daily"
              value="daily"
              onClick={() => setFreqValue("daily")}
              className={freqValue === "daily" ? "text-gray-900 bg-gray-200 rounded" : ""}
            >
              Daily
            </Tab>
            <Tab
              key="weekly"
              value="weekly"
              onClick={() => setFreqValue("weekly")}
              className={freqValue === "weekly" ? "text-gray-900" : ""}
            >
              Weekly
            </Tab>
          </TabsHeader>
        </Tabs> */}
      </div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b text-end border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <div className="grid grid-cols-7 py-2 bg-teal-900 mt-4 rounded px-1 font-bold text-white">
            <p className="col-span-2">OrderID</p>
            <p className="col-span-2">Products</p>
            <p className="col-span-1">Date</p>
            <p className="col-span-1">Amount</p>
            <p className="col-span-1">Status</p>
          </div>
          {orders.length < 1 ? (
            <div className="flex items-center flex-col mt-10 justify-center">
              <img
                src={require("../../assets/empty-cart.png")}
                alt="img"
                className="w-44"
              />
              <Button className="hover:bg-blue-gray-900">
                Oops! No order available here, yet.
              </Button>
            </div>
          ) : (
            <div className="[&>*:nth-child(even)]:bg-teal-50 [&>*:nth-child(odd)]:bg-teal-100">
              {orders.map((order, idx) => (
                <div
                  className="grid grid-cols-7 gap-2 p-2 rounded mt-2 "
                  key={idx}
                >
                  <p className="col-span-2 text-sm font-semibold break-words">
                    {order._id}
                  </p>
                  <p className="col-span-2">
                    {order.products.map((product) => product.name).join(", ")}
                  </p>
                  {/* <p className="col-span-1 truncate">{order.user}</p> */}
                  <p className="col-span-1 text-sm">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                  <p className="col-span-1">
                    &#x20A6;{commaSeparatedPrice(order.totalAmount)}
                  </p>
                  <p className="col-span-1">
                    {order.status === "paid" ? (
                      <Button
                        color="green"
                        size="sm"
                        className="px-3 self-center hover:bg-green-400"
                        onClick={() => handleConfirmOrder(order._id)}
                      >
                        <span className="text-xs">Confirm order</span>
                      </Button>
                    ) : order.status === "pending" ? (
                      <span className="text-sm capitalize font-semibold">
                        {order.status}
                        <i className="fas fa-shipping-fast text-blue-500"></i>
                      </span>
                    ) : order.status === "delivered" ? (
                      <span className="text-sm capitalize font-semibold">
                        delivered{" "}
                        <i className="fas fa-shopping-basket text-green-500"></i>
                      </span>
                    ) : (
                      <span className="text-sm capitalize font-semibold">
                        cancelled{" "}
                        <i className="fas fa-times-circle text-red-500"></i>
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TabsBody>
      </Tabs>
    </>
  );
};

export default Order;
// Paid/Delivered
//                   <i className="fas fa-shipping-fast text-blue-500"></i>
//                   <span className="pl-1">
//                 <i className="fas fa-shopping-basket text-green-500"></i>
//               </span>
//                   <i className="fas fa-times-circle text-red-500"></i>
