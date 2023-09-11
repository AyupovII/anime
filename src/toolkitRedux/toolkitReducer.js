import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async function () {
  const response = await fetch("https://kitsu.io/api/edge/anime?limit=100");

  const data = await response.json();
  return data;
})

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
  },
  reducers: {
    // fetchTodoExample: async function () {
    //   const response = await fetch("https://kitsu.io/api/edge/trending/anime");
    //   const data = await response.json();
    //   return data;
    // }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => { },
    [fetchTodos.fulfilled]: (state, action) => {
      state.data = action.payload.data
    },
    [fetchTodos.rejected]: (state, action) => { },
  }
});

export const {fetchTodoExample} = todoSlice.actions;
export default todoSlice.reducer;