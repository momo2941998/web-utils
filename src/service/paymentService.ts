import { UploadFile } from "antd";
import axios, { Axios, AxiosResponse } from "axios";
import { constants } from "../constants";
import { OptionType } from "../types";

export const compareDay = async (token: string, dateStr: string, file: UploadFile) => {
  let formData = new FormData();
  formData.append("file", file.originFileObj!);
  formData.append("date", dateStr)
  let response = await axios.post(
    `${constants.BE}/compare/momo/day`, 
    formData, 
    {
      headers: { token },
      responseType: 'blob',
    }
  )
  return response
}

export const compareMonth = async (token: string, dateStr: string, file: UploadFile) => {
  let formData = new FormData();
  formData.append("file", file.originFileObj!);
  formData.append("month", dateStr)
  let response = await axios.post(
    `${constants.BE}/compare/momo/month`, 
    formData, 
    {
      headers: { token },
      responseType: 'blob',
    }
  )
  return response
}

interface OptionGetReport {
  type: OptionType,
  dateStr: string,
  payChannels: string[]
}
export const getReport = async (token: string, options: OptionGetReport) => {
  let data: any = {}
  let url = ''
  switch (options.type) {
    case OptionType.DAY:
      data.date = options.dateStr
      url = `${constants.BE}/report/file/day`
      break;
    case OptionType.MONTH:
      data.month = options.dateStr
      url = `${constants.BE}/report/file/month`
      break;
    default:
      break;
  }
  data.payChannels = options.payChannels
  let response = await axios.post(
    url, 
    data,
    {
      responseType: 'blob',
      headers: { token }
    }
  )
  return response
}