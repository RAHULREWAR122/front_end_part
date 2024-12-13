import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://backend-api-requests1.vercel.app/api"

export const login = createAsyncThunk(
  "auth/login",
  async (authData, thunkAPI) => {
     console.log(authData)
    try {
        const req = await axios.post(`${API_URL}/login`, authData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (req.data) {
            return req.data    
        }else{
            alert("please try again")
        }
      } catch (error) {
        console.log("Error in fetching data:", error.message);
        return thunkAPI.rejectWithValue(error.response.data);  
    }   
  }
);


const initialState = {
  data: null,
  loading: false,
  error: null,
};


const Verification = createSlice({
  name: "verify",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const authReducer = Verification.reducer 
export const AuthSelector = (state) => state.authReducer;
