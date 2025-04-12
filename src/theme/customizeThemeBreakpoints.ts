import { createTheme } from "@mui/material/styles";

export const customizeTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1080,
      lg: 1400,
      xl: 1920,
    },
  },
});
export const customizeBreakPoints = customizeTheme.breakpoints;
