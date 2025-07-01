import { API_BASE_URL_ITEMS  } from "../../../shared/constants/config";
import type { Item } from "../../item/domain/Item";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { buildErrorResponse } from "../../../shared/utils/apiErrorResponse";

export const getItems = async (): Promise<ApiResponse<Item[]>> => {
  try {
    const res = await fetch(`${API_BASE_URL_ITEMS }/api/items`);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error(`❌ Error en getItems: ${error.message}`);
    return buildErrorResponse<Item[]>("🔌 No hay conexión con el servidor");
  }
};