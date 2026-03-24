import Badge from "@/components/common/badge/Badge";
import { Modal } from "@/components/common/modal";
import ModalCard from "@/components/common/modal/ModalCard";
import ModalText from "@/components/common/modal/ModalText";
import AvatarProfile from "@/components/shared/AvatarProfile";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { UserType } from "@/types/api-response.types";
import { useState } from "react";
import { useParams } from "next/navigation";

export type AdminMetaCardProps = {
  data: UserType;
};

export default function AffiliateMetaCard({ data }: AdminMetaCardProps) {
  const [user_status, setUserStatus] = useState(data.status);
  const params = useParams<{id: string}>();
  const [showStatusChangeConfirm, setShowStatusChangeConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  async function changeStatus() {
    try {
      const id = params?.id;
      if (!id) {
        showNotification({
          notificationType: "warning",
          title: "Invalid User id",
        });
        return;
      }
      setIsLoading(true);
      const res = await ApiService.updateUserStatus(
        parseInt(id as string),
        user_status == "active" ? "inactive" : "active",
      );
      showNotification({
        notificationType: "success",
        title: "User status changed",
      });
      setShowStatusChangeConfirm(false);
      setIsLoading(false);
      setUserStatus(res.data.data.status);
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Error Updating Status",
      });
    }
  }
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <AvatarProfile
                first_name={data.first_name || ""}
                last_name={data.last_name || ""}
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left capitalize">
                {data.first_name} {data.last_name}{" "}
                <Badge
                  size="sm"
                  color={
                    user_status === "active"
                      ? "success"
                      : data.status === "pending"
                        ? "warning"
                        : "error"
                  }
                >
                  {data.status}
                </Badge>
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {data.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {data.email}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {data.role}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end"></div>
          </div>
          <div className="w-max">
            <button
              onClick={() => setShowStatusChangeConfirm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              disabled={user_status === "pending"}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                />
              </svg>
              <span className="text-nowrap">
                {user_status === "active" ? "Disable User" : "Enable User"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showStatusChangeConfirm}
        className="max-w-[600px] p-5 lg:p-10"
        onClose={() => {
          setShowStatusChangeConfirm(false);
        }}
      >
        <ModalCard
          heading={
            user_status === "active" ? "Disable Account?" : "Enable Account?"
          }
          content={
            <ModalText
              text={
                user_status === "active"
                  ? "Disabled Users won't be able to login"
                  : "Enable User account and allow login"
              }
            />
          }
          onCancel={() => {
            setShowStatusChangeConfirm(false);
          }}
          onConfirm={changeStatus}
          cancelText="Cancel"
          confirmText={
            isLoading
              ? "Loading"
              : user_status === "active"
                ? "Disable"
                : "Activate"
          }
        />
      </Modal>
    </>
  );
}
