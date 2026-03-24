'use client'
import { Modal } from "@/components/common/modal";
import type { RegisteredUserType } from "@/types/api-response.types";

type WpUserDetailModalProps = {
  data: RegisteredUserType;
  isOpen: boolean;
  closeModal: () => void;
};
export default function WpUserDetailModal({
  data,
  isOpen,
  closeModal,
}: WpUserDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            User Detail
          </h4>
        </div>
        <div className="flex flex-col">
          <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Registration Detail
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Name</span>:{" "}
                  <span>
                    {data.first_name} {data.last_name}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Email</span>:{" "}
                  <span>
                    {data.email}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Affiliate Slug</span>:{" "}
                  <span>
                    {data.aff}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Username</span>:{" "}
                  <span>
                    {data.username}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Request Detail
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Browser</span>:{" "}
                  <span>
                    {data.browser || '-'}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">IP</span>:{" "}
                  <span>
                    {data.ip || "-"}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Country</span>:{" "}
                  <span>
                    {data.ip_country || "-"}
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-bold">Page</span>:{" "}
                  <span>
                    {data.page || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
