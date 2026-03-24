import { useContext } from "react";
import NotificationContext from "./notification.context";

export default function useNotification() {
  const { showNotification } = useContext(NotificationContext);

  return {
    showNotification,
  };
}
