import { useEffect, useState } from "react";
import Link from "next/link";
//
import { CheckCircleIcon, InfoIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/common/table";
import { APP_PATHS } from "@/router/paths";
import ApiService from "@/services/Api.service";
import type { UserType } from "@/types/api-response.types";
import Badge from "@/components/common/badge/Badge";
import { Modal } from "@/components/common/modal";
import ModalCard from "@/components/common/modal/ModalCard";
import ModalText from "@/components/common/modal/ModalText";
import { ADMIN_PENDING_ROLE } from "@/utils/config";
import useNotification from "@/providers/notification/useNotification";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/common/Pagination";
import { Tooltip } from "@/components/common/Tooltip";
import TableSpinner from "@/components/common/table/TableSpinner";
import TableNoContent from "@/components/common/table/TableNoContent";
import TableLimitDropDown from "@/components/common/table/TableLimitDropDown";

export default function UsersTable() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const { showNotification } = useNotification();
  const [activateUser, setActivateUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function activateAffiliate() {
    if (!activateUser) return;
    try {
      await ApiService.activateAffiliateAccount(activateUser.id);
      setActivateUser(null);
      showNotification({
        notificationType: "success",
        title: "Affiliate Account Activated",
      });
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Error Activating Affiliate Account",
      });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.getUsers(page, limit);
        if (res) {
          setUsers(res.data.data);
          setTotal(res.data.total);
        }
      } catch (error) {
        showNotification({
          notificationType: "error",
          title: "Failed to fetch Users",
        });
        console.trace(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [limit, page]);
  return (
    <>
      <ComponentCard title="Users">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 "
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Phone No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <TableSpinner />
              ) : users.length === 0 ? (
                <TableNoContent />
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] lg:h-60 max-h-30">
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3 capitalize dark:text-gray-400">
                          {user.first_name} {user.last_name}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize">
                        {user.role}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize">
                        <Badge
                          size="sm"
                          color={
                            user.status === "active"
                              ? "success"
                              : user.status === "pending"
                                ? "warning"
                                : "error"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 capitalize">
                        {user.phone_no || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex items-center gap-2">
                        <Tooltip content="Show User Info">
                          <Link
                            to={APP_PATHS.manageUser(user.id)}
                            className="aspect-square "
                          >
                            <InfoIcon />
                          </Link>
                        </Tooltip>
                        {user.role === "affiliate" &&
                        user.status === ADMIN_PENDING_ROLE ? (
                          <Tooltip content="Enable Affiliate Account">
                            <button onClick={() => setActivateUser(user)}>
                              <CheckCircleIcon />
                            </button>
                          </Tooltip>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </div>
        <div className="border-t p-4 border-gray-100 dark:border-gray-800 flex justify-between">
          <TableLimitDropDown
            onChange={(newLimit) => setLimit(newLimit)}
            count={users.length}
            total={total}
            value={limit}
          />
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
          />
        </div>
      </ComponentCard>
      <Modal
        isOpen={activateUser !== null}
        className="max-w-[600px] p-5 lg:p-10"
        onClose={() => {
          setActivateUser(null);
        }}
      >
        <ModalCard
          heading="Activate Affiliate Account?"
          content={
            <ModalText
              text={`Activate account for ${activateUser?.first_name} ${activateUser?.last_name}? User will be notified by email.`}
            />
          }
          onCancel={() => {
            setActivateUser(null);
          }}
          onConfirm={activateAffiliate}
          cancelText="Cancel"
          confirmText="Activate"
        />
      </Modal>
    </>
  );
}
