import { EyeIcon } from "@/assets/icons";
import dayjs from "dayjs";
import Button from "@/components/common/button/Button";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/common/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/common/table";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { RegisteredUserType } from "@/types/api-response.types";
import { useEffect, useState } from "react";
import TableSpinner from "@/components/common/table/TableSpinner";
import TableNoContent from "@/components/common/table/TableNoContent";
import TableLimitDropDown from "@/components/common/table/TableLimitDropDown";
import { Tooltip } from "@/components/common/Tooltip";
import WpUserDetailModal from "./WpUserDetailModal";

export default function WpUsersTable() {
  const [registered_users, setRegisteredUsers] = useState<
    Array<RegisteredUserType>
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [showModalUser, setShowModalUser] = useState<RegisteredUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await ApiService.getRegisteredUsers(page, limit);
        if (res.data) {
          setRegisteredUsers(res.data.data);
          setTotal(res.data.total);
        }
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Error Fetching Registered User",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, limit]);

  return (
    <>
      <ComponentCard title="Registered Users">
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
                    Username
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Affiliate Name
                  </TableCell>
                  
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Affiliate Code
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Registered Date
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
              ) : registered_users.length === 0 ? (
                <TableNoContent />
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {registered_users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3 capitalize dark:text-gray-400">
                          {user.first_name || "-"} {user.last_name || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {user.username || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {user.user?.first_name || "-"} {user.user?.last_name || '-'}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {user.aff || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {dayjs(user.createdAt).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Tooltip content="View Details">
                          <Button onClick={() => setShowModalUser(user)}>
                            <EyeIcon />
                          </Button>
                        </Tooltip>
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
            count={registered_users.length}
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
      {
        showModalUser ? <WpUserDetailModal closeModal={() => setShowModalUser(null)} data={showModalUser} isOpen={showModalUser !== null}  /> : <></>
      }
    </>
  );
}
