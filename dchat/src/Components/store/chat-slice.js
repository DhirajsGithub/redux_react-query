import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chatsData",
  initialState: { chats: [], notification: {
    send : 'Send',
    receive : 'Receive',
  } },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        send : action.payload.send, 
        receive : action.payload.receive,
    };
    },
    addChatsData(state, action){
        state.chats = action.payload.chats;
    }
  },
});

export const chatsActions = chatsSlice.actions;
export default chatsSlice;
