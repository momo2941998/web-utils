import axios from "axios"
import { constants } from '../constants'

export interface ResponseLogin {
  jwt: string,
  username: string,
  fullname?: string,
}

export async function userLogin (username: string, password: string) {
  let url = constants.BE + '/auth/login'  
  let response = await axios.post(url, {
    username, password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status != 200) throw new Error(`Lỗi đăng nhập`)
  return response.data as ResponseLogin
}

