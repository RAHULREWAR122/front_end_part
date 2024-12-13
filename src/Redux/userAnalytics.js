import { createSlice } from "@reduxjs/toolkit";
import mockData from "../dummyData.json"

export const fetchAnalyticsData = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      setTimeout(() => {
        dispatch(setAnalyticsData(mockData));
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      dispatch(setError("Error fetching analytics data"));
      dispatch(setLoading(false));
    }
};
  

const initialState = {
  userRegistrations: [],
  userStatus: {
    active: 0,
    inactive: 0,
  },
  usersByRegion: [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalyticsData: (state, action) => {
      state.userRegistrations = action.payload.userRegistrations;
   },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { setAnalyticsData, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;

