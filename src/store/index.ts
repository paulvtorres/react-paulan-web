import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./clientesSlice";
import itemsReducer from "./itemsSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;