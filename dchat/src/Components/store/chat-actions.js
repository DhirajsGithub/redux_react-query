import { chatsActions } from "./chat-slice";

export const fetchChatsData = () => {

  return async (dispatch) => {
    dispatch(
      chatsActions.showNotification({
        // send: "",
        receive: "Receiving...",
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        "https://dchat-74b80-default-rtdb.firebaseio.com/chatsData.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      
      const chatsData = await fetchData();
      dispatch(
        chatsActions.showNotification({
          // send: "",
          receive: "Received",
        })
      );

      let chatsArray = []
      for (let key in chatsData) {
        chatsArray.push({
          id: key,
          username: chatsData[key].username,
          profile: chatsData[key].profile,
          date: chatsData[key].date,
          message: chatsData[key].message,
        });
      }
     
   
      dispatch(
        chatsActions.addChatsData({
          chats: chatsArray,
        })
      );
    } catch (error) {

      dispatch(
        chatsActions.showNotification({
          // send: "",
          receive: "Error receiving Messages",
        })
      );
    }
  };
};

export const sendChatsData = (chatsData) => {

  return async (dispatch) => {
    // dipatch initail action of sending msg
    dispatch(
      chatsActions.showNotification({
        send: "Sending...",
        // receive: "",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://dchat-74b80-default-rtdb.firebaseio.com/chatsData.json",
        {
          method: "POST",
          body: JSON.stringify(chatsData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("sending chat failed !!!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        chatsActions.showNotification({
          send: "Send",
          // receive: "",
        })
      );
    } catch (error) {
      dispatch(
        chatsActions.showNotification({
          send: "Error Sending msg !!!",
          // receive: "",
        })
      );
    }
  };
};
