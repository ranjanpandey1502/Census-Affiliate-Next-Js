import SidebarContext from "@/providers/sidebar/sidebar.context";
import { useContext } from "react";

export default function useSideBar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
