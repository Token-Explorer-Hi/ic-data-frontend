import { Chip, ButtonBase, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export interface ButtonChipProps {
  label: string;
  onClick?: () => void;
  border?: "primary";
}

export function ButtonChip({ label, onClick, border }: ButtonChipProps) {
  const theme = useTheme() as Theme;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <ButtonBase sx={{ borderRadius: "var(--space-12)" }}>
      <Chip
        sx={{
          background: "transparent",
          border: `var(--space-1) solid ${
            border === "primary" ? theme.colors.primaryMain : theme.colors.secondaryMain
          }`,
          borderRadius: "var(--space-12)",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.themeOption.defaultGradient
                : `${theme.colors.lightPrimaryMain}!important`,
          },
          lineHeight: 0,
          "& .MuiChip-label": {
            overflow: "visible",
            "@media(max-width: 640px)": {
              fontSize: "var(--space-12)",
            },
          },
        }}
        label={label}
        variant="outlined"
        onClick={handleClick}
      />
    </ButtonBase>
  );
}
