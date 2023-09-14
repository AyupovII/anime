import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
  /**  @param params {{ search?: string, page?: number }} */
  async (params) => {
    const { data } = await axios.get("https://shikimori.one/api/animes", { params });
    return data;
  })

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    data: [],
    isAccumlateData: false,
    hasMore: true,
    params: {
      limit: 50,
      search: "",
      page: 1,
    },
  },
  reducers: {
    setParams: (state, action)=>{
      state.params={...state.params, ...action.payload}
    },
    setIsAccumlateData: (state, action) => {
      state.isAccumlateData = action.payload
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.data = state.isAccumlateData ? [...state.data, ...action.payload] : action.payload;
      state.loading = false;
      state.hasMore = action.payload.length >= state.params.limit;
    },
    [fetchTodos.rejected]: (state, action) => { },
  }
});

export const { fetchTodoExample, setIsAccumlateData, setParams } = todoSlice.actions;
export default todoSlice.reducer;