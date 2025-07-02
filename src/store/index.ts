import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "./clientsSlice";
import itemsReducer from "./itemsSlice";
import catalogsSRIReducer from "./catalogSRISlice"

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
    items: itemsReducer,
    catalogSRI:  catalogsSRIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;