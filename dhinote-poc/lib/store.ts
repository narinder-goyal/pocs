import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./redux/auth/authApi";
import authReducer from "./redux/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (gDM) => gDM().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
