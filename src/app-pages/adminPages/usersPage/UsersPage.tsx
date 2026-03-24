'use client'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsersTable from "./UsersTable";
import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE } from "@/utils/config";

export default function UsersPage() {
  const { userInfo } = useAuth();
  if (userInfo?.role !== ADMIN_ROLE) return <></>;
  return (
    <>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <UsersTable />
      </div>
    </>
  );
}
