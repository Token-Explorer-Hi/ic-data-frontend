import { isDarkTheme } from "@/utils";
import { Box, Grid } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) => {
  return {
    toggleBox: {
      display: "inline-block",
      padding: "var(--space-4)",
      backgroundColor: isDarkTheme(theme) ? theme.palette.background.level2 : "#fff",
      borderRadius: `${theme.radius}px`,
    },
    toggleItem: {
      width: "var(--space-74)",
      height: "var(--space-32)",
      borderRadius: "var(--space-6)",
      cursor: "pointer",
      "&.on": {
        backgroundColor: theme.colors.secondaryMain,
        color: "#fff",
      },
      "&.off": {
        backgroundColor: isDarkTheme(theme) ? "#4F5A84" : theme.colors.lightGray200,
      },
    },
  };
});

export enum CHECKED {
  ON = "check",
  OFF = "uncheck",
}

export interface ToggleProps {
  isActive?: boolean;
  checked?: ReactNode;
  unchecked?: ReactNode;
  onToggleChange: (value?: CHECKED) => void;
}

export default function Toggle({
  isActive = false,
  checked = "On",
  unchecked = "Off",
  onToggleChange,
}: ToggleProps) {
  const classes = useStyles();

  return (
    <Box className={classes.toggleBox}>
      <Grid container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          className={`${classes.toggleItem} ${isActive ? "on" : ""}`}
          onClick={() => onToggleChange(CHECKED.ON)}
        >
          {checked}
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          className={`${classes.toggleItem} ${isActive ? "" : "off"}`}
          onClick={() => onToggleChange(CHECKED.OFF)}
        >
          {unchecked}
        </Grid>
      </Grid>
    </Box>
  );
}
