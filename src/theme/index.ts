import { DynamicObject } from "@/types/index";
import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import { componentStyleOverrides } from "./compStyleOverride";
import { customizeTheme } from "./customizeThemeBreakpoints";
import { themePalette } from "./palette";
import { themeTypography } from "./typography";

const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
};

const Radius = 12;

export interface ThemeOption {
  [key: string]: any;
}

export function theme(customization: DynamicObject) {
  const themeOption: ThemeOption = {
    colors,
    fontSize,
    heading: "",
    paper: "",
    backgroundDefault: "",
    background: "",
    textPrimary: "",
    darkTextSecondary: "",
    textDark: "",
    textLight: "",
    menuSelected: "",
    menuSelectedBack: "",
    divider: "",
    customization,
    defaultGradient: `linear-gradient(89.44deg, ${colors.defaultGradientStart} -0.31%, ${colors.defaultGradientEnd} 91.14%)`,
    borderRadius: 12,
  };

  switch (customization.mode) {
    case "dark":
      themeOption.paper = colors.darkLevel2;
      themeOption.mainBackground = colors.darkMainBackground;
      themeOption.backgroundDefault = colors.darkPaper;
      themeOption.background = colors.darkBackground;
      themeOption.textPrimary = colors.darkTextPrimary;
      themeOption.textSecondary = colors.darkTextSecondary;
      themeOption.textTertiary = colors.darkTextTertiary;
      themeOption.textDark = colors.darkTextPrimary;
      themeOption.textLight = colors.lightTextPrimary;
      themeOption.menuBackground = colors.darkMainBackground;
      themeOption.menuSelected = colors.darkSecondaryMain;
      themeOption.menuSelectedBack = colors.darkSecondaryMain + 15;
      themeOption.menuSelected = colors.paper;
      themeOption.divider = colors.darkTextPrimary;
      themeOption.heading = colors.darkTextSecondary;
      break;
    case "light":
    default:
      themeOption.paper = colors.paper;
      themeOption.mainBackground = colors.mainBackground;
      themeOption.backgroundDefault = colors.paper;
      themeOption.background = colors.primaryLight;
      themeOption.textPrimary = colors.lightTextPrimary;
      themeOption.textSecondary = colors.lightTextSecondary;
      themeOption.textTertiary = colors.lightTextTertiary;
      themeOption.textDark = colors.grey900;
      themeOption.menuBackground = colors.paper;
      themeOption.menuSelected = colors.lightTextPrimary;
      themeOption.menuSelectedBack = colors.secondaryLight;
      themeOption.menuSelected = colors.paper;
      themeOption.divider = colors.grey200;
      themeOption.heading = colors.grey900;
      break;
  }

  return createTheme({
    ...customizeTheme,
    direction: customization.rtlLayout ? "rtl" : "ltr",
    mixins: {
      overflowEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    typography: themeTypography(themeOption),
    components: componentStyleOverrides(themeOption),
    themeOption,
    colors,
    fontSize,
    customization,
    radius: Radius,
    palette: themePalette(themeOption),
  });
}
export default theme;
