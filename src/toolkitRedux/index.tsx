import {combineReducers, configureStore} from "@reduxjs/toolkit";
import toolkitReducer from "./toolkitReducer";

export const store = configureStore({
  reducer: {
    todos: toolkitReducer
  },
})