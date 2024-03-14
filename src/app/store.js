import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../feature/auth/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store