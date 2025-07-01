// src/modules/clientes/useClientes.ts
import { useGetClientesQuery } from '../../services/clientesApi';

export function useClientes() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetClientesQuery();

  const clientes = data?.data ?? [];

  const sinConexion = error && 'status' in error && error.status === 'FETCH_ERROR';

  return {
    clientes,
    cargando: isLoading,
    error,
    sinConexion,
    refetch,
  };
}