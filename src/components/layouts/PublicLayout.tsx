import { type ReactNode } from "react";

//
import useAuth from "@/providers/auth/useAuth";
import { APP_PATHS } from "@/router/paths";
import { useRouter } from "next/router";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const {userInfo} = useAuth();
  const router =useRouter();

  if (userInfo) {
    router.push(APP_PATHS.dashboard)
    return <></>

  }
  return children;
}
