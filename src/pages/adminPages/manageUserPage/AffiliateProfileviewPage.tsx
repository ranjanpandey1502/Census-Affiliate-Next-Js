import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import type { UserType } from "@/types/api-response.types";
import AdminInfoCard from "./AdminInfoCard";
import AffiliateMetaCard from "./AffilaiteMetaCard";
import AffiliateReport from "./AffiliateReport";

export type AffiliateProfileViewProps = {
  data: UserType;
};

export default function AffiliateProfileView({
  data,
}: AffiliateProfileViewProps) {
  return (
    <>
      <PageBreadcrumb pageTitle="AdminProfile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Affiliate Profile
        </h3>
        <div className="space-y-6">
          <AffiliateMetaCard data={data} />
          <AdminInfoCard data={data} />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 mt-6">
        <AffiliateReport id={data.id} />
      </div>
    </>
  );
}
