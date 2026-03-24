import type { ThemeType } from "@/types/types";
import { createContext } from "react";


type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => null
});

