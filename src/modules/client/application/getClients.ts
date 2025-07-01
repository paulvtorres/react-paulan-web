import { API_BASE_URL_CLIENTS } from "../../../shared/constants/config";
import type { Client } from "../domain/Client";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { buildErrorResponse } from "../../../shared/utils/apiErrorResponse";

export const getClients = async (): Promise<ApiResponse<Client[]>> => {
  try {
    const res = await fetch(`${API_BASE_URL_CLIENTS}/api/clients`);
 //  console.log(`${API_BASE_URL_CLIENTS_SERVICES}`)
 //   const res = await fetch(`${API_BASE_URL_CLIENTS_SERVICES}/api/clients`);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`❌ Error en getClients: ${error.message}`);
    return buildErrorResponse<Client[]>("🔌 No hay conexión con el servidor");
  }
};