import type { ReactNode } from "react";

export type ThemeType = "light" | "dark";
export type UserRoleType = 'affiliate' | 'admin';
export type UserStatusType = 'pending' | 'active' | 'inactive'

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

export type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
}
