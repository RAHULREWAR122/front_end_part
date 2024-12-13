import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth';
import  usersList  from './usersListShow';
import analytics from "./userAnalytics" 

export const store = configureStore({
  reducer: {
    authReducer,  
    usersList,
    analytics
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
    

export default store;

