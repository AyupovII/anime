import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

  export const fetchAnime = createAsyncThunk('anime/fetchAnime',
  /**  @param id {id: number} */
  async (id) => {
    const { data } = await axios.get(`https://shikimori.one/api/animes/${id}`);
    return data;
  })

const anime = createSlice({
  name: "anime",
  initialState: {
    loading: false,
    animeData: {}
  },
  reducers: {
    setParams: (state, action)=>{
      state.params={...state.params, ...action.payload}
    },

  },
  extraReducers: {
    [fetchAnime.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAnime.fulfilled]: (state, action) => {
      state.animeData = action.payload;
      state.loading = false;
    },
    [fetchAnime.rejected]: (state, action) => { },
  }
});

export const { fetchTodoExample, setIsAccumlateData, setParams } = anime.actions;
export default anime.reducer;