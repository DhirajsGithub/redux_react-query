import logo from "./logo.svg";
import "./App.css";
import Login from "./screens/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Orders from "./screens/Orders";
import ConfirmOrders from "./screens/ConfirmOrders";
import HeaderComp from "./components/HeaderComp";

function App() {
  const [userData, setUserData] = useState(null);
  const handleUserData = (data) => {
    setUserData(data);
  };
  useEffect(() => {
    const getUserLocal = async () => {
      const response = await localStorage.getItem("userData");
      const resJson = await JSON.parse(response);
      if (resJson) {
        setUserData(resJson);
      }
    };
    try {
      getUserLocal();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {userData && <HeaderComp />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login handleUserData={handleUserData} />}
        />

        {userData && <Route path="/orders" element={<Orders />} />}
        {userData && (
          <Route path="/confirmOrders" element={<ConfirmOrders />} />
        )}
      </Routes>
    </>
  );
}

export default App;
