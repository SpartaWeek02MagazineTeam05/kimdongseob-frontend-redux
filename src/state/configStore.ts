import {configureStore} from "@reduxjs/toolkit";
import userReducer from './modules/UserKit'
import postReducer from './modules/PostKit'


export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  }
});

