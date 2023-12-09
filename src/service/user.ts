import axios from "axios"
import { constants } from '../constants'
import { AuthState } from "../features/authSlice"

export interface ResponseGetInfo {
  username: string,
  fullname?: string,
}

export type RequestUpdateInfo = Pick<AuthState, 'fullname'>

const getInfo = async (jwt: string) => {
  let url = constants.BE + '/user/info'  
  let response = await axios.get(url, {
    headers: {
      token: jwt
    }
  })
  if (response.status != 200) throw new Error(`Lỗi api`)
  return response.data as ResponseGetInfo
} 

const updateInfo = async (jwt: string, updater: RequestUpdateInfo) => {
  let url = constants.BE + '/user/update'  
  let response = await axios.post(url, updater , {
    headers: {
      token: jwt
    }
  })
  if (response.status != 200) throw new Error(`Lỗi api`)
  return response.data as ResponseGetInfo
} 

export const userService = {
  getInfo,
  updateInfo,
}