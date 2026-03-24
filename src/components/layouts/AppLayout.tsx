"use-client";
import useSideBar from "@/hooks/useSideBar";
import SideBarProvider from "@/providers/sidebar/SideBarProvider";
import AppHeader from "@/components/shared/AppHeader";
import Backdrop from "@/components/shared/Backdrop";
import AppSidebar from "@/components/shared/AppSidebar";
import PrivateLayout from "./PrivateLayout";
import { ReactNode } from "react";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSideBar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PrivateLayout>
      <SideBarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SideBarProvider>
    </PrivateLayout>
  );
};

export default AppLayout;
