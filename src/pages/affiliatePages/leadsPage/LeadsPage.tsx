import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useAuth from "@/providers/auth/useAuth";
import { AFFILIATE_ROLE } from "@/utils/config";
import LeadsTable from "./LeadsTable";

export default function LeadsPage() {
  const { userInfo } = useAuth();
  if (userInfo?.role !== AFFILIATE_ROLE) return <></>;
  return (
    <>
      <PageBreadcrumb pageTitle="Contact Leads" />
      <div className="space-y-6">
        <LeadsTable />
      </div>
    </>
  );
}
