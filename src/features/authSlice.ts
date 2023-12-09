import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
export interface AuthState {
  username: string,
  jwt: string,
  fullname?: string,
}

export const authSliceName = 'auth'

const initialState = {
  username: '',
  jwt: '',
  fullname: '',
} as AuthState

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    signin: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username
      state.jwt = action.payload.jwt
      state.fullname = action.payload.fullname
    },
    updateAuth: (state: AuthState, action: PayloadAction<Partial<AuthState>>) => {
      if (action.payload.username) state.username = action.payload.username
      if (action.payload.jwt) state.jwt = action.payload.jwt
      if (action.payload.fullname) state.fullname = action.payload.fullname
    },
  }
})

export const {
  signin,
  updateAuth,
} = authSlice.actions

export const selectAuth = (state: RootState) => state[authSliceName]

export default authSlice.reducer