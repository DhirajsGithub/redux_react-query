import React, { useEffect, useState } from "react";
import classes from "./HeaderComp.module.css";
import { NavLink } from "react-router-dom";

const HeaderComp = () => {
  return (
    <div className={classes.main}>
      <NavLink to="/orders">All Orders</NavLink>
      <NavLink to="/confirmOrders">Cofirm Order</NavLink>
    </div>
  );
};

export default HeaderComp;
