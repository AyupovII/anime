import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
  /**  @param params {{ search?: string, page?: number }} */
  async (params) => {
    const notEmptyParams = { ...params };
    Object.keys(notEmptyParams).forEach((key) => {
      if (notEmptyParams[key] === undefined || notEmptyParams[key] === null || notEmptyParams[key] === "")
        delete notEmptyParams[key];
    });
    const { data } = await axios.get("https://shikimori.one/api/animes", { params: notEmptyParams });
    return data;
  });

export const fetchGenres = createAsyncThunk('todos/fetchGenres',
  async () => {
    const  {data}  = await axios.get("https://shikimori.one/api/genres");
    return data;
  })

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    loading: false,
    openFilter:false,
    data: [],
    isAccumlateData: false,
    hasMore: true,
    genresList: [],
    params: {
      limit: 50,
      search: null,
      page: 1,
      censored: true,
      genre: [],
      studio: [],
      franchise: [],
      duration: null,
      rating: null,
      status: null,
      kind: null,
      order: null,
    },
  },
  reducers: {
    setParams: (state, action) => {
      state.params = { ...state.params, ...action.payload }
    },
    setOpenFilter: (state, action)=>{
      state.openFilter=action.payload;
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
    //////////////////////
    [fetchGenres.fulfilled]: (state, action) => {
      state.genresList = action.payload.filter((el)=>el.entry_type==="Anime");
    },
  }
});

export const { fetchTodoExample, setIsAccumlateData, setParams, setOpenFilter } = todoSlice.actions;
export default todoSlice.reducer;