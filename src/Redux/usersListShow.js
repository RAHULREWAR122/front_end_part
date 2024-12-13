import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://backend-api-requests1.vercel.app/api";

export const userList = createAsyncThunk(
  "usersList/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("No data received. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error occurred while fetching users."
      );
    }
  }
);

const initialState = {
  data: [],
  loading: false, 
  error: null, 
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
};

const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    deleteUser(state, action) {
      const userId = action.payload;
      const userIndex = state.data.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.data.splice(userIndex, 1);
        state.deletedUsers += 1;
      }
    },
    calculateAnalytics(state) {
      state.totalUsers = state.data.length;
      state.activeUsers = state.data.filter((user) => user.status === "active").length; 
    },
    resetAnalytics(state) {
      state.totalUsers = 0;
      state.activeUsers = 0;
      state.deletedUsers = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalUsers = action.payload.length;
        state.activeUsers = action.payload.filter(
          (user) => user.status === "active"
        ).length;
      })
      .addCase(userList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users.";
      });
  },
});

export const { deleteUser, calculateAnalytics, resetAnalytics } = usersListSlice.actions;
export default usersListSlice.reducer;

export const selectUsersList = (state) => state.usersList;
