import React from "react";
import FormComp from "../components/FormComp";

const Login = ({ handleUserData }) => {
  const LoginUserData = (data) => {
    handleUserData(data);
  };
  return (
    <div>
      <FormComp LoginUserData={LoginUserData} />{" "}
    </div>
  );
};

export default Login;
