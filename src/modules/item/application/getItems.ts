import { API_BASE_URL_ITEMS  } from "../../../shared/constants/config";
import type { Item } from "../../item/domain/Item";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { buildErrorResponse } from "../../../shared/utils/apiErrorResponse";

/*export const getItems = async (): Promise<ApiResponse<Item[]>> => {
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
};*/


export const getItems = async (): Promise<ApiResponse<Item[]>> => {
  
    return {code:200,message:'OK',data:[
  {
    sequence: 1,code:'A000001',description:'TORNILLOS GRANDES',pvp: 23.23,iva_code: 4, iva_percentage:15, iva_descripcion: '15%', 
  },
  {
    sequence: 2,code:'A000002',description:'TORNILLOS MEDIANOS',pvp: 33.23,iva_code: 3, iva_percentage:14, iva_descripcion: '14%',
  },
  {
    sequence: 3,code:'A000003',description:'TORNILLOS PEQUEÑOS',pvp: 28.23,iva_code: 4, iva_percentage:15, iva_descripcion: '14%', 
  },
  {
    sequence: 4,code:'A000004',description:'EXTINTOR',pvp: 28.23,iva_code: 2, iva_percentage:15, iva_descripcion: '12%', 
  },
  {
    sequence: 5,code:'A000005',description:'TUBO',pvp: 28.23,iva_code: 2, iva_percentage:15, iva_descripcion: '12%', 
  }

    ],timestamp: '234234234324324', trace_id: 'ewrewrewrwrewr'}
  
};

