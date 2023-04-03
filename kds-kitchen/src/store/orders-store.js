import React, { useState, useEffect } from "react";
import data from "../assets/orders.json";

const ordersContext = React.createContext({
  allOrder: [],
  confirmOrders: [],
  onConfirm: (id) => {},
  orderReady: (id) => {},
});

export default ordersContext;

export const OrderContextProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [confirmOrders, setConfirmOrder] = useState([]);
  useEffect(() => {
    setOrders(data.orders);
  }, []);
  const onConfirm = (id) => {
    const confirmOrder = orders.find((item) => {
      return item.id === id;
    });
    if (confirmOrder) {
      confirmOrder.status = "confirm";
      const d = new Date();
      let time = d.getTime();
      confirmOrder.time = time;
      setConfirmOrder((prvOrders) => {
        return [...prvOrders, confirmOrder];
      });

      const fileterOrder = orders.filter((order) => {
        return order.id !== id;
      });
      setOrders(fileterOrder);
    }
  };
  const orderReady = (id) => {
    // const readyOrderIndex = confirmOrders.findIndex((item) => {
    //   return item.id === id;
    // });
    // const readyOrder = confirmOrders[readyOrderIndex];
    // readyOrder.status = "Complete";
    // let newArr = [...confirmOrders];
    // newArr.splice(readyOrderIndex);
    // setConfirmOrder([...newArr, readyOrder]);
    // // setConfirmOrder((prvData) => {
    // //   return [readyOrder, ...prvData];
    // // });
    // console.log(confirmOrders);
  };

  return (
    <ordersContext.Provider
      value={{ orders, confirmOrders, onConfirm, orderReady }}
    >
      {props.children}
    </ordersContext.Provider>
  );
};
