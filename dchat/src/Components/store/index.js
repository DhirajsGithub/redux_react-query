import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth-slice";
import chatsSlice from "./chat-slice";

const store = configureStore({
    reducer : {users : userSlice.reducer, chats: chatsSlice.reducer}
})

export default store;