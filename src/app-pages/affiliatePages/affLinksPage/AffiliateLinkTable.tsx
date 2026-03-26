import { CopyIcon, PlusIcon } from "@/assets/icons";
import Badge from "@/components/common/badge/Badge";
import Button from "@/components/common/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/common/table";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { AffiliateLinkType } from "@/types/api-response.types";
import { useCallback, useEffect, useState } from "react";
import CreateAffiliateLinkModal from "./CreateAffLinkModal";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/common/Pagination";
import TableLimitDropDown from "@/components/common/table/TableLimitDropDown";
import TableSpinner from "@/components/common/table/TableSpinner";
import TableNoContent from "@/components/common/table/TableNoContent";
import { Tooltip } from "@/components/common/Tooltip";
// social icons
import FacebookIcon from "@/assets/social-icons/facebook.svg";
import WhatsAppicon from "@/assets/social-icons/whatsapp.svg";
import PinterestIcon from '@/assets/social-icons/pinterest.svg';

export default function AffiliateLinkTable() {
  const [affiliate_links, setAffiliateLinks] = useState<
    Array<AffiliateLinkType>
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const { showNotification } = useNotification();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAffiliateLinks(page, limit);
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

  async function onAffiliateCreate() {
    fetchData();
    setShowAddModal(false);
  }

  async function copyAffiliateLink(affiliate_slug: string) {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_CENSUS_URL}?aff=${affiliate_slug}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.trace(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ComponentCard
        title="Affiliate Links"
        action={
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon /> Add
          </Button>
        }
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
                    Affiliate Slug
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Description
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
                    Actions
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Share on Social
                  </TableCell>
                </TableRow>
              </TableHeader>
              {isLoading ? (
                <TableSpinner />
              ) : affiliate_links.length === 0 ? (
                <TableNoContent />
              ) : (
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {affiliate_links.map((aff) => (
                    <TableRow key={aff.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3 dark:text-gray-400">
                          {aff.affiliate_slug}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 truncate">
                        {aff.description || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={aff.is_active ? "success" : "warning"}
                        >
                          {aff.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Tooltip
                          content={isCopied ? "Text Copied" : "Copy Link"}
                        >
                          <button
                            className="ml-2"
                            onClick={() =>
                              copyAffiliateLink(aff.affiliate_slug)
                            }
                          >
                            <CopyIcon />
                          </button>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex flex-row gap-2">
                          <a target="_blank" className="h-6 w-6" href={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_CENSUS_URL}?aff=${aff.affiliate_slug}`}`}>
                        <FacebookIcon />
                        </a>
                        <a target="_blank" className="h-6 w-6" href={`https://api.whatsapp.com/send?text=${`${process.env.NEXT_PUBLIC_CENSUS_URL}?aff=${aff.affiliate_slug}`}`}>
                        <WhatsAppicon />
                        </a>
                        <a target="_blank" className="h-6 w-6" href={`https://pinterest.com/pin/create/button/?url=${`${process.env.NEXT_PUBLIC_CENSUS_URL}?aff=${aff.affiliate_slug}`}&description=Census Travel`}>
                        <PinterestIcon />
                        </a>
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
      <CreateAffiliateLinkModal
        isOpen={showAddModal}
        closeModal={() => setShowAddModal(false)}
        handleSave={onAffiliateCreate}
      />
    </>
  );
}
