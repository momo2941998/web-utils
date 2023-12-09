import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
export interface RouterInfo {
  router: string,
  params: Object,
  selectedKeys: string[],
}

export const routerSliceName = 'router'

const initialState = {
  router: "/",
  params: {},
  selectedKeys: []
} as RouterInfo

const routerSlice = createSlice({
  name: routerSliceName,
  initialState,
  reducers: {
    updateRouter: (state: RouterInfo, action: PayloadAction<RouterInfo>) => {
      state.router = action.payload.router
      state.params = action.payload.params
    },
    updateSelectedKeys: (state: RouterInfo, action: PayloadAction<string[]>) => {
      state.selectedKeys = action.payload
    }
  }
})

export const {
  updateRouter,
  updateSelectedKeys,
} = routerSlice.actions

export const selectRouter = (state: RootState) => state[routerSliceName]

export default routerSlice.reducer