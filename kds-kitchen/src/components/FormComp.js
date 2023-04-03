import React, { useState } from "react";
import classes from "./FormComp.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormComp = ({ LoginUserData }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleError = () => {
    const result =
      userName.length !== 0 && password.length !== 0 && role != null;
    return result;
  };
  const handleOnClick = () => {
    const data = { userName, password, role };

    if (handleError()) {
      LoginUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));

      navigate("/orders");
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className={classes.main}>
      <div>
        <div className={classes.inputDiv}>
          <TextField
            onChange={handleUserName}
            type="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
        </div>
        <div className={classes.inputDiv}>
          <TextField
            type="password"
            id="outlined-basic"
            label="password"
            variant="outlined"
            onChange={handlePassword}
          />
        </div>
        <div className={classes.inputDiv}>
          <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleRole}
          >
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Customer"
            />
            <FormControlLabel
              value="kitchenDept"
              control={<Radio />}
              label="Kitchen Dept"
            />
          </RadioGroup>
        </div>
        <div className={classes.inputDiv}>
          <Button type="submit" onClick={handleOnClick} variant="contained">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormComp;
