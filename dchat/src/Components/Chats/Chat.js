import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { sendChatsData } from "../store/chat-actions";
import { fetchChatsData } from "../store/chat-actions";

// npm install socket.io-client
import { io, Socket } from "socket.io-client";
import Loading from "../UI/Loading";
const socket = io.connect("http://localhost:5500");

const Chat = (props) => {
  const dataFetched = useSelector((state) => state.dataFetched);

  const sStatus = useSelector((state) => state.chats.notification);
  const showChat = false

  const chatsData = useSelector((state) => state.chats.chats);

  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [chatArray, setChatArray] = useState([]);

  const handleOnChange = (event) => {
    setMsg(event.target.value);
  };

  const calDate = () => {
    let date = new Date();
    let myDate = [];
    myDate.push(date.toLocaleTimeString());
    myDate.push(date.toLocaleDateString());
    return myDate;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    dispatch(
      sendChatsData({
        profile : props.userLogin.profile,
        message: msg,
        username: props.userLogin.username,
        date: calDate(),
      })
    );
    // passing payload can be anything img to files to text
    socket.emit("dchat", {
      message: msg,
      username: props.userLogin.username,
      date: calDate(),
      profile: props.userLogin.profile
    });
    setMsg("");
  };
  useEffect(() => {
    dispatch(fetchChatsData());
  }, []);
  useEffect(() => {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
    socket.on(
      "dchat",
      (payload) => {
        setChatArray([...chatArray, payload]);
      },
      []
    );
  });

  const scrollDown = useRef();

  return (
    <div className="container chat-main">
      <div className="row mt-5">
      {sStatus.receive === "Receiving..." && <Loading />}
        {<div className="comments-main pt-4 rounded">
          <div className="chat-messages">
            <ul className="p-0">
              {chatsData.map((chat) => {
                return (
                  <Message
                    key={chat.id}
                    username={chat.username}
                    time={chat.date}
                    message={chat.message}
                    profile = {chat.profile}
                  />
                );
              })}
              {chatArray.map((chat) => {
                return (
                  <Message
                    key={chat.id}
                    username={chat.username}
                    time={chat.date}
                    message={chat.message}
                    profile={chat.profile}
                  />
                );
              })}
              <div ref={scrollDown}></div>
            </ul>
          </div>
          <hr />
          <div className="input-send comment-box-main p-3 mt-3 rounded mb-3">
            <form onSubmit={handleOnSubmit} action="">
              <div
                id="input"
                className="col-md-9 col-sm-9 col-9 pr-0 mr-3 comment-box"
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="message ...."
                  value={msg}
                  onChange={handleOnChange}
                />
              </div>
              <div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
                <button
                  disabled={
                    sStatus.send === "Sending..." ||
                    sStatus.receive === "Receiving..." || msg.length === 0
                  }
                  type="submit"
                  className="btn btn-info"
                >
                  {sStatus.send === "Sending..." ? (
                    sStatus.send
                  ) : (
                    <span>
                      {" "}
                      Send <i className="fa-solid fa-paper-plane"></i>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Chat;
