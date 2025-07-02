import  { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Client } from "../modules/client/domain/Client";

interface ClientesState {
  clientes: Client[];
}

const initialState: ClientesState = {
  clientes: [],
};

export const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setClientes: (state, action: PayloadAction<Client[]>) => {
      state.clientes = action.payload;
    },
  },
});

export const { setClientes } = clientesSlice.actions;
export default clientesSlice.reducer;