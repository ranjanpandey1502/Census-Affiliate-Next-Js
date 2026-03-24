"use client";
import { useEffect, type ReactNode } from "react";

//
import useAuth from "@/providers/auth/useAuth";
import { APP_PATHS } from "@/router/paths";
import { useRouter } from "next/navigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) router.push(APP_PATHS.dashboard);
  }, []);

  if (userInfo) {
    return <></>;
  }
  return children;
}
