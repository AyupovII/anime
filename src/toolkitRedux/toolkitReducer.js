import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', 
/**  @param params {{ search: string }} */
async (params) =>{
  console.log(params);
  const response = await fetch("https://shikimori.one/api/animes?limit=23&" + new URLSearchParams(params));
  console.log(response);
  const data = await response.json();
  return data;
})

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    search: "",
  },
  reducers: {
    // fetchTodoExample: async  (state, action) =>{
    //   const response = await axios.get("https://shikimori.one/api/animes?limit=23");
    //   console.log(response);
    //   const data = await response.json();
    //   return data;
    // },
    setSearch: (state, action)=>{
      state.search = action.payload
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => { },
    [fetchTodos.fulfilled]: (state, action) => {
      state.data = action.payload;
      console.log(action.payload)
    },
    [fetchTodos.rejected]: (state, action) => { },
  }
});

export const {fetchTodoExample, setSearch} = todoSlice.actions;
export default todoSlice.reducer;