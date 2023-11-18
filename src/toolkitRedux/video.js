import { createReducer, createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideo = createAsyncThunk('video/fetchVideo',
  /**  @param id {id: number} */
  async (id) => {
    const { data } = await axios.get(`https://shikimori.one/api/animes/${id}/videos`);
    return data;
  })

const video = createSlice({
  name: "video",
  initialState: {
    loading: false,
    videoData: []
  },
  reducers: {

  },
  extraReducers: {
    [fetchVideo.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideo.fulfilled]: (state, action) => {
      state.videoData = action.payload;
      state.loading = false;
    },
    [fetchVideo.rejected]: (state, action) => { },
  }
});

export const { } = video.actions;
export default video.reducer;