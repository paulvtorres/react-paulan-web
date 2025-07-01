// src/services/clientesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse } from "../shared/types/ApiResponse";

interface Cliente {
  sequence: number;
  id: string;
  razon_social: string;
  address: string;
  phone: string;
}


export const clientesApi = createApi({
  reducerPath: 'clientesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001/' }),
  endpoints: (builder) => ({
    getClientes: builder.query<ApiResponse<Cliente[]>, void>({
      query: () => 'clientes',
    }),
  }),
});

export const { useGetClientesQuery } = clientesApi;