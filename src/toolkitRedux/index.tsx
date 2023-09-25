import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import toolkitReducer from "./toolkitReducer";
import thunk from 'redux-thunk'
import anime from "./anime";
import video from "./video";

const reducer = combineReducers({
  todos: toolkitReducer,
  anime,
  video,
});

export const store = createStore(reducer, applyMiddleware(thunk));
