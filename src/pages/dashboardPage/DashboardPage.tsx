import useAuth from "@/providers/auth/useAuth";
import { ADMIN_ROLE, AFFILIATE_ROLE } from "@/utils/config";
import AffiliateDashboard from "./AffiliateDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardPage() {
  const { userInfo } = useAuth();
  if(userInfo?.role === AFFILIATE_ROLE) return <AffiliateDashboard />
  if(userInfo?.role === ADMIN_ROLE) return <AdminDashboard />
  return <></>
}
