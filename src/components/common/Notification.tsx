import {
  AlertHexaIcon,
  CheckCircleIcon,
  ErrorHexaIcon,
  InfoIcon,
} from "@/assets/icons";
import type {
  NotificationObjectType,
  NotificationTypes,
} from "@/providers/notification/notification.context";
import type { ReactNode } from "react";

const NotificationIcons: Record<NotificationTypes, ReactNode> = {
  error: <ErrorHexaIcon />,
  success: <CheckCircleIcon />,
  info: <InfoIcon />,
  warning: <AlertHexaIcon />,
};
const NotificationIconClasses: Record<NotificationTypes, string> = {
  success:
    "text-success-600 dark:text-success-500 bg-success-50 dark:bg-success-500/[0.15]",
  info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/[0.15] dark:text-blue-light-500",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-warning-500/[0.15] dark:text-orange-400",
  error:
    "bg-error-50 text-error-600 dark:bg-error-500/[0.15] dark:text-error-500",
};
const NotificationClasses: Record<NotificationTypes, string> = {
  success: "border-success-500 bg-white p-3 shadow-theme-sm dark:bg-[#1E2634]",
  info: "border-b-4 border-blue-light-500 bg-white p-3 shadow-theme-lg dark:bg-[#1E2634]",
  warning:
    "border-b-4 border-warning-500 bg-white p-3 shadow-theme-sm dark:bg-[#1E2634]",
  error: "border-error-500 bg-white p-3 shadow-theme-sm dark:bg-[#1E2634]",
};

export type NotificationProps = {
    onClose: () => void
} & NotificationObjectType;
export default function Notification({
  notificationType,
  title,
  message,
  onClose
}: NotificationProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 w-full sm:max-w-[340px] rounded-md border-b-4  ${NotificationClasses[notificationType]}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${NotificationIconClasses[notificationType]}`}
        >
          {NotificationIcons[notificationType]}
        </div>

        <div>
          <h4 className="sm:text-base text-sm text-gray-800 dark:text-white/90">
            {title}
          </h4>
          {message ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>

      <button className="text-gray-400 hover:text-gray-800 dark:hover:text-white/90" onClick={onClose}>
        <svg
          className="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
            fill=""
          ></path>
        </svg>
      </button>
    </div>
  );
}
