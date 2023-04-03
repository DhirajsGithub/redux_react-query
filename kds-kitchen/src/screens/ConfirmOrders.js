import React, { useContext, useState } from "react";
import OrderedList from "../components/OrderedList";
import data from "../assets/orders.json";
import ordersContext from "../store/orders-store";

const ConfirmOrders = () => {
  const ctx = useContext(ordersContext);

  return <OrderedList orders={ctx.confirmOrders} />;
};

export default ConfirmOrders;
