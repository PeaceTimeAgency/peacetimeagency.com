"use client";

import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Function to set theme based on user's local time
    const checkTimeAndSetTheme = () => {
      const currentHour = new Date().getHours();
      // Day mode: 6 AM to 6 PM 
      const isDayTime = currentHour >= 6 && currentHour < 18;
      
      if (isDayTime) {
        document.documentElement.classList.add("theme-day");
      } else {
        document.documentElement.classList.remove("theme-day");
      }
    };

    // Initial check
    checkTimeAndSetTheme();

    // Re-check every minute just in case they leave the page open
    const intervalId = setInterval(checkTimeAndSetTheme, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{children}</>;
}
