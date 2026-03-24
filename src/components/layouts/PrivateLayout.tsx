"use-client";
import { type ReactNode } from "react";
import { useRouter } from "next/router";
//
import useAuth from "@/providers/auth/useAuth";
import { APP_PATHS } from "@/router/paths";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { userInfo } = useAuth();
  const router = useRouter();

  if (!userInfo) {
    router.push(APP_PATHS.signInPage);
    return <></>;
  }

  return children;
}
