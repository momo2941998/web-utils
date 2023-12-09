import { notification } from "antd";

export const errorMsg = (msg: string, error?: any) => {
  notification.error({
    message: msg,
    duration: 3
  })
  console.error(error);
}