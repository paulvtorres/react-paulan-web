import { getClients } from "../modules/client/application/getClients";
import { getItems } from "../modules/item/application/getItems";
import { setClientes } from "../store/clientesSlice";
import { setItems } from "../store/itemsSlice";
import type { AppDispatch } from "../store";

export const initializeAppData = async (dispatch: AppDispatch) => {
  try {
    const clientesRes = await getClients();
    if (clientesRes.code === 200) {
      dispatch(setClientes(clientesRes.data));
    }

    const itemsRes = await getItems();
    if (itemsRes.code === 200) {
      dispatch(setItems(itemsRes.data));
    }
  } catch (error) {
    console.error("❌ Error cargando datos iniciales", error);
  }
};