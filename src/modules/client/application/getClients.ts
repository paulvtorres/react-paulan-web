//import { API_BASE_URL } from "@/shared/constants/config";
import { API_BASE_URL } from "../../../shared/constants/config";
import type { Client } from "../domain/Client";

export const getClients = async (): Promise<Client[]> => {
  try {
  const res = await fetch(`${API_BASE_URL}/api/clientes`);
  console.log(res)
  return await res.json();
  }
  catch (error){
console.log('Error: ${error}')
return []
  }
};
