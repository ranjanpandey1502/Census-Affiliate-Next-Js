import AppLayout from "@/components/layouts/AppLayout";
import { ReactNode } from "react";

export default function PrivateLayout({children}: {children: ReactNode}){
    return <AppLayout>{children}</AppLayout>
}