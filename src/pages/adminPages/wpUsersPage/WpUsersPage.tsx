import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE } from "@/utils/config";
import WpRegisteredUsers from "./WpUsersTable";

export default function WordPressUsers() {
  const { userInfo } = useAuth();
  if (userInfo?.role !== ADMIN_ROLE) return <></>;

  return (
    <>
      <PageBreadcrumb pageTitle="Wordpress Registered Users" />
      <div className="space-y-6">
        <WpRegisteredUsers />
      </div>
    </>
  );
}
