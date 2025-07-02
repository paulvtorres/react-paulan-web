import { createSelector } from "reselect";
import type { RootState } from "../../../store";
import type { CatalogSRI } from "../domain/CatalogSRI";

/**
 * Selector base: devuelve todo el catálogo plano
 */
export const selectCatalogItems = (state: RootState): CatalogSRI[] =>
  state.catalogSRI.catalogsSRI;

/**
 * Selector memoizado por tipo (ej: tipo_id, tipo_doc, tipo_pago, etc)
 */
export const makeSelectCatalogByType = (type: string) =>
  createSelector([selectCatalogItems], (items) =>
    items.filter((item) => item.type === type)
  );