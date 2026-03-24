import { ThemeContext } from "@/providers/theme/theme.context";
import { useContext } from "react";

export default function useTheme(){
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}