import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
export interface MyWindow {
  width: number,
  height: number
  online: boolean,
  focus: boolean,
}

export const windowSliceName = 'window'

const initialState = {
  width: 0,
  height: 0,
  online: false,
  focus: false,
} as MyWindow

const windowSlice = createSlice({
  name: windowSliceName,
  initialState,
  reducers: {
    updateSize: (state: MyWindow, action: PayloadAction<Pick<MyWindow, 'width'|'height'>>) => {
      state.width = action.payload.width
      state.height = action.payload.height
    },
    setOnline: (state: MyWindow, action: PayloadAction<boolean>) => {
      state.online = action.payload
    }, 
    setFocus: (state: MyWindow, action: PayloadAction<boolean>) => {
      state.focus = action.payload
    }
  }
})

export const {
  updateSize,
  setOnline,
  setFocus,
} = windowSlice.actions

export const selectWindow = (state: RootState) => state[windowSliceName]

export default windowSlice.reducer