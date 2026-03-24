import { useState, type ReactNode } from "react";
import type { NotificationObjectType } from "./notification.context";
import NotificationContext from "./notification.context";
import Notification from "@/components/common/Notification";

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] =
    useState<NotificationObjectType | null>(null);
  const [visible, setVisible] = useState(false);

  function showNotification(notificationData: NotificationObjectType) {
    setNotification(notificationData);
    setTimeout(() => setVisible(true), 10);
    setTimeout(() => setVisible(false), 3500)
  }

  function closeNotification() {
    setVisible(false); // slide up
    setTimeout(() => setNotification(null), 300);
  }

  return (
    <div className="relative">
      {notification && (
        <div
          className={`fixed top-0 right-0 w-full z-[100000] transition-transform duration-300 ease-out ${
            visible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="p-6 flex justify-end">
            <Notification
              notificationType={notification.notificationType}
              title={notification.title}
              message={notification.message}
              onClose={closeNotification}
            />
          </div>
        </div>
      )}
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
      </NotificationContext.Provider>
    </div>
  );
}
