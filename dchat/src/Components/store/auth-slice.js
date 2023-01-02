import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users : [{'name': 'shit'}],
    dataFetched : false,
    user: {},
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState : initialState,
    reducers : {
        getUsers(state, actions){
            state.users = actions.payload.users;
            state.dataFetched = actions.payload.dataFetched;
            state.user = actions.payload.user;
        },
     
    }
})

export const usersActions = userSlice.actions;
export default userSlice;