import React, { createContext, useContext, useEffect, useState } from "react";

interface ConfigContextType {
  isMobile: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      if (width <= 1024) {
        setIsMobile(true);
      } else if (width > 1024) {
        setIsMobile(false);
      }
    };

    // Check on mount
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isMobile]);
  return <ConfigContext.Provider value={{ isMobile }}>{children}</ConfigContext.Provider>;
}

export function useConfigContext() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfigContext must be used within a ConfigProvider");
  }
  return context;
}
