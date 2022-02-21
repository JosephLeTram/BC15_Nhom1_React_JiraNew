import { notification } from "antd";
export const notificationFunction = (type, message, description) => {
  notification[type]({
    //action.type =  "success" | "info" | "warning" | "error"
    message: message,
    description: description,
  });
};
