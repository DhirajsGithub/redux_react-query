import React, { useContext, useEffect, useState } from "react";
import OrderedList from "../components/OrderedList";
import data from "../assets/orders.json";
import ordersContext from "../store/orders-store";

const Orders = () => {
  const ctx = useContext(ordersContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(data.orders);
  }, []);
  const handleOnPress = (id) => {
    // const fileterOrder = orders.filter((order) => {
    //   return order.id !== id;
    // });
    // setOrders(fileterOrder);
  };
  return <OrderedList orders={ctx.orders} handleOnPress={handleOnPress} />;
};

export default Orders;
