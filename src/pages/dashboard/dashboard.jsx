import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { io } from "socket.io-client";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const socket = io("http://127.0.0.1:4000");

    socket.on("hello", (arg) => {
      console.log(arg); // world
    });

    socket.on("newOrder", (newOrder) => {
      console.log(newOrder);
      // newOrder = JSON.parse(newOrder)
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    // return () => socket.disconnect();
  }, []);

  console.log(orders);
  return (
    <div>
      <Outlet />
      <span>OMO!!!!</span>
      Home page
    </div>
  );
};

export default Dashboard;
