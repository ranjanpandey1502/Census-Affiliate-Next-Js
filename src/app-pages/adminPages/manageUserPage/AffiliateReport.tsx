import Spinner from "@/components/common/Spinner";
import MetricCards from "@/app-pages/dashboardPage/components/MetricCards";
import MonthlyCommission from "@/app-pages/dashboardPage/components/MonthlyCommission";
import MonthlyVisitCount from "@/app-pages/dashboardPage/components/MonthlyVisitCount";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { AffiliateDashboardAnalyticsResType } from "@/types/api-response.types";
import { useEffect, useState } from "react";

export default function AffiliateReport({ id }: { id: number }) {
  console.log(id);
  const [dashboard_data, setDashboardData] = useState<
    AffiliateDashboardAnalyticsResType["data"] | null
  >(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    (async () => {
      try {
        const res = await ApiService.getAffiliateDashboardMetricsForAdmin(id);
        setDashboardData(res.data.data);
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Failed to fetch Metrics",
        });
      }
    })();
  }, []);
  if (!dashboard_data)
    return (
      <div className="h-20 w-20">
        <Spinner />
      </div>
    );
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <MetricCards
          contactMessage={dashboard_data.metrics.contactMessage}
          registeredUser={dashboard_data.metrics.registeredUser}
        />
        <MonthlyVisitCount data={dashboard_data.monthlyVisit.data} />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlyCommission />
      </div>
    </div>
  );
}
