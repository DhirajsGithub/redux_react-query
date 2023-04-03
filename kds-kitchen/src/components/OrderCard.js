import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderCard.module.css";
import { Button } from "@mui/material";
import ordersContext from "../store/orders-store";
const OrderCard = ({
  name,
  orders,
  onPress,
  time,
  role,
  cardId,
  status,
  timeS,
}) => {
  const ctx = useContext(ordersContext);
  const [count, setCount] = useState(null);
  const [ready, setReady] = useState(false);
  const d = new Date();
  let ttime = d.getTime();
  const timeReqMinTemp = Number(time) * 60;
  const timeLeftIs = timeReqMinTemp - Math.round((ttime - timeS) / 1000);

  const handleClick = (data) => {
    if (data === "confirm") {
      setCount(0);
      onPress(cardId);
    } else {
      setReady(true);
      setCount(null);
      // ctx.orderReady(cardId);
    }
  };

  // just to render the page
  useEffect(() => {
    let interval;
    if (status === "confirm" && !ready && timeLeftIs >= 0) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [count]);

  let timeLeft = "Order Not Confirm";
  if (status === "confirm" && !ready && timeLeftIs >= 0) {
    timeLeft = timeLeftIs;
  } else if (ready) {
    timeLeft = "Ready for pickup";
  } else if (timeLeftIs < 0) {
    timeLeft = "Delay in Order";
  }
  let bgColor = "white";
  let color = "black";
  if (ready && status === "confirm") {
    bgColor = "lightGreen";
  } else if (timeLeftIs < 300 && timeLeftIs > 0 && status === "confirm") {
    bgColor = "orange";
  } else if (timeLeftIs <= 0 && status === "confirm") {
    bgColor = "red";
    color = "white";
  }

  return (
    <div className={classes.main} style={{ background: bgColor, color: color }}>
      <p className={classes.headPara}>Order For : {name}</p>
      {status === "confirm" && (
        <p className={classes.headPara}>
          Time Left : {Math.round(timeLeft / 60)} mins
        </p>
      )}
      <p className={classes.headPara}>status : {status}</p>
      {status === "confirm" && (
        <p className={classes.headPara}>
          time elapsed : {Math.round((ttime - timeS) / 1000 / 60)} mins
        </p>
      )}
      {/* {status === "confirm" && (
        <p className={classes.headPara}>Order on : {timeS}</p>
      )} */}
      <hr />

      <ul className={classes.ul}>
        {orders.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <div className={classes.btn}>
        {status === "ordered" && (
          <Button
            onClick={() => handleClick("confirm")}
            color="success"
            variant="outlined"
          >
            Confirm
          </Button>
        )}

        {status === "confirm" && (
          <Button
            onClick={() => handleClick("ready")}
            color="success"
            variant="contained"
          >
            Ready
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
