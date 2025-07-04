import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';

// ✅ Import your RTK Query API slice
import { authApi } from './api/authApi';
import { patientsApi } from './api/patientsApi'; 
import { ordersApi } from './api/ordersApi';     

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,

    // ✅ Add API slices to the reducer
    [authApi.reducerPath]: authApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,       
      patientsApi.middleware,  
      ordersApi.middleware
    ),
});

export default store;
