import { API_BASE_URL_CLIENTS } from "../../../shared/constants/config";
import type { Client } from "../domain/Client";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { buildErrorResponse } from "../../../shared/utils/apiErrorResponse";

/*
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
*/

export const getClients = async (): Promise<ApiResponse<Client[]>> => {
  
    return {code:200,message:'OK',data:[
  {
    sequence: 1,id_type:'06',id:'1712775124',razon_social:'PAUÑ TORRES',address:'asdsad',phone:'34324324',email:'3243243'
  }

    ],timestamp: '234234234324324', trace_id: 'ewrewrewrwrewr'}
  
};