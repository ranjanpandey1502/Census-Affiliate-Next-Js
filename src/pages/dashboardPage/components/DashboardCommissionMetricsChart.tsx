import Chart from "react-apexcharts";
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
import type { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE } from "@/utils/config";

export function CommissionPieChart({
  data,
}: {
  data: CommissionMetricType["commission"];
}) {
  const options: ApexOptions = {
    labels: [
      `Received (${data.received.count})`,
      `Pending (${data.pending.count})`,
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {},
            total: {
              show: true,
            },
          },
        },
      },
    },
  };

  return (
    <div className="">
      <Chart
        options={options}
        series={[data.received.amount, data.pending.amount]}
        type="donut"
      />
    </div>
  );
}

export default function DashboardCommissionMetricsChart() {
  const [commissionMetric, setCommissionMetric] =
    useState<CommissionMetricType | null>(null);
  const { showNotification } = useNotification();
  const {userInfo} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const res = await (userInfo?.role === ADMIN_ROLE ? ApiService.getAdminCommissionMetrics() : ApiService.getCommissionMetrics());
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6">
      <div className="col-span-1 lg:col-span-7 gap-4">
        <div className="grid grid-cols-2 gap-4">
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
                : (commissionMetric.commission.monthlyChange.percentage || 0) -
                  1
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
            icon={
              <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />
            }
            card_title="Total Pending Commission"
            total={`$ ${commissionMetric.commission.pending.amount.toLocaleString()}`}
          />
        </div>
      </div>
      <div className="col-span-1 lg:col-span-5 flex items-center">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-full w-full">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Commission
              </h3>
            </div>
          </div>
          <CommissionPieChart data={commissionMetric.commission} />
        </div>
      </div>
    </div>
  );
}
