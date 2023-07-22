import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../api";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};
// console.log("initialState.posts", initialState.posts);

export const getUser = createAsyncThunk(
  "post/getUser",
  async (id, thunkAPI) => {
    try {
      const data = await fetchUser(id);
      // console.log("userCData", data);
      return data;
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      // console.log("fetcherror", error);
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      // console.log("action.payload.user", action.payload.data);
      // console.log("state.user", state.user);
      state.error = null;
    },
    [getUser.rejected]: (state, action) => {
      // console.log("Raction", action);
      state.isLoading = false;
      state.error = action.payload;
      // console.log("rejected");
    },
  },
});


export default userSlice.reducer;