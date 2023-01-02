import React, {Fragment, useState} from "react";
import classes from "./Person.module.css";

const Person = (props) => {
  let { username } = props;
  const userLogin = {
    profile : props.profile,
    username : props.username,
    describe : props.describe,
  }
  if (username.length > 15) {
    username = username.slice(0, 14);
  }
  const handlePopUp = () =>{
    props.handlePopUpUser(userLogin)
  }


  return (
    <Fragment>
      <div onClick={handlePopUp} className={classes.person}>
        <div className={classes.img}>
          {" "}
          <img id="profile-photo" src={props.profile} /> <hr />
        </div>
        <h1>{username}</h1>
      </div>
      </Fragment>
  );
};

export default Person;
