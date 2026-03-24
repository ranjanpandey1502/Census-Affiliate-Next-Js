import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/common/table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
//
import type { RegisteredUserType } from "@/types/api-response.types";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE } from "@/utils/config";
import TableSpinner from "@/components/common/table/TableSpinner";
import TableNoContent from "@/components/common/table/TableNoContent";

export default function RecentRegistration() {
  const { userInfo } = useAuth();
  const [users, setUsers] = useState<Array<RegisteredUserType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await (userInfo?.role === ADMIN_ROLE
          ? ApiService.getRegisteredUsers(1, 6)
          : ApiService.getAffiliateRegisteredUsers(1, 6));
        if (res.data.data) {
          setUsers(res.data.data);
        }
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Failed to Fetched Registered Users",
        });
      } finally {
        setIsLoading(false)
      }
    })();
  }, []);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Registration
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Affiliate Code
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>
          {
            isLoading ? <TableSpinner /> : users.length === 0 ? <TableNoContent /> : <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((user) => (
              <TableRow key={user.id} className="">
                <TableCell className="py-3">
                  <div className="flex flex-col items-start gap-3 text-gray-800 text-theme-sm dark:text-white/90">
                    <div className="">
                      {user.first_name || "-"} {user.last_name || "-"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.aff || "-"}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {dayjs(user.createdAt).format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          }
        </Table>
      </div>
    </div>
  );
}
