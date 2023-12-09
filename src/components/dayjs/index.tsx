import dayjs, { Dayjs } from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
var timezone = require("dayjs/plugin/timezone")
dayjs.extend(customParseFormat)
dayjs.extend(timezone)
export const tzText = 'Asia/Ho_Chi_Minh'
export const mydayjs = dayjs

export * from './DatePicker'
export * from './Calender'
export * from './TimePicker'