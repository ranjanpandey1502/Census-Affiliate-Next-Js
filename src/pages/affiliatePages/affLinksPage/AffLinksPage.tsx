import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useAuth from "@/providers/auth/useAuth";
import { AFFILIATE_ROLE } from "@/utils/config";
import AffiliateLinkTable from "./AffiliateLinkTable";

export default function AffLinksPage() {
  const { userInfo } = useAuth();
  if (userInfo?.role !== AFFILIATE_ROLE) return <></>;
  return (
    <>
      <PageBreadcrumb pageTitle="Affiliate Links" />
      <div className="space-y-6">
        <AffiliateLinkTable />
      </div>
    </>
  );
}
