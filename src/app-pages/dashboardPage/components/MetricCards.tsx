import {
  GroupIcon,
  MailIcon,
} from "@/assets/icons";
import { MetricCard } from "@/components/common/MetricCard";
import type { DashboardMetricType } from "@/types/dashboard.types";



export default function MetricCards({
  contactMessage,
  registeredUser,
}: DashboardMetricType) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <MetricCard
        icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
        card_title="Registered User"
        changePercentage={registeredUser.changePercentage}
        total={registeredUser.total}
      />
      <MetricCard
        icon={<MailIcon className="text-gray-800 size-6 dark:text-white/90" />}
        card_title="Contact Messages"
        changePercentage={contactMessage.changePercentage}
        total={contactMessage.total}
      />
    </div>
  );
}
