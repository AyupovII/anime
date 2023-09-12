import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
  /**  @param params {{ search?: string, page?: number }} */
  async (params) => {
    console.log(params);
    const { data } = await axios.get("https://shikimori.one/api/animes?limit=25&", { params });
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
      limit: 25,
      search: "",
      page: 0,
    }
  },
  reducers: {
    // fetchTodoExample: async  (state, action) =>{
    //   const response = await axios.get("https://shikimori.one/api/animes?limit=23");
    //   console.log(response);
    //   const data = await response.json();
    //   return data;
    // },
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
      console.log(action.payload.length > state.params.limit);
      console.log(action.payload)
    },
    [fetchTodos.rejected]: (state, action) => { },
  }
});

export const { fetchTodoExample, setIsAccumlateData, setParams } = todoSlice.actions;
export default todoSlice.reducer;