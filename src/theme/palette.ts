import { isDarkTheme } from "@/utils";

export function themePalette(theme: { [key: string]: any }) {
  const isDark = isDarkTheme(theme);
  return {
    mode: theme.customization.mode,
    common: {
      black: theme.colors?.darkPaper,
    },
    primary: {
      light: isDark ? theme.colors.darkPrimaryLight : theme.colors.primaryLight,
      main: isDark ? theme.colors.darkPrimaryMain : theme.colors.lightPrimaryMain,
      dark: isDark ? theme.colors.darkPrimaryDark : theme.colors.primaryDark,
      200: isDark ? theme.colors.darkPrimary200 : theme.colors.primary200,
      800: isDark ? theme.colors.darkPrimary800 : theme.colors.primary800,
      400: isDark ? theme.colors.darkPrimary400 : theme.colors.primary800,
    },
    secondary: {
      light: isDark ? theme.colors.darkSecondaryLight : theme.colors.secondaryLight,
      main: isDark ? theme.colors.darkSecondaryMain : theme.colors.secondaryMain,
      dark: isDark ? theme.colors.darkSecondaryLight : theme.colors.secondaryDark,
      200: isDark ? theme.colors.darkSecondary200 : theme.colors.secondary200,
      800: isDark ? theme.colors.darkSecondary800 : theme.colors.secondary800,
    },
    error: {
      light: theme.colors.errorLight,
      main: theme.colors.errorMain,
    },
    orange: {
      light: theme.colors.orangeLight,
      main: theme.colors.orangeMain,
      dark: theme.colors.orangeDark,
    },
    warning: {
      light: theme.colors.warningLight,
      main: theme.colors.warningMain,
      dark: theme.colors.warningDark,
    },
    success: {
      light: theme.colors.successLight,
      200: theme.colors.success200,
      main: theme.colors.successMain,
      dark: theme.colors.successDark,
    },
    grey: {
      main: theme.colors.grey200,
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      200: theme.colors.grey200,
      300: theme.colors.grey300,
      400: theme.colors.grey400,
      500: theme.colors.darkTextSecondary,
      600: theme.colors.heading,
      700: theme.colors.darkTextPrimary,
      800: theme.colors.grey800,
      900: theme.colors.textDark,
    },
    dark: {
      light: theme.colors.darkTextPrimary,
      main: theme.colors.darkLevel1,
      dark: theme.colors.darkLevel2,
      level3: theme.colors.darkLevel3,
      level4: theme.colors.darkLevel4,
    },
    text: {
      primary: theme.textPrimary,
      secondary: theme.textSecondary,
      tertiary: theme.textTertiary,
      dark: theme.textDark,
      light: theme.textLight,
      danger: theme.colors.danger,
      orangeWarning: theme.colors.warning,
      level1: isDark ? theme.colors.darkLevel1 : theme.colors.primaryLight,
      400: isDark ? theme.colors.darkPrimary400 : theme.colors.primary800,
      theme_primary: theme.colors.darkPrimaryMain,
      theme_secondary: theme.colors.darkSecondaryMain,
      "theme-primary": theme.colors.darkPrimaryMain,
      "theme-secondary": theme.colors.darkSecondaryMain,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
      level1: isDark ? theme.colors.darkLevel1 : theme.colors.primaryLight,
      level2: isDark ? theme.colors.darkLevel2 : theme.colors.lightLevel2,
      level3: isDark ? theme.colors.darkLevel3 : theme.colors.paper,
      level4: isDark ? theme.colors.darkLevel4 : theme.colors.lightLevel4,
      level5: isDark ? theme.colors.darkLevel5 : theme.colors.lightLevel5,
    },
    border: {
      normal: isDark
        ? "var(--space-1) solid #313A5A"
        : `var(--space-1) solid ${theme.colors.lightGray200BorderColor}`,
      border0: "var(--space-1) solid #4F5A84",
      gray200: isDark
        ? "var(--space-1) solid #29314F"
        : `var(--space-1) solid ${theme.colors.lightGray200BorderColor}`,
    },
    avatar: {
      gray200BgColor: isDark ? { bgcolor: "#384368" } : { bgcolor: "transparent" },
    },
    loading: {
      background: isDark ? theme.colors.darkLevel3 : theme.colors.paper,
    },
  };
}
