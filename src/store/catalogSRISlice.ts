import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CatalogSRI } from "../modules/catalogSRI/domain/CatalogSRI";
import type { RootState } from "./index";


interface CatalogsSRIState {
  catalogsSRI: CatalogSRI[];
}

const initialState: CatalogsSRIState = {
  catalogsSRI: [],
};

export const catalogSRISlice = createSlice({
  name: "catalogsSRI",
  initialState,
  reducers: {
    setCatalogsSri: (state, action: PayloadAction<CatalogSRI[]>) => {
      state.catalogsSRI = action.payload;
    },
  },
});

export const { setCatalogsSri } = catalogSRISlice.actions;
export default catalogSRISlice.reducer;