import { getClients } from "../modules/client/application/getClients";
import { getItems } from "../modules/item/application/getItems";
import { setClientes } from "../store/clientsSlice";
import { setItems } from "../store/itemsSlice";
import type { AppDispatch } from "../store";
//import { getCatalogsSRI } from "@/modules/catalogSRI/application/getCatalogsSRI";
import { getCatalogsSRI } from "../modules/catalogSRI/application/getCatalogsSRI";
//import { setCatalogsSri } from "@/store/catalogSRISlice";
import { setCatalogsSri } from "../store/catalogSRISlice";

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

    const catalogsSriRes = await getCatalogsSRI();
    if (catalogsSriRes.code === 200) {
      dispatch(setCatalogsSri(catalogsSriRes.data));
    }
  } catch (error) {
    console.error("❌ Error cargando datos iniciales", error);
  }
};