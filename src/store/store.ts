import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slice/currencyslice";

const store = configureStore({
    reducer:{
        Currency: currencyReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store