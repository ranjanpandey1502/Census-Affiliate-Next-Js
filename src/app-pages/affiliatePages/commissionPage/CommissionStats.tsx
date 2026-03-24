import {
  AlertIcon,
  CalenderIcon,
  DollarLineIcon,
  UserCircleIcon,
} from "@/assets/icons";
import { MetricCard } from "@/components/common/MetricCard";
import Spinner from "@/components/common/Spinner";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { CommissionMetricType } from "@/types/api-response.types";
import { useEffect, useState } from "react";

export default function CommissionStats() {
  const [commissionMetric, setCommissionMetric] =
    useState<CommissionMetricType | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.getCommissionMetrics();
        setCommissionMetric(res.data.data);
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Failed to get Commission Metric",
        });
      }
    })();
  }, []);
  if (!commissionMetric)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      <MetricCard
        icon={
          <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
        }
        card_title="Contact Users"
        total={commissionMetric.totalContacts}
      />
      <MetricCard
        icon={
          <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
        }
        card_title="Commission Received this Month"
        total={`$ ${commissionMetric.commission.thisMonth.amount.toLocaleString()}`}
        changePercentage={
          commissionMetric.commission.monthlyChange.trend === "up"
            ? commissionMetric.commission.monthlyChange.percentage || 0
            : (commissionMetric.commission.monthlyChange.percentage || 0) - 1
        }
      />
      <MetricCard
        icon={
          <DollarLineIcon className="text-success-600 size-6 dark:text-green-500" />
        }
        card_title="Total Commission Received"
        total={`$ ${commissionMetric.commission.received.amount.toLocaleString()}`}
      />
      <MetricCard
        icon={<AlertIcon className="text-gray-800 size-6 dark:text-white/90" />}
        card_title="Total Pending Commission"
        total={`$ ${commissionMetric.commission.pending.amount.toLocaleString()}`}
      />
    </div>
  );
}
