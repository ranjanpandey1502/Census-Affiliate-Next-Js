import { EyeIcon } from "@/assets/icons";
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
import TableLimitDropDown from "@/components/common/table/TableLimitDropDown";
import TableNoContent from "@/components/common/table/TableNoContent";
import TableSpinner from "@/components/common/table/TableSpinner";
import { Tooltip } from "@/components/common/Tooltip";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { ContactMessageType } from "@/types/api-response.types";
import { useEffect, useState } from "react";
import MessageDetailModal from "./MessageDetailModal";

export default function MessagesTable() {
  const [messages, setMessages] = useState<Array<ContactMessageType>>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContactMessage, setShowContactMessage] = useState<ContactMessageType | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await ApiService.getContactMessages(page, limit);
        if (res.data) {
          setMessages(res.data.data);
          setTotal(res.data.total);
        }
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Error showing messages",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, limit]);

  return (
    <>
      <ComponentCard title="Contact Messages">
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
                    Message
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
              ) : messages.length === 0 ? (
                <TableNoContent />
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3 capitalize dark:text-gray-400">
                          {message.name || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {message.contact_no || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {message.user?.first_name || "-"} {message.user?.last_name || '-'}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {message.aff || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-16 truncate">
                        {message.message}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Tooltip content="View Details" >
                          <Button
                            onClick={() => setShowContactMessage(message)}
                          >
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
        <div className="border-t flex-col lg:flex-row p-4 border-gray-100 dark:border-gray-800 flex justify-between">
          <TableLimitDropDown
            onChange={(newLimit) => setLimit(newLimit)}
            count={messages.length}
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
        showContactMessage ? <MessageDetailModal closeModal={() => setShowContactMessage(null)} data={showContactMessage} isOpen={showContactMessage !== null} /> : <></>
      }
    </>
  );
}
