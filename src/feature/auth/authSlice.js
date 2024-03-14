import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
    role: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            console.log(action);
            state.userInfo= action.payload.userInfo
            state.userToken = action.payload.userToken
            state.success = action.payload.success
            state.role = action.payload.role 
        }
    },
})

export const {addUser} = authSlice.actions

export default authSlice.reducer