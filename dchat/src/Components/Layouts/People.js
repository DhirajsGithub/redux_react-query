import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./People.module.css";
import Person from "./Person";
import Profile from "./Profile";
import ReactDOM from "react-dom";

const People = () => {
  const [popUp, setPopUp] = useState(false);
  const [findUser, setFindUser] = useState([]);
  const handlePopUpUser = (user) => {
    setFindUser(user)
    setPopUp(true);
  };
  const users = useSelector((state) => state.users.users);

  // const userLogin = users.find((user) => {
  //   return user.username == userNameGet;
  // });
  const handleBackDrop = () => {
    setPopUp(false);
  };

  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={handleBackDrop}></div>;
  };
  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <Profile userLogin={findUser} />
      </div>
    );
  };

  return (
    <Fragment>
      {popUp &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop-root")
        )}
      {popUp &&
        ReactDOM.createPortal(
          <ModalOverlay userLogin={findUser} />,
          document.getElementById("overlay-root")
        )}
      <div className={classes.people}>
        {users.map((user) => {
          return (
            <Person
              key = {user.username}
              handlePopUpUser={handlePopUpUser}
              profile={user.profile}
              username={user.username}
              describe = {user.describe}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default People;
