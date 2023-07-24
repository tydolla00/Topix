import { useState, useEffect, SetStateAction, Dispatch } from "react";

export default function useDarkMode(): [
  Theme,
  Dispatch<SetStateAction<Theme>>,
] {
  const [theme, setTheme] = useState<Theme>(localStorage.theme as Theme);
  const colorScheme: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorScheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorScheme]);

  return [colorScheme, setTheme];
}

type Theme = "dark" | "light";
