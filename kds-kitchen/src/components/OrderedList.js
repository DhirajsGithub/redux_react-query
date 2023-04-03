import React, { useContext } from "react";
import OrderCard from "./OrderCard";
import ordersContext from "../store/orders-store";

const OrderedList = ({ orders }) => {
  const ctx = useContext(ordersContext);
  const onPress = (cardId) => {
    ctx.onConfirm(cardId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {orders.map((order, index) => {
        return (
          <OrderCard
            key={order.id}
            name={order.name}
            orders={order.orders}
            onPress={onPress}
            time={order.timeReqMin}
            role={order.role}
            cardId={order.id}
            status={order.status}
            timeS={order.time}
          />
        );
      })}
    </div>
  );
};

export default OrderedList;
