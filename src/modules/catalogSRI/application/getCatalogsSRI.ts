import { API_BASE_URL_CATALOGS_SRI } from "../../../shared/constants/config";
import type { CatalogSRI } from "../domain/CatalogSRI";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { buildErrorResponse } from "../../../shared/utils/apiErrorResponse";

export const getCatalogsSRI = async (): Promise<ApiResponse<CatalogSRI[]>> => {
  try {
    const res = await fetch(`${API_BASE_URL_CATALOGS_SRI}/api/catalogsSRI`);
 //  console.log(`${API_BASE_URL_CLIENTS_SERVICES}`)
 //   const res = await fetch(`${API_BASE_URL_CLIENTS_SERVICES}/api/clients`);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`❌ Error en getCatalogsSRI: ${error.message}`);
    return buildErrorResponse<CatalogSRI[]>("🔌 No hay conexión con el servidor");
  }
};