import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useAuth from "@/providers/auth/useAuth";
import { AFFILIATE_ROLE } from "@/utils/config";
import CommissionsTable from "./CommisionsTable";
import CommissionStats from "./CommissionStats";

export default function CommissionPage() {
  const { userInfo } = useAuth();
  if (userInfo?.role !== AFFILIATE_ROLE) return <></>;
  return (
    <>
      <PageBreadcrumb pageTitle="Commissions" />
      <CommissionStats />
      <div className="space-y-6">
        <CommissionsTable />
      </div>
    </>
  );
}
