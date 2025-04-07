import { configureStore } from '@reduxjs/toolkit';
import authStateReducer from './authStateSlice';
import deviceTypeReducer from './deviceTypeSlice';

const store = configureStore({
  reducer: {
    authState: authStateReducer,
    isMobile: deviceTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
