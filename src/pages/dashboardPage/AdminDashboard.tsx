import { useEffect, useState } from "react";
import MetricCards from "./components/MetricCards";
import MonthlyVisitCount from "./components/MonthlyVisitCount";
import LineGraphStaticsChart from "./components/LineGraphStatisticsChart";
import VisitByCountry from "./components/VistByCountry";
import RecentRegistration from "./components/RecentRegistration";
import ApiService from "@/services/Api.service";
import type { AffiliateDashboardAnalyticsResType } from "@/types/api-response.types";
import useNotification from "@/providers/notification/useNotification";
import Spinner from "@/components/common/Spinner";
import useAuth from "@/providers/auth/useAuth";
import { AFFILIATE_ROLE } from "@/utils/config";
import LeadsStatistics from "./components/LeadsStatistics";
import DashboardCommissionMetricsChart from "./components/DashboardCommissionMetricsChart";

export default function AdminDashboard() {
  const { userInfo } = useAuth();
  const [dashboard_data, setDashboardData] = useState<
    AffiliateDashboardAnalyticsResType["data"] | null
  >(null);
  const { showNotification } = useNotification();
  useEffect(() => {
    (async () => {
      try {
        const res = await (userInfo?.role === AFFILIATE_ROLE
          ? ApiService.getDashboardMetrics()
          : ApiService.getAdminDashboardMetrics());
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
  // TODO: show spinner
  if (!dashboard_data)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-20 w-20">
          <Spinner />;
        </div>
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
        <LeadsStatistics />
      </div>
      <div className="col-span-12 ">
        <DashboardCommissionMetricsChart />
      </div>
      <div className="col-span-12">
        <LineGraphStaticsChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <VisitByCountry />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <RecentRegistration />
      </div>
    </div>
  );
}
