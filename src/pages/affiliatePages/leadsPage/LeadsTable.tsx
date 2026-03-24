import Badge from "@/components/common/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/common/table";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type {  ContactMessageType } from "@/types/api-response.types";
import { useCallback, useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/common/Pagination";
import TableLimitDropDown from "@/components/common/table/TableLimitDropDown";
import TableSpinner from "@/components/common/table/TableSpinner";
import TableNoContent from "@/components/common/table/TableNoContent";
import dayjs from "dayjs";

export default function LeadsTable() {
  const [affiliate_links, setAffiliateLinks] = useState<
    Array<ContactMessageType>
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getContactLeads(page, limit);
      if (res.status === 204) return;
      if (res) {
        setAffiliateLinks(res.data.data);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Error Fetching Affiliate Links",
      });
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ComponentCard
        title="Contact Leads"
      >
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
                    Phone No
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
                    Created At
                  </TableCell>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <TableSpinner />
              ) : affiliate_links.length === 0 ? (
                <TableNoContent />
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {affiliate_links.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3 dark:text-gray-400">
                          {contact.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {contact.email || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={["CLOSED WON" , "AGREEMENT IN PROCESS"].includes(contact.zoho_status as string) ? "success" : "warning"}
                        >
                          {contact.zoho_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {dayjs(contact.createdAt).format('YYYY-MM-DD')}
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
            count={affiliate_links.length}
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
    </>
  );
}
