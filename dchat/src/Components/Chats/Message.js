import React from "react";
import { useSelector } from "react-redux";


const Message = (props) => {

  const localUser = localStorage.getItem("loggedInUser")
  const storedUser = JSON.parse(localUser);
  const itIsMe = () => {
    return storedUser.username === props.username;
  };

  const profileImg = (
    <div className="col-md-2 col-sm-2 col-3 text-center user-img">
      {" "}
      <img
        id="profile-photo"
        src={props.profile}
        className="rounded-circle"
      />{" "}
    </div>
  );
  return (
    <li >
      <div style={{display:'flex', justifyContent:itIsMe() ?'flex-end':''}} className="comments mb-2">
        {!itIsMe() && profileImg}

        <div
          style={{
            background:
            itIsMe()? "#00AF90" : "#A060FF",
          }}
          className="col-md-9 col-sm-9 col-9 comment mb-2"
        >
        <p className="mb-0 text-white message">{props.message}</p>
        <div style={{textAlign: itIsMe()? 'end':''}}>
          <h4 className="m-0">
            <a href="#">{props.username}</a>
          </h4>
          <time className="text-white ml-3">
            {props.time[0]}
          </time>
          </div>
        </div>
        {(itIsMe()) && profileImg}
      </div>
    </li>
  );
};

export default Message;
