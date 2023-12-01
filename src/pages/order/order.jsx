import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  // TabPanel,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import Loader from "../../components/loader/Loader";

// types of order: delivered, pending, cancelled, paid

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");
  // const [freqValue, setFreqValue] = useState("daily");
  const [loader, setLoader] = useState(false);

  const data = [
    {
      label: "All orders",
      value: "all",
    },
    {
      label: "Pending Orders",
      value: "pending",
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
  // use activeTab to search server for the type of order required
  // console.log(activeTab);
  const testOrder = [
    {
      id: 1,
      products: [
        "dano",
        "corn flakes",
        "fruit and fiber",
        "toys",
        "bread",
        "quaker oats",
      ],
      date: "26th of may, 2023",
      amount: 2000,
      status: "paid",
      user: "realtemmy@mail.com"
    },
    {
      id: 2,
      products: [
        "dano",
        "corn flakes",
        "fruit and fiber",
        "toys",
        "bread",
        "quaker oats",
      ],
      date: "25th of may, 2023",
      amount: 4000,
      status: "paid",
      user: "temmy4jamb@gmail.com"
    },
    {
      id: 3,
      products: [
        "dano",
        "corn flakes",
        "fruit and fiber",
        "toys",
        "bread",
        "quaker oats",
      ],
      date: "28th of may, 2023",
      amount: 9000,
      status: "paid",
      user: "temiloluwaogunti8@gmail.com"
    },
  ];

  const handleConfirmOrder = async (id) => {
    // make a patch request to change status from paid to in-progress
    console.log("Making patch request and updating redux store");
    console.log(id);
    try {
      setLoader(true)
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/order/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("admin-token"),
          },
          body: JSON.stringify({ status: "progress" }),
        }
      );
      const data = await res.json();
      // fint the particular order in redux and update response by their id matah
      setLoader(false)
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  };

  // fetch types
  // const fetchTypes = 

  return (
    <>
      {loader && <Loader />}
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
      {/*  */}
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
          <div className="grid grid-cols-7 gap- py-2 bg-teal-900 mt-4 rounded px-1 font-bold text-white">
            <p className="col-span-1">OrderID</p>
            <p className="col-span-2">Products</p>
            <p className="col-span-1">Customer</p>
            <p className="col-span-1">Date</p>
            <p className="col-span-1">Amount</p>
            <p className="col-span-1">Status</p>
          </div>
          <div className="[&>*:nth-child(even)]:bg-teal-50 [&>*:nth-child(odd)]:bg-teal-100">
            {testOrder.map((order, idx) => (
              <div
                className="grid grid-cols-7 gap-2 p-2 rounded mt-2 "
                key={idx}
              >
                <p className="col-span-1">{order.id}</p>
                <p className="col-span-2">{order.products.join(", ")}</p>
                <p className="col-span-1 truncate">{order.user}</p>
                <p className="col-span-1">{order.date}</p>
                <p className="col-span-1">&#x20A6;{order.amount}</p>
                <p className="col-span-1">
                  <Button
                    color="green"
                    size="sm"
                    className="px-3 self-center"
                    onClick={() => handleConfirmOrder(order.id)}
                  >
                    <span className="text-xs">Confirm order</span>  
                  </Button>
                </p>
              </div>
            ))}
          </div>
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
