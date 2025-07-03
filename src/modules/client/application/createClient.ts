import { API_BASE_URL_CLIENTS } from "../../../shared/constants/config";
import type { Client } from "../domain/Client";

export const createClient = async (data: Omit<Client, "sequence">): Promise<Client> => {
  const res = await fetch(`${API_BASE_URL_CLIENTS}/api/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al guardar");

  const json = await res.json();
  return json.data; // estructura esperada { code, message, data }
};