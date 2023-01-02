import "./App.css";
import Header from "./Components/Layouts/Header";
import BasicForm from "./Components/UI/BasicForm";
import { Fragment, useState, useEffect } from "react";
import { fetchUsersData } from "./Components/store/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Components/Chats/Chat";
import Profile from "./Components/Layouts/Profile";
import People from "./Components/Layouts/People";
import Loading from "./Components/UI/Loading";

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(
    (state) => state.users.user
  );
  const localUser = localStorage.getItem("loggedInUser")
  const storedUser = JSON.parse(localUser);
  console.log("local user is ", storedUser)



  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState({
    home : true,
    profile : false,
    people : false,
  })

  const handleNavItems = (res) => {
    console.log('nav item is ', res)
    if (res === "home") {
      setPage({
        ...page,
        home : true,
        profile : false,
        people : false
      })
    }else if(res === "profile"){
      setPage({
        ...page,
        profile : true,
        home : false,
        people : false
      })
    }else {
      setPage({
        ...page,
        profile : false,
        home : false,
        people : true
      })
    }
  };

  useEffect(() => {
    // console.log("users fetched");
    dispatch(fetchUsersData());
  }, [dispatch, loading]);

  async function addUsersData(details) {
    console.log("addUserData");
    setLoading(true);
    const response = await fetch(
      "https://dchat-74b80-default-rtdb.firebaseio.com/usersData.json",
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setLoading(false);
  }

  const basicForm = (
    <BasicForm sendUsersData={addUsersData} loading={loading} />
  );

  return (
    <Fragment>
      <Header handleNavItems={handleNavItems} />
      {loading && <Loading/>}
      {!storedUser && basicForm}
      { storedUser&& page.profile && <Profile userLogin={storedUser} />}
      {storedUser && page.people && <People />}
      {storedUser && page.home && <Chat userLogin={storedUser} />}
      <footer className="footer">
      <span>Made with 💙 by <span style={{fontFamily: 'cursive', fontWeight: 'bold'}}>D</span></span>
      <div className="link2"><a href="https://www.instagram.com/_d.codes_/" target="_blank"><i className="fab fa-instagram fa-3x"></i></a></div>
      </footer>
    </Fragment>
  );
}

export default App;
