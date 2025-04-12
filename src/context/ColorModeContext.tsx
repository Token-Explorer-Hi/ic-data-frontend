import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, ReactNode, useContext, useState } from "react";

type ColorModeContextType = {
  mode: Mode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  toggleColorMode: () => undefined,
});
type Mode = "light" | "dark";
export default function ColorModeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    // 初始化时检查系统主题
    if (typeof window !== "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-dark", "true");
        return "dark";
      }
      document.documentElement.setAttribute("data-dark", "false");
    }
    return "light";
  });
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme({ mode })}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorModeContext() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
