import { usersActions } from "./auth-slice";
import { storage } from "../storage/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchUsersData = () => {
  let dataFetching = false;
  return async (dispatch) => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://dchat-74b80-default-rtdb.firebaseio.com/usersData.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch users data!");
      }

      const data = await response.json();
      //   console.log(data)
      dataFetching = true;
      return data;
    };

    try {
      const usersData = await fetchUsers();
      let usersArray = [];
      for (let key in usersData) {
        usersArray.push({
          id: key,
          username: usersData[key].username,
          password: usersData[key].password,
          describe: usersData[key].describe,
          profile: usersData[key].profile,
        });
      }
      dispatch(
        usersActions.getUsers({
          users: usersArray || [],
          isUsernamePresent: false,
          dataFetched: dataFetching,
          isPasswordMatched: false,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};




// export const SendUserData = (userData)=>{
//   console.log("send user data called 1")
//   return async (dispatch) =>{
//     const sendRequest = async () =>{
//       console.log("sendUserData called")
//       const response = await fetch(
//         "https://dchat-74b80-default-rtdb.firebaseio.com/usersData.json",
//         {
//           method: "POST",
//           body: JSON.stringify(userData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if(!response.ok){
//         throw new Error("sending chat failed !!!");
//       }
//       try {
//         await sendRequest();
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   }
// }

// export const UpdateUserData = (id, update) => {
//   console.log("update user dataa");
//   return async (dispatch) => {
//     console.log("inside return async")
//     const updateData = async () => {
//       console.log("first")
//       const response = await fetch(
//         "https://dchat-74b80-default-rtdb.firebaseio.com/usersData/" + id,
//         {
//           method: "PATCH",
//           body: JSON.stringify({
//             Profile : update,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if(!response.ok){
//         console.log("unable to update data")
//         throw new Error ("unable to update data")
//       }
     
//     };
//     try {
//       await updateData()
//       console.log("updated success")
//     } catch (error) {
//       console.log("ksajfksdjfkajsdk")
//       console.log(error)
//     }
//   };
//   console.log("the end")
// };


