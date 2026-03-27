'use client'
import Spinner from "@/components/common/Spinner";
import useAuth from "@/providers/auth/useAuth";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type { UserType } from "@/types/api-response.types";
import { ADMIN_ROLE } from "@/utils/config";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminProfilePageView from "./AdminProfileviewPage";
import AffiliateProfileView from "./AffiliateProfileviewPage";

export default function ManageUserPage() {
  const { userInfo } = useAuth();
  const params = useParams<{id: string}>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      const id = params?.id;
      if (userInfo?.role !== ADMIN_ROLE || !id) return;
      try {
        setIsLoading(true);
        const res = await ApiService.getUser(parseInt(id as string));
        setUser(res.data.data);
      } catch (error) {
        console.trace(error);
        showNotification({
          notificationType: "error",
          title: "Error fetching profile",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userInfo, params.id]);
  
  if (userInfo?.role !== ADMIN_ROLE) return <></>;
  if (isLoading || !user)
    return (
      <div className="h-20 w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  return user.role === ADMIN_ROLE? <AdminProfilePageView data={user} /> :<AffiliateProfileView data={user} />
}
