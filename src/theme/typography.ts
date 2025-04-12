import { customizeBreakPoints } from "./customizeThemeBreakpoints";

export function themeTypography(theme: { [key: string]: any }) {
  return {
    fontFamily: `Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';`,
    h6: {
      fontWeight: 500,
      color: theme.textSecondary,
      fontSize: "var(--space-12)",
      wordBreak: "break-word",
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    h5: {
      fontSize: "var(--space-14)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 500,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.8571428571rem",
      },
    },
    h4: {
      fontSize: "var(--space-16)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 600,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    h3: {
      fontSize: "var(--space-20)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 600,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "1.1428571429rem",
      },
    },
    h2: {
      fontSize: "var(--space-24)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 700,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "1.4285714286rem",
      },
    },
    h1: {
      fontSize: "var(--space-34)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 700,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "2.1428571429rem",
      },
    },
    subtitle1: {
      fontSize: "var(--space-14)",
      wordBreak: "break-word",

      fontWeight: 500,
      color: theme.customization.mode === "dark" ? theme.heading : theme.textDark,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    subtitle2: {
      fontSize: "var(--space-10)",
      wordBreak: "break-word",

      fontWeight: 400,
      color: theme.textSecondary,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.5714285714rem",
      },
    },
    caption: {
      fontSize: "var(--space-12)",
      wordBreak: "break-word",

      color: theme.textSecondary,
      fontWeight: 400,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    body1: {
      fontSize: "var(--space-12)",
      wordBreak: "break-word",

      fontWeight: 400,
      lineHeight: "1.334em",
      color: theme.textSecondary,
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    body2: {
      letterSpacing: "0em",
      fontWeight: 400,
      lineHeight: "1.5em",
      color: theme.textSecondary,
      fontSize: "var(--space-16)",
      wordBreak: "break-word",

      [customizeBreakPoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    customInput: {
      marginTop: 8,
      marginBottom: 8,
      "& > label": {
        top: "var(--space-24)",
        wordBreak: "break-word",

        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: "var(--space-6)",
          wordBreak: "break-word",
        },
      },
      "& > div > input": {
        padding: "var(--space-30) var(--space-14) var(--space-12) !important",
      },
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: 0,
      },
    },
    menuCaption: {
      fontSize: "var(--space-12)",
      wordBreak: "break-word",
      color: theme.heading,
      padding: "var(--space-12) 0 var(--space-12) var(--space-20)",
      textTransform: "capitalize",
      fontWeight: "400",
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    subMenuCaption: {
      fontSize: "var(--space-12)",
      wordBreak: "break-word",
      fontWeight: 500,
      color: theme.textSecondary,
      textTransform: "capitalize",
      [customizeBreakPoints.down("sm")]: {
        fontSize: "0.7142857143rem",
      },
    },
    commonAvatar: {
      cursor: "pointer",
      borderRadius: "var(--space-8)",
      wordBreak: "break-word",
    },
    smallAvatar: {
      width: "var(--space-22)",
      height: "var(--space-22)",
      fontSize: "var(--space-16)",
      wordBreak: "break-word",
      [customizeBreakPoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    mediumAvatar: {
      width: "var(--space-34)",
      height: "var(--space-34)",
      fontSize: "var(--space-20)",
      wordBreak: "break-word",

      [customizeBreakPoints.down("sm")]: {
        fontSize: "1.1428571429rem",
      },
    },
    largeAvatar: {
      width: "var(--space-44)",
      height: "var(--space-44)",
      fontSize: "var(--space-24)",
      wordBreak: "break-word",

      [customizeBreakPoints.down("sm")]: {
        fontSize: "1.4285714286rem",
      },
    },
  };
}
