'use client'
import { createContext } from "react";

export type NotificationTypes = "info" | "error" | "success" | "warning";
export type NotificationObjectType = {
  notificationType: NotificationTypes;
  title: string;
  message?: string;
};

export type NotificationContextType = {
  showNotification: (data: NotificationObjectType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => null,
});

export default NotificationContext;