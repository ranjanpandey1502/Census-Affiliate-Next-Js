import PublicLayout from "@/components/layouts/PublicLayout";
import { ReactNode } from "react";

export default function AuthPublicLayout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
