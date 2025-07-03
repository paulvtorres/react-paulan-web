import { createSelector } from "reselect";
import type { RootState } from "../../../store";
import type { Client } from "../domain/Client";

// Selector base
export const selectClientes = (state: RootState): Client[] =>
  state.clientes.clientes;

// Selector memoizado para verificar si un cliente con cierto ID ya existe
export const makeSelectClienteExistsById = (id: string) =>
  createSelector([selectClientes], (clientes) =>
    clientes.some((cliente) => cliente.id === id)
  );

// Selector memoizado para buscar un cliente por ID
export const makeSelectClienteById = (id: string) =>
  createSelector([selectClientes], (clientes) =>
    clientes.find((cliente) => cliente.id === id)
  );