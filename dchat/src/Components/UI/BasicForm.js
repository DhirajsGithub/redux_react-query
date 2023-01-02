import React, { useState, useRef, Fragment } from "react";
import classes from "./BasicForm.module.css";
import { FloatingLabel, Form, Button, Figure } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../store/auth-slice";

import { storage } from "../storage/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const md5 = require("md5");

function BasicForm(props) {
  // const isUserNamePresent = useSelector((state)=> state.users.isUsernamePresent)
  // const isPasswordMatched = useSelector((state)=> state.users.isPasswordMatched)
  const isUserLoggedIn = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  // console.log(usersData)
  const dataFetched = useSelector((state) => state.users.dataFetched);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  const [profileImg, setProfileImg] = useState("https://i.imgur.com/bDLhJiP.jpg");
  const [profileLoading, setProfileLoading] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const describeRef = useRef();
  const [changeUsername, setChangeUsername] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeDescribe, setChangeDescribe] = useState(false);


  const isValid = (value) => value.trim().length > 5;
  const isDescribeValid = (value) => value.trim().length > 30;

  let formIsValid = false;

  ///////////////// Login handler ///////////////////////////////
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLogIn(true);
    let enternedUsername = usernameRef.current.value;
    let enternedpassword = passwordRef.current.value;
    enternedpassword = md5(enternedpassword);

    if (isValid(enternedUsername) && isValid(enternedpassword)) {
      formIsValid = true;
    }

    // checkign the login credentials
    if (dataFetched) {
      let LoggedInUser = usersData.filter((user) => {
        return (
          user.username === enternedUsername &&
          user.password === enternedpassword
        );
      });
      LoggedInUser = LoggedInUser[0];
      if (LoggedInUser) {
        dispatch(
          usersActions.getUsers({
            users: usersData || [],
            dataFetched: dataFetched,
            user: LoggedInUser,
          })
        );
        localStorage.setItem("loggedInUser", JSON.stringify(LoggedInUser));
      }
    }
  };
  //////////////////// signup button handler //////////////////////
  const handleSignUp = () => {
    setIsSignUp(true);
    setIsLogIn(false);
  };

  const handleUsernameChange = (event) => {
    const username = event.target.value;
    if (isValid(username)) {
      setChangeUsername(true);
    } else {
      setChangeUsername(false);
    }
  };

  const handlePasswordChange = (event) => {
    const pass = event.target.value;
    if (isValid(pass)) {
      setChangePassword(true);
    } else {
      setChangePassword(false);
    }
  };

  const handleDescribeChange = (event) => {
    const pass = event.target.value;
    if (isDescribeValid(pass)) {
      setChangeDescribe(true);
    } else {
      setChangeDescribe(false);
    }
  };

  ///////////////// Signup handler new user addition ///////////////////////////////
  const handleSignUpData = (event) => {
    const enternedUsername = usernameRef.current.value;
    const enternedpassword = passwordRef.current.value;
    const enternedDescribe = describeRef.current.value;

    if (
      isValid(enternedUsername) &&
      isValid(enternedpassword) &&
      isDescribeValid(enternedDescribe)
    ) {
      formIsValid = true;
    }
    if (!formIsValid) {
      alert(
        "please enter a valid email 📧 and strong 💪 password 🎫 and describe yourself 💩 🐵 🐒 in atleast 20 words"
      );
      return;
    }
    const details = {
      username: enternedUsername,
      password: md5(enternedpassword),
      describe: enternedDescribe,
      profile: profileImg,
    };
    if (dataFetched) {
      const isUserNamePresent = usersData.some((user) => {
        return user.username == enternedUsername;
      });
      console.log(
        "Signing in ...finding user name in database " + isUserNamePresent
      );
      if (!isUserNamePresent) {
        props.sendUsersData(details);

        setIsSignUp(false);
      } else {
        alert("The username is already used !!!!");
      }
    }
  };

  const handleProfileImage = (event) => {
    setProfileLoading(true);
    const file = event.target.files[0];
    console.log(file);
    const imageRef = ref(storage, `/files/${file.name}`);
    uploadBytes(imageRef, file)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setProfileImg(url);
            setProfileLoading(false);
          })
          .catch((err) => {
            console.log(err.message, "error");
            setProfileLoading(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
        setProfileLoading(false);
      });

    
  };

  return (
    <React.Fragment>
      {/* <Storage /> */}

      <Form onSubmit={handleFormSubmit} className={classes.form}>
        {/* {isLogIn && !isUserNamePresent && !isPasswordMatched && <p style={{color: 'red', fontSize:'1.5rem'}} >Username and Password doesn't match !</p>} */}
        {isLogIn && !isUserLoggedIn && (
          <p style={{ color: "red", fontSize: "1.5rem" }}>
            Username and Password doesn't match !
          </p>
        )}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className={`${
              isLogIn && !isUserLoggedIn ? classes.invalidCredentials : ""
            }`}
            onChange={handleUsernameChange}
            autoComplete="off"
            type="text"
            placeholder="username"
            ref={usernameRef}
            onFocus={() => {
              setIsLogIn(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={`${
              isLogIn && !isUserLoggedIn ? classes.invalidCredentials : ""
            }`}
            type="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={handlePasswordChange}
            onFocus={() => {
              setIsLogIn(false);
            }}
          />
        </Form.Group>

        {isSignUp && (
          <React.Fragment>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="filename"
                onChange={handleProfileImage}
              />
              {/* <Form.Control type="submit" /> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Describe Yourself</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  type="textarea"
                  as="textarea"
                  placeholder="kjfdsa"
                  ref={describeRef}
                  style={{ height: "100px" }}
                  onChange={handleDescribeChange}
                />
              </FloatingLabel>
            </Form.Group>
          </React.Fragment>
        )}
        <div className={classes.btns}>
          {!isSignUp && (
            <React.Fragment>
              <Button
                disabled={
                  !changePassword ||
                  !changeUsername ||
                  props.loading ||
                  !dataFetched
                }
                style={{
                  backgroundColor: "#00e4e3",
                  border: "2px solid #00e4e3",
                  // cursor : lgnDisable ? 'not-allowed' : 'pointer'
                }}
                type="submit"
                variant="primary"
              >
                Login
              </Button>
              <span style={{ color: "rgb(100, 150, 160)" }}>|</span>
              <Button
                style={{
                  backgroundColor: "#a060ff",
                  border: "2px solid #a060ff",
                  // cursor :isSignUp && sgnDisable ? 'not-allowed' : 'pointer'
                }}
                type="button"
                onClick={handleSignUp}
                variant="info"
                disabled={!dataFetched}
              >
                SignUp
              </Button>
            </React.Fragment>
          )}

          {isSignUp && (
            <Button
              disabled={
                !isSignUp ||
                !changePassword ||
                !changeUsername ||
                !changeDescribe ||
                profileLoading
              }
              style={{
                backgroundColor: "#a060ff",
                border: "2px solid #a060ff",
              }}
              type="button"
              onClick={handleSignUpData}
              variant="info"
            >
              {profileLoading ? "Loading..." :  "SignUp"}
            </Button>
          )}
        </div>
      </Form>
    </React.Fragment>
  );
}

export default BasicForm;
