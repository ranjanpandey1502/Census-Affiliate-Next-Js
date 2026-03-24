import type { ReactNode } from "react";
import Badge from "./badge/Badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";

export function MetricCard({
  card_title,
  total,
  changePercentage = null,
  icon,
}: {
  card_title: string;
  total: number | string;
  changePercentage?: number | null;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {icon}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {card_title}{" "}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {total}
          </h4>
        </div>
        {changePercentage == null ? <></> : (
          <Badge color={changePercentage > 0 ? "success" : "error"}>
            {changePercentage > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {changePercentage}%
          </Badge>
        )}
      </div>
    </div>
  );
}
