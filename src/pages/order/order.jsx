import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");
  // const [freqValue, setFreqValue] = useState("daily");
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
      label: "Delivered Orders",
      value: "delivered",
    },
    {
      label: "Booked Orders",
      value: "booked",
    },
    {
      label: "Cancelled Orders",
      value: "cancelled",
    },
  ];
  // use activeTab to search server for the type of order required
  // console.log(activeTab);
  return (
    <>
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
          {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, praesentium?</p> */}
          <div className="grid grid-cols-6 gap-2 py-2 bg-gray-400 mt-4 rounded px-1">
            <p className="col-span-1">OrderId</p>
            <p className="col-span-2">Products</p>
            <p className="col-span-1">Date</p>
            <p className="col-span-1">Price</p>
            <p className="col-span-1">Status</p>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <p className="col-span-1">order-1234567890</p>
            <p className="col-span-2">Dano, corn flakes, fruit and fiber, garri, Quaker oats</p>
            <p className="col-span-1">26th of may, 2023</p>
            <p className="col-span-1">#30000</p>
            <p className="col-span-1">Paid/Delivered</p>
          </div>
        </TabsBody> 
      </Tabs>
    </>
  );
};

export default Order;



// import React from "react";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import {
//   Square3Stack3DIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
// } from "@heroicons/react/24/solid";

// const Order = () => {
//   const data = [
//     {
//       label: "All orders",
//       value: "all",
//     },
//     {
//       label: "Pending Orders",
//       value: "pending",
//     },
//     {
//       label: "Delivered Orders",
//       value: "delivered",
//     },
//     {
//       label: "Booked Orders",
//       value: "booked",
//     },
//     {
//       label: "Cancelled Orders",
//       value: "cancelled",
//     },
//   ];
//   return (
//     <Tabs value="all">
//       <TabsHeader>
//         {data.map(({ label, value }) => (
//           <Tab key={value} value={value}>
//             {label}
//           </Tab>
//         ))}
//       </TabsHeader>
//       <TabsBody>
//         {/* {data.map(({ value, desc }) => (
//           <TabPanel key={value} value={value}>
//             {desc}
//           </TabPanel>
//         ))} */}
//       </TabsBody>
//     </Tabs>
//   );
// }

// export default Order
