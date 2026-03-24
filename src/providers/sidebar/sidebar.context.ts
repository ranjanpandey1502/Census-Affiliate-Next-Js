import type { SidebarContextType } from "@/types/types";
import { createContext } from "react";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export default SidebarContext;