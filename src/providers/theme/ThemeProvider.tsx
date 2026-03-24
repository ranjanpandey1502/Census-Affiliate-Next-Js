import { ThemeContext } from "@/providers/theme/theme.context";
import type { ThemeType } from "@/types/types";
import { THEME_KEY } from "@/utils/config";
import { useEffect, useState, type ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  useEffect(() => {
    (() => {
      const savedTheme = localStorage.getItem(THEME_KEY) as ThemeType;
      setTheme(savedTheme || "light");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    })();
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
