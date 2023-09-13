import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import toolkitReducer from "./toolkitReducer";
import thunk from 'redux-thunk'
import anime from "./anime";

const reducer = combineReducers({
  todos: toolkitReducer,
  anime,
});

export const store = createStore(reducer, applyMiddleware(thunk));
