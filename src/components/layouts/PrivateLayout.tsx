"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
//
import useAuth from "@/providers/auth/useAuth";
import { APP_PATHS } from "@/router/paths";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) router.push(APP_PATHS.signInPage);
  }, [userInfo]);

  if (!userInfo) {
    return <></>;
  }

  return children;
}
