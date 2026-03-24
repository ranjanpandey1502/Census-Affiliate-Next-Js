import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import useAuth from "@/providers/auth/useAuth"
import { ADMIN_ROLE } from "@/utils/config";
import MessagesTable from "./MessagesTable";
import LeadsPage from "@/pages/affiliatePages/leadsPage";

export default function MessagesPage(){
    const {userInfo} = useAuth();
    if(userInfo?.role !== ADMIN_ROLE) return <LeadsPage />
    return <>
    <PageBreadcrumb pageTitle="Messages" />
    <div className="space-y-6">
        <MessagesTable />
    </div>
    </>
}